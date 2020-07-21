const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://developer.vuforia.com/vui/auth/login');

    await page.type('#login_email', '');// your login email
    await page.type('#login_password', '');// your login password

    await page.click('#login');
    await page.waitForNavigation(); // <------------------------- Wait for Navigation
    // your url database
    await page.goto('https://developer.vuforia.com/targetmanager/project/targets?projectId=1c1b580d2a4047c5b5a94cdbfa143c89&av=false');

    await sleep(4000);

    // await page.evaluate(() => {
    //     let dom = document.querySelector('tbody[class="table-list-tbody"]');
    //     dom.innerHTML = "change to something"
    // });

    // download all image database
    // await page.$eval( 'button#buttonsCreate', form => form.click() );
    // await page._client.send('Page.setDownloadBehavior', {
    //     behavior: 'allow', downloadPath: path.resolve(__dirname, 'downloaded')});
    // await page.$eval( 'input#createlDownloadDatabaseBtn', form => form.click() );

    // upload image target
    await page.$eval( 'button#addDeviceTargetUserView', form => form.click() );
    const input = await page.$('input[type="file"]')
    await input.uploadFile(__dirname + '\\test_upload.png')// your local image path
    await page.$eval('#targetDimension', el => el.value = '30'); // width of your target in scene
    await page.$eval( 'button#AddDeviceTargetBtn', form => form.click() );

    await sleep(15000);

    await browser.close();
})();
