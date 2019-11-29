import { browser, ExpectedConditions } from 'protractor';
import { AppPage } from '../app.po';


describe('Report Page ', () => {
    const app = new AppPage();

    beforeEach(async () => {
        await app.login.navigateTo();
        await (browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000));
        await app.validLogin(app.users[0].email, app.users[0].password);
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationCard())));
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationBtn())));
        await app.notification.selectLocationBtn().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.closeBtn())));
        await app.notification.closeBtn().click();

    });

    it('Verify the UI of Employee Sales page', async () => {
        await app.reports.employeeSales.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.employeeSalesLink)));
        await app.reports.employeeSales.employeeSalesLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.employeeSalesTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.startDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.endDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.runWithNewDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.graphSalesDataTable)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.employeeSalesData)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.exportDataToCSV)));
        await app.reports.employeeSales.exportDataToCSV.click();

    });
    it('Verify the functionality of Employee Sales Page', async () => {
        await app.reports.employeeSales.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.employeeSalesLink)));
        await app.reports.employeeSales.employeeSalesLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.employeeSalesTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.startDate)));
        await app.reports.employeeSales.startDate.clear();
        await app.reports.employeeSales.startDate.sendKeys('11/10/2019');
        await app.reports.employeeSales.startDate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.endDate)));
        await app.reports.employeeSales.endDate.clear();
        await app.reports.employeeSales.endDate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.runWithNewDate)));
        await app.reports.employeeSales.runWithNewDate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.graphSalesDataTable)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.employeeSalesData)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.employeeSales.exportDataToCSV)));
        await app.reports.employeeSales.exportDataToCSV.click();


    })
});
