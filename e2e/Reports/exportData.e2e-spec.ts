import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from 'q';

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
    //Reports -> export data : Verify the UI of export data
    it('verify the UI of export data page', async () => {

        await app.reports.exportData.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.exportData.exportDataLink)));
        await app.reports.exportData.exportDataLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.exportData.exportDataTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.exportData.exportDataSubHeader)))
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.exportData.exportSalesData)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.exportData.exportCustomerData)));
    });
    //Verify the functionality of Export Customer Data'
    it('Verify the functionality of Export Customer Data', async () => {
        await app.reports.exportData.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.exportData.exportDataLink)));
        await app.reports.exportData.exportDataLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.exportData.exportDataTitle)));
        await app.reports.exportData.exportCustomerData.click();

    })


});