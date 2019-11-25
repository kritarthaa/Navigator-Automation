import { AppPage } from '../app.po';
import { ReportPage } from './reports.po';
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
    // Reports -> return report : Verify the UI of return report
    it('Verify the contents of UI of Returns Report', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.ReturnItemReportLink)));
        await app.reports.returnItemReport.ReturnItemReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.returnItemReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.runWithNewDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.exportReportButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.locationFilter)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.showOption)));

    });
    // Reports -> return report : Verify reports can be run with new date
    it('Verify for the sales of return', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.ReturnItemReportLink)));
        await app.reports.returnItemReport.ReturnItemReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.returnItemReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.startDateInput)));
        await app.reports.returnItemReport.startDateInput.clear();
        await app.reports.returnItemReport.startDateInput.sendKeys('08/02/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.runWithNewDate)));
        await app.reports.returnItemReport.runWithNewDate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.firstRowData)));
    });
    // Reports -> return report : Verify new reports can be generated from export report
    it('Verify new reports can be generated from export report', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.ReturnItemReportLink)));
        await app.reports.returnItemReport.ReturnItemReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.returnItemReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.startDateInput)));
        await app.reports.returnItemReport.startDateInput.clear();
        await app.reports.returnItemReport.startDateInput.sendKeys('08/02/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.runWithNewDate)));
        await app.reports.returnItemReport.runWithNewDate.click();
        // await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.firstRowData)));
        // await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnItemReport.exportReportButton)));
    });
});
