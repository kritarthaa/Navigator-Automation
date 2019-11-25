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
    // Reports -> Close out terminal : Verify the UI of close out terminal
    it('Verify the UI of close out terminal', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalLink)));
        await app.reports.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.dateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.loadTerminalSalesDataButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.exportDataToCSV)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.tableHead)));

    });
    // Reports -> Close out terminal : Verify date can be selected and it loads the respective reports
    it('Verify date can be selected and it loads the respective reports', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalLink)));
        await app.reports.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.dateInput)));
        await app.reports.closeout.dateInput.clear();
        await app.reports.closeout.dateInput.sendKeys('08/08/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.loadTerminalSalesDataButton)));
        await app.reports.closeout.loadTerminalSalesDataButton.click();
    });
    // Reports -> Close out terminal : Verify reports can be export in CSV format
    it('Verify reports can be export in CSV format', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalLink)));
        await app.reports.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.dateInput)));
        await app.reports.closeout.dateInput.clear();
        await app.reports.closeout.dateInput.sendKeys('08/08/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.loadTerminalSalesDataButton)));
        await app.reports.closeout.loadTerminalSalesDataButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.exportDataToCSV)));
        await app.reports.closeout.exportDataToCSV.click();
    });
    // Reports -> close out terminal : Verify reports can be viewed base on location
    it('Verify reports can be viewed base on location', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalLink)));
        await app.reports.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.dateInput)));
        await app.reports.closeout.dateInput.clear();
        await app.reports.closeout.dateInput.sendKeys('08/08/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.loadTerminalSalesDataButton)));
        await app.reports.closeout.loadTerminalSalesDataButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.locationSelect)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.AllLocationSelect)));
        await app.reports.closeout.AllLocationSelect.click();
    });
    // Reports -> close out terminal : Verify respective terminal report can be view when clicked view icon
    it('Verify respective terminal report can be view when clicked view icon', async () => {

        await app.reports.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalLink)));
        await app.reports.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.dateInput)));
        await app.reports.closeout.dateInput.clear();
        await app.reports.closeout.dateInput.sendKeys('08/08/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.loadTerminalSalesDataButton)));
        await app.reports.closeout.loadTerminalSalesDataButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.viewIcon)));
        await app.reports.closeout.viewIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.closeout.closeIcon)));
        await app.reports.closeout.closeIcon.click();
    });
});
