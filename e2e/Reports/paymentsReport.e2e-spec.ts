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
    // Reports -> paymentsReport : Verify the UI of payments report
    it('Verify the UI of payments report page', async () => {

        await app.reports.paymentsReport.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.paymentsReportLink)));
        await app.reports.paymentsReport.paymentsReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.paymentsReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.startDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.endDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.runWithNewDateButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.exportPaymentDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.paymentDataTable)));
    });

    // Reports -> paymentsReport : Verify the functionality of payments reoprt 
  it('Verify the functionality of payments reoprt', async () => {
        await app.reports.paymentsReport.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.paymentsReportLink)));
        await app.reports.paymentsReport.paymentsReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.paymentDataTable)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.startDate)));
        await app.reports.paymentsReport.startDate.clear();
        await app.reports.paymentsReport.startDate.sendKeys('11/01/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.endDate)));
        await app.reports.paymentsReport.endDate.clear();
        await app.reports.paymentsReport.endDate.sendKeys('11/22/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.runWithNewDateButton)));
        await app.reports.paymentsReport.runWithNewDateButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.paymentDataTable)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.paymentsReport.exportPaymentDate)));
        await app.reports.paymentsReport.exportPaymentDate.click();
    });

});