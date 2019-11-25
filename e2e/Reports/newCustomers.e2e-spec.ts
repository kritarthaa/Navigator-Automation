import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Reports Page', () => {
    let app = new AppPage();

    beforeEach(async () => {
        app = new AppPage();
        await app.login.navigateTo();
        await (browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000));
        await app.validLogin(app.users[0].email, app.users[0].password);
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationCard())));
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationBtn())));
        await app.notification.selectLocationBtn().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.closeBtn())));
        await app.notification.closeBtn().click();

    });
    //Reports -> new customers : Verify the UI of new customers
    it('verify the UI of new customers page', async () => {

        await app.reports.newCustomers.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.newCustomersLink)));
        await app.reports.newCustomers.newCustomersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.newCustomersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.startDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.endDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.submitButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.customerFound)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.exportStatus)));
    });

    //Reports -> new Customers : Verify new customer data can be run with new date
    it('Verify the new customers data can be run with new date', async () => {

        await app.reports.newCustomers.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.newCustomersLink)));
        await app.reports.newCustomers.newCustomersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.newCustomersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.startDate)));
        await app.reports.newCustomers.startDate.clear();
        await app.reports.newCustomers.startDate.sendKeys('11/01/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.endDate)));
        await app.reports.newCustomers.endDate.clear();
        await app.reports.newCustomers.endDate.sendKeys('11/21/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.submitButton)));
        await app.reports.newCustomers.submitButton.click();
    })
    //Reports -> new Customers : Verify Generate Export File of new customeers page 
    it('Verify the Generate Export file of new Customers page', async () => {

        await app.reports.newCustomers.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.newCustomersLink)));
        await app.reports.newCustomers.newCustomersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.newCustomersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.startDate)));
        await app.reports.newCustomers.startDate.clear();
        await app.reports.newCustomers.startDate.sendKeys('11/01/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.endDate)));
        await app.reports.newCustomers.endDate.clear();
        await app.reports.newCustomers.endDate.sendKeys('11/21/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.submitButton)));
        await app.reports.newCustomers.submitButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.generateExportFile)));
        await app.reports.newCustomers.generateExportFile.click();
        //to load all the webelements after Generate report button clicked
        await browser.sleep(5000);
        await app.reports.newCustomers.clickToSeeIfReadyForDownloadButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.newCustomers.completeText)));
        //to load the webelement of download button
        await browser.sleep(5000);
        await app.reports.newCustomers.DownloadButton.click();
        // to download the excel file
        await browser.sleep(5000);



    });


});
