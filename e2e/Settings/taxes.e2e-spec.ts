import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from '@angular/core/testing';

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
    // Settings -> taxes : Verify the UI of taxes
    it('Verify the UI of taxes', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxesLink)));
        await app.taxes.taxesLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxesTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxCodeInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.rateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.textArea)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.SaltLakeLocation)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.addButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.allLocation)));
    });
    // Settings -> taxes : Verify taxes can be added
    it('Verify taxes can be added', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxesLink)));
        await app.taxes.taxesLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxesTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxCodeInput)));
        await app.taxes.taxCodeInput.sendKeys('test1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.rateInput)));
        await app.taxes.rateInput.sendKeys('5');
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.textArea)));
        await app.taxes.textArea.sendKeys('test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.SaltLakeLocation)));
        await app.taxes.SaltLakeLocation.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.addButton)));
        await app.taxes.addButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.allLocation)));
        await app.taxes.allLocation.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.selectLocation)));
        await app.taxes.selectLocation.click();
    });
    // Settings -> taxes : Verify taxes can be deleted'
    it('Verify taxes can be deleted', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxesLink)));
        await app.taxes.taxesLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxesTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.deleteIcon)));
        await app.taxes.deleteIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.okButtonDelete)));
        await app.taxes.okButtonDelete.click();
    });

      // Settings -> printer setting : Verify taxes can be listed based on location
    it('Verify taxes can be listed based on location', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxesLink)));
        await app.taxes.taxesLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.taxesTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.taxes.AllLocation)));
        await app.taxes.AllLocation.click();
    });
});
