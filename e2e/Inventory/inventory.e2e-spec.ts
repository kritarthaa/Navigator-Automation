import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Inventory Page', () => {
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

    // Verify contents of inventory page

    it('On clicking inventory dropdown', async () => {

        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryBtn), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationsBtn), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.warehouseBtn), 10000));

    });

    it('Verify contents of Inventory Page', async () => {
        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryBtn), 10000));
        await app.inventory.inventoryBtn.click();
        await (browser.wait(ExpectedConditions.urlContains('inventory')));
        await app.inventory.exportDataBtn.isPresent();
        await app.inventory.importItemBtn.isPresent();
        await app.inventory.downloadCsvTempBtn.isPresent();
        await app.inventory.intakeInventoryBtn.isPresent();
        await app.inventory.inventorySearch.isPresent();
        await app.inventory.locationDropDown.isPresent();
        await app.inventory.inventoryTable.isPresent();
    });

    // Verify user is able to import sheet locally.

    it('Verify import sheet button', async () => {
        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryBtn), 10000));
        await app.inventory.inventoryBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryHeader), 10000));
        await app.inventory.importItemBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.importInventoryPopup), 10000));
    });

    it('Verify the list item appears with respect to corresponding location selected', async () => {
        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryBtn), 10000));
        await app.inventory.inventoryBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryHeader), 10000));
        await app.inventory.downloadCsvTempBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.downloadCsvTemp), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.importingItemGuides), 10000));


    });
});
