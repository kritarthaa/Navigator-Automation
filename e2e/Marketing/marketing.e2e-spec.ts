import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from '@angular/core/testing';

describe('Marketing Page', () => {
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
   // Marketing -> Discounts : Verify the UI of Discounts page

    it('Verify the UI of Discounts page', async () => {

    await app.marketing.marketingSideNav.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
    await app.marketing.discountsLink.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.generalDiscountTab)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createNewVolumeDiscountButton)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createANewDiscountButton)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.activeLink)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.inactiveLink)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchBar)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.tableHeadForGeneralDiscount)));

});

// Marketing -> Discounts: Verify search bar works for respective discount code

    it('Verify search bar works for respective discount code', async () => {

    await app.marketing.marketingSideNav.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
    await app.marketing.discountsLink.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchBar)));
    await app.marketing.searchBar.sendKeys('Test20');
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchBar)));
});

    // Marketing -> Discounts: Verify clicking on InActive leads to inactive list
    it('Verify clicking on InActive leads to inactive list', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.inactiveLink)));
        await app.marketing.inactiveLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.tableHeadForInactive)));

    });

    // Marketing -> Discounts: Verify the UI of Volume Discount
    it('Verify the UI of Volume Discount', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.volumeDiscountTab)));
        await app.marketing.volumeDiscountTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.tableHeadForVolumeDiscount)));
    });

    // Marketing -> Discounts: Verify clicking on InActive leads to inactive list for Volume Discount
    it('Verify clicking on InActive leads to inactive list for Volume Discount', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.volumeDiscountTab)));
        await app.marketing.volumeDiscountTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.inActiveLinkForVolumeDiscount)));
        await app.marketing.inActiveLinkForVolumeDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.inActiveListForVolumeDiscount)));
    });

    // Marketing -> Discounts: Verify clicking on Create new volume discount leads to create discount by volume page

    it('Verify clicking on Create new volume discount leads to create discount by volume page', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createNewVolumeDiscountButton)));
        await app.marketing.createNewVolumeDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createDiscountByVolumeTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.codeInputForDiscount)));
    });
});
