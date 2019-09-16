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

    // Marketing -> Loyalty: Verify the UI of loyalty page
    it('Verify the UI of loyalty page', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.LoyaltyLink)));
        await app.market.loyalty.LoyaltyLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.loyaltyTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.pointConversionSettingsText)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.tableHeadForLoyalty)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.toggleOptionForEarnStatus)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.toggleForMaximumPointsDiscount)));
        await app.market.loyalty.toggleForMaximumPointsDiscount.click();
    });

    // Marketing -> Loyalty: Verify toggle options works for earn points conversion rate
    it('Verify toggle options works for earn points conversion rate', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.LoyaltyLink)));
        await app.market.loyalty.LoyaltyLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.loyaltyTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.toggleOptionForEarnStatus)));
        await app.market.loyalty.toggleOptionForEarnStatus.click();

    });

        // Marketing -> Loyalty: Verify toggle options works for redemption conversion rate
    it('Verify toggle options works for redemption conversion rate', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.LoyaltyLink)));
        await app.market.loyalty.LoyaltyLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.loyaltyTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.toggleForRedemptionStatus)));
        await app.market.loyalty.toggleForRedemptionStatus.click();
    });

         // Marketing -> Loyalty: Verify toggle options works for maximum points discount
    it('Verify toggle options works for maximum points discount', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.LoyaltyLink)));
        await app.market.loyalty.LoyaltyLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.loyaltyTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.loyalty.toggleForMaximumPointsDiscount)));
        await app.market.loyalty.toggleForMaximumPointsDiscount.click();

    });

});
