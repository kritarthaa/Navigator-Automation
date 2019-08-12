import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Sales Page', () => {
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

    // Verify when clicking Sales dropdown appears

    it('Verify contents of Sales', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
    });

    // Verify contents of the pages

    it('Verify contents of Sales', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await app.sales.ordersBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.searchOrder), 10000);
        await app.sales.searchOrder.isDisplayed();
        await app.sales.locationDropdown.isDisplayed();
        await app.sales.exportData.isDisplayed();
        await app.sales.newOrder.isDisplayed();
        await app.sales.pagination.isDisplayed();
    });

    // Verify search option works when enter Customer name

    fit('Verify contents of Sales', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await app.sales.ordersBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.searchOrder), 10000);
        await app.sales.searchOrder.sendKeys('1 Old Man');
        browser.sleep(10000);
        await expect(app.sales.firstCustomer().getText()).toContain('1 Old Man');

    });
});
