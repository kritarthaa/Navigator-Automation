import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Catalog Page', () => {
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

    // Verify when clicking Catalog dropdown appears
    fit('Navigates to catalog and click', async () => {
        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.availableCannabis())));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.allCannabisProduct())));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.regularProducts())));


    });

    it('Verify contents of available cannabis page', async () => {

        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await app.catalog.allCannabisProduct().click();
        await

    });

});