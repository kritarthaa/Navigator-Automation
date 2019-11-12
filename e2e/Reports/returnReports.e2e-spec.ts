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
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.ReturnReportLink)));
        await app.reports.returnReport.ReturnReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.returnReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.runWithNewDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.exportReportButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.searchBar)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.showOption)));

    });
    // Reports -> return report : Verify reports can be run with new date
    it('Verify for the sales of return', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.ReturnReportLink)));
        await app.reports.returnReport.ReturnReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.returnReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.startDateInput)));
        await app.reports.returnReport.startDateInput.clear();
        await app.reports.returnReport.startDateInput.sendKeys('08/02/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.runWithNewDate)));
        await app.reports.returnReport.runWithNewDate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.firstRowData)));
    });
    // Reports -> return report : Verify new reports can be generated from export report
    it('Verify new reports can be generated from export report', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.ReturnReportLink)));
        await app.reports.returnReport.ReturnReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.returnReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.startDateInput)));
        await app.reports.returnReport.startDateInput.clear();
        await app.reports.returnReport.startDateInput.sendKeys('08/02/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.runWithNewDate)));
        await app.reports.returnReport.runWithNewDate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.firstRowData)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.exportReportButton)));
        await app.reports.returnReport.exportReportButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.returnReport.fromFirstRowOfGeneratedReports)));

    });
});
