const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Listen for all network responses to verify Google Apps Script submission
  page.on('response', async (response) => {
    if (response.url().includes('script.google.com')) {
      console.log('Google Apps Script Response Status:', response.status());
      try {
        const text = await response.text();
        console.log('Google Apps Script Response Body:', text);
      } catch (e) {
        console.log('Could not read response body (this is expected for no-cors cross-origin requests)');
      }
    }
  });

  await page.goto('http://localhost:8080/');
  
  // Advance tasks and open form
  await page.evaluate(() => {
    window.currentTask = 9;
    window.renderTasks();
  });
  
  // Wait for animation
  await new Promise(r => setTimeout(r, 1500));
  
  // Fill form
  await page.evaluate(() => {
    document.getElementById('pid').value = 'Agent End-to-End Tester';
    document.getElementById('u-notes').value = 'This is an automated test to verify that the frontend successfully sends feedback to the Google Sheet.';
    const qfBtns = document.querySelectorAll('.qf-opts button[data-v="5"]');
    qfBtns.forEach(btn => btn.click());
    
    // Submit
    document.getElementById('u-submit').click();
  });
  
  // Wait a few seconds for the fetch to complete
  await new Promise(r => setTimeout(r, 4000));
  
  // Check the toast message on the page
  const toastMsg = await page.evaluate(() => {
    return document.getElementById('toast').innerText;
  });
  console.log('Toast Message displayed to user:', toastMsg);
  
  await browser.close();
})();
