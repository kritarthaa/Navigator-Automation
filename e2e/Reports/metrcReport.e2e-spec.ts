import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from '@angular/core/testing';

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

        await app.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.MetrcReportLink)));
        await app.metrcReport.MetrcReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.metrcReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.runWithNewDate)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.exportReportButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.searchBar)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.showOption)));

    });
    // Reports -> metrc report : Verify reports can be run with new date
    it('Verify reports can be run with new date', async () => {

        await app.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.MetrcReportLink)));
        await app.metrcReport.MetrcReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.metrcReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.startDateInput)));
        await app.metrcReport.startDateInput.clear();
        await app.metrcReport.startDateInput.sendKeys('08/02/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.runWithNewDate)));
        await app.metrcReport.runWithNewDate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.metrcReport.firstRowData)));
    });
});
