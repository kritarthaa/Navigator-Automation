import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from '@angular/core/testing';

describe('Saleslimit Page', () => {
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
    // Settings -> Sales limit : Verify UI of Sales limit page
    it('Verify UI of Sales limit page', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.salesLimitLink)));
        await app.saleslimit.salesLimitLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.salesLimitTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.saveChangesButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.massachusetssTab)));
    });
    // Settings -> Sales limit : Verify recreational product can be change and save
    it('Verify recreational product can be change and save', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.salesLimitLink)));
        await app.saleslimit.salesLimitLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.salesLimitTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.massachusetssTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.inputForFirstProduct)));
        await app.saleslimit.inputForFirstProduct.clear();
        await app.saleslimit.inputForFirstProduct.sendKeys('40');
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.saveChangesButton)));
        await app.saleslimit.saveChangesButton.click();
    });
   // Settings -> Sales limit : Verify clicking show will convert ounce to grams for product
    it('Verify clicking show will convert ounce to grams for product', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.salesLimitLink)));
        await app.saleslimit.salesLimitLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.salesLimitTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.massachusetssTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.saleslimit.showToggle)));
        await app.saleslimit.showToggle.click();

    });

});






