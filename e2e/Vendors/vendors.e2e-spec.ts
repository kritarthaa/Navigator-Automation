import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Vendors Page', () => {
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

    // Verify the contents of cannabis vendors page

    it('Verify contents of Cannabis vendor page', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsBtn), 10000);
        await app.vendors.vendorsBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsDropdownList), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.cannabisVendorBtn), 10000);
        await app.vendors.cannabisVendorBtn.click();
        await browser.wait(ExpectedConditions.urlContains('cannabisvendor'), 10000);
        await app.vendors.cannabisVendorHeader.isDisplayed();
        await app.vendors.cannabisVendorTable.isDisplayed();
        await app.vendors.newVendorBtn.isDisplayed();
    });

    // Verify the vendor profile

    it('Verify contents of Cannabis vendor page', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsBtn), 10000);
        await app.vendors.vendorsBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsDropdownList), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.cannabisVendorBtn), 10000);
        await app.vendors.cannabisVendorBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.cannabisVendorTable), 10000);
        await app.vendors.vendorProfileBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorProfile), 10000);

    });

    // Verify the contents of new cannabis vendor's first pop up(titled "create vendor wizard")

    it('Verify contents of Cannabis vendor page', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsBtn), 10000);
        await app.vendors.vendorsBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsDropdownList), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.cannabisVendorBtn), 10000);
        await app.vendors.cannabisVendorBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.newVendorBtn), 10000);
        await app.vendors.newVendorBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorForm1), 10000);

    });

    // Verify the contents of new cannabis vendor's second pop up(titled "contact information")
    it('Verify contents of Cannabis vendor page', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsBtn), 10000);
        await app.vendors.vendorsBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsDropdownList), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.cannabisVendorBtn), 10000);
        await app.vendors.cannabisVendorBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.newVendorBtn), 10000);
        await app.vendors.newVendorBtn.click();
        await app.vendors.vendorFormNext.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorForm2), 10000);

    });

    // Verify the contents of the new cannabis vendor's third pop up(titled"additional information")
    it('Verify contents of Cannabis vendor page', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsBtn), 10000);
        await app.vendors.vendorsBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorsDropdownList), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.cannabisVendorBtn), 10000);
        await app.vendors.cannabisVendorBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.newVendorBtn), 10000);
        await app.vendors.newVendorBtn.click();
        await app.vendors.vendorFormNext2.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.vendors.vendorForm3), 10000);

    });



});
