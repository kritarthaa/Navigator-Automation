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
    // Reports -> metrc report : Verify the UI of metrc report
    it('Verify the UI of metrc report', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.MetrcReportLink)));
        await app.reports.metrcReport.MetrcReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.metrcReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.runWithNewDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.exportReportButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.searchBar)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.showOption)));

    });
    // Reports -> metrc report : Verify reports can be run with new date
    it('Verify reports can be run with new date', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.MetrcReportLink)));
        await app.reports.metrcReport.MetrcReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.metrcReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.startDateInput)));
        await app.reports.metrcReport.startDateInput.clear();
        await app.reports.metrcReport.startDateInput.sendKeys('08/02/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.runWithNewDate)));
        await app.reports.metrcReport.runWithNewDate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.metrcReport.firstRowData)));
    });
});
