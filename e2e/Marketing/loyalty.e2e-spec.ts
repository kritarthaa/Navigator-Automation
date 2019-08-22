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

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.LoyaltyLink)));
        await app.loyalty.LoyaltyLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.loyaltyTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.pointConversionSettingsText)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.tableHeadForLoyalty)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.toggleOptionForEarnStatus)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.toggleForMaximumPointsDiscount)));
        await app.loyalty.toggleForMaximumPointsDiscount.click();
    });

    // Marketing -> Loyalty: Verify toggle options works for earn points conversion rate
    it('Verify toggle options works for earn points conversion rate', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.LoyaltyLink)));
        await app.loyalty.LoyaltyLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.loyaltyTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.toggleOptionForEarnStatus)));
        await app.loyalty.toggleOptionForEarnStatus.click();

    });

        // Marketing -> Loyalty: Verify toggle options works for redemption conversion rate
    it('Verify toggle options works for redemption conversion rate', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.LoyaltyLink)));
        await app.loyalty.LoyaltyLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.loyaltyTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.toggleForRedemptionStatus)));
        await app.loyalty.toggleForRedemptionStatus.click();
    });

         // Marketing -> Loyalty: Verify toggle options works for maximum points discount
    it('Verify toggle options works for maximum points discount', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.LoyaltyLink)));
        await app.loyalty.LoyaltyLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.loyaltyTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.loyalty.toggleForMaximumPointsDiscount)));
        await app.loyalty.toggleForMaximumPointsDiscount.click();

    });

});
