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

        await app.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalLink)));
        await app.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.dateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.loadTerminalSalesDataButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.exportDataToCSV)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.tableHead)));

   });
   // Reports -> Close out terminal : Verify date can be selected and it loads the respective reports
    it('Verify date can be selected and it loads the respective reports', async () => {

        await app.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalLink)));
        await app.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.dateInput)));
        await app.closeout.dateInput.clear();
        await app.closeout.dateInput.sendKeys('08/08/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.loadTerminalSalesDataButton)));
        await app.closeout.loadTerminalSalesDataButton.click();
    });
    // Reports -> Close out terminal : Verify reports can be export in CSV format
    it('Verify reports can be export in CSV format', async () => {

        await app.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalLink)));
        await app.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.dateInput)));
        await app.closeout.dateInput.clear();
        await app.closeout.dateInput.sendKeys('08/08/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.loadTerminalSalesDataButton)));
        await app.closeout.loadTerminalSalesDataButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.exportDataToCSV)));
        await app.closeout.exportDataToCSV.click();
    });
    // Reports -> close out terminal : Verify reports can be viewed base on location
    it('Verify reports can be viewed base on location', async () => {

        await app.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalLink)));
        await app.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.dateInput)));
        await app.closeout.dateInput.clear();
        await app.closeout.dateInput.sendKeys('08/08/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.loadTerminalSalesDataButton)));
        await app.closeout.loadTerminalSalesDataButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.locationSelect)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.AllLocationSelect)));
        await app.closeout.AllLocationSelect.click();
    });
    // Reports -> close out terminal : Verify respective terminal report can be view when clicked view icon
    it('Verify respective terminal report can be view when clicked view icon', async () => {

        await app.closeout.ReportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalLink)));
        await app.closeout.closeOutTeminalLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeOutTeminalTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.dateInput)));
        await app.closeout.dateInput.clear();
        await app.closeout.dateInput.sendKeys('08/08/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.loadTerminalSalesDataButton)));
        await app.closeout.loadTerminalSalesDataButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.viewIcon)));
        await app.closeout.viewIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.closeout.closeIcon)));
        await app.closeout.closeIcon.click();
    });
});
