const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(pathToFileURL(path.join(__dirname, 'index.html')).href);
    await page.evaluate(() => localStorage.removeItem('vutv.equip.bookings.v1'));
    await page.reload();
    const dates = await page.evaluate(() => ({start: addDays(dateKey(new Date()), 2), end: addDays(dateKey(new Date()), 4)}));
    await page.click('[data-act="tab"][data-to="equipment"]');
    await page.click('[data-act="startbook"][data-id="cam1"]');
    await page.waitForSelector('#startDate');
    await page.$eval('#startDate', (el, value) => {el.value = value; el.dispatchEvent(new Event('change', {bubbles: true}));}, dates.start);
    await page.$eval('#endDate', (el, value) => {el.value = value; el.dispatchEvent(new Event('change', {bubbles: true}));}, dates.end);
    await page.$eval('#startTime', el => {el.value = '10:00'; el.dispatchEvent(new Event('input', {bubbles: true}));});
    await page.$eval('#endTime', el => {el.value = '12:00'; el.dispatchEvent(new Event('input', {bubbles: true}));});
    await page.click('[data-act="continuebooking"]');
    await page.$eval('#requester', el => {el.value = 'Test team'; el.dispatchEvent(new Event('input', {bubbles: true}));});
    await page.$eval('#destination', el => {el.value = 'Studio B'; el.dispatchEvent(new Event('input', {bubbles: true}));});
    await page.click('[data-act="reviewbooking"]');
    assert.match(await page.$eval('#body', el => el.innerText), /Test team/);
    assert.match(await page.$eval('#body', el => el.innerText), /Studio B/);
    await page.click('[data-act="confirm"]');
    const booking = await page.evaluate(() => S.bookings[0]);
    assert.equal(booking.eqId, 'cam1');
    assert.equal(booking.startDate, dates.start);
    assert.equal(booking.endDate, dates.end);
    assert.equal(booking.startTime, '10:00');
    assert.equal(booking.endTime, '12:00');
    assert.equal(booking.requester, 'Test team');
    assert.ok((await page.$eval('#body', el => el.innerText)).includes(booking.ref));
    await page.reload();
    assert.equal(await page.evaluate(id => S.bookings.some(b => b.id === id), booking.id), true);

    // A real overlapping interval must be rejected; non-overlapping later bookings remain possible.
    await page.click('[data-act="tab"][data-to="equipment"]');
    await page.click('[data-act="startbook"][data-id="cam1"]');
    await page.waitForSelector('#startDate');
    await page.$eval('#startDate', (el, value) => {el.value = value; el.dispatchEvent(new Event('change', {bubbles: true}));}, dates.start);
    await page.$eval('#endDate', (el, value) => {el.value = value; el.dispatchEvent(new Event('change', {bubbles: true}));}, dates.end);
    await page.$eval('#startTime', el => {el.value = '11:00'; el.dispatchEvent(new Event('input', {bubbles: true}));});
    await page.$eval('#endTime', el => {el.value = '13:00'; el.dispatchEvent(new Event('input', {bubbles: true}));});
    await page.click('[data-act="continuebooking"]');
    assert.match(await page.$eval('#body', el => el.innerText), /overlaps an existing booking/i);

    await page.$eval('[data-act="go"][data-to="equipment"]', el => el.click());
    await page.$eval('[data-act="startbook"][data-id="lite1"]', el => el.click());
    await page.waitForSelector('#startDate');
    assert.match(await page.$eval('#body', el => el.innerText), /Available two-hour shortcuts/i);
    await page.$eval('[data-act="go"][data-to="equipment"]', el => el.click());
    await page.$eval('[data-act="tab"][data-to="mybookings"]', el => el.click());
    await page.$eval(`[data-act="extend"][data-id="${booking.id}"]`, el => el.click());
    await page.$eval('#extendDate', (el, value) => {el.value = value;}, await page.evaluate(value => addDays(value, 1), dates.end));
    await page.$eval('#extendTime', el => {el.value = '12:00';});
    await page.$eval(`[data-act="saveextension"][data-id="${booking.id}"]`, el => el.click());
    assert.equal(await page.evaluate(id => S.bookings.find(b => b.id === id).endDate, booking.id), await page.evaluate(value => addDays(value, 1), dates.end));
    await page.$eval(`[data-act="markreturn"][data-id="${booking.id}"]`, el => el.click());
    await page.select('#returnCondition', 'Good');
    await page.$eval('#returnNotes', el => {el.value = 'Checked lens';});
    await page.$('#returnPhoto').then(el => el.uploadFile(path.join(__dirname, 'assets', 'sony-a7iii.jpg')));
    await page.$eval(`[data-act="doreturn"][data-id="${booking.id}"]`, el => el.click());
    await page.waitForSelector('#stars');
    await page.$eval('[data-act="rate"][data-val="5"]', el => el.click());
    await page.$eval('[data-act="setcond"][data-val="Good"]', el => el.click());
    await page.$eval(`[data-act="submitfeedback"][data-id="${booking.id}"]`, el => el.click());
    await page.reload();
    assert.deepEqual(await page.evaluate(id => {const b=S.bookings.find(x=>x.id===id);return [b.status,b.returnCondition,b.returnNotes,b.rating,b.feedback,!!b.returnPhoto];}, booking.id), ['completed','Good','Checked lens',5,'Good',true]);
    await page.$eval('#resetBtn', el => el.click());
    assert.equal(await page.evaluate(id => S.bookings.some(b => b.id === id), booking.id), false);
    assert.equal(await page.evaluate(() => localStorage.getItem('vutv.equip.bookings.v1')), null);
    assert.deepEqual(errors, []);
    console.log('PASS: multi-day booking, review, persistence, conflict, in-use future booking, extension, photo return, feedback, reset');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
