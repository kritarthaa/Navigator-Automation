import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from 'q';

describe('Settings Page', () => {
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
    // Settings -> printer settings : Verify UI of printer settings page
    it('Verify UI of printer settings page', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.printerSettingLink)));
        await app.printerSettings.printerSettingLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.posPrinterSettingsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.saveButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.printerSelect)));
    });
    // Settings -> printer settings : Verify printer settings can be saved
    it('Verify printer settings can be saved', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.printerSettingLink)));
        await app.printerSettings.printerSettingLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.posPrinterSettingsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.printerSelect)));
        await app.printerSettings.printerSelect.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.brotherLaserPrinter)));
        await app.printerSettings.brotherLaserPrinter.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.saveButton)));
        await app.printerSettings.saveButton.click();
    });
    // Settings -> printer settings : Verify printnode username and password can not be edited
    it('Verify printnode username and password can not be edited', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.printerSettingLink)));
        await app.printerSettings.printerSettingLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.posPrinterSettingsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.printNodeUsername)));
        await app.printerSettings.printNodeUsername.sendKeys('test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.printNodePAssword)));
        await app.printerSettings.printNodePAssword.sendKeys('test');

    });
    // Settings -> printer setting : Verify default receipt printer can used to test print
    it('Verify default receipt printer can used to test print', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.printerSettingLink)));
        await app.printerSettings.printerSettingLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.posPrinterSettingsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.printerSettings.defaultReceiptPrinter)));
        await app.printerSettings.defaultReceiptPrinter.click();
    });
});
