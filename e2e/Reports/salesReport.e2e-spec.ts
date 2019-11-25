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

    it('Verify the contents of Sales Report', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.salesReportLink)));
        await app.reports.salesReport.salesReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.salesReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.salesReportLocation)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.salesReportSubHeading)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.endDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.startDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.generateSalesReport)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.generatedReports)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.generatedReportsTable)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.salesReport.refreshBtn)));

    });
});
