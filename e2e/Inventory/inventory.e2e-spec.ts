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

    it('Verify download csv button', async () => {
        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryBtn), 10000));
        await app.inventory.inventoryBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryHeader), 10000));
        await app.inventory.downloadCsvTempBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.downloadCsvTemp), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.importingItemGuides), 10000));


    });

    // verify we can add add new inventory items with required data

    it('verify add add new inventory items', async () => {
        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryBtn), 10000));
        await app.inventory.inventoryBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryHeader), 10000));
        await app.inventory.intakeInventoryBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryIntakeForm), 10000));

    });

    // Verify user can edit, update and delete

    it('Verify update inventory', async () => {
        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryBtn), 10000));
        await app.inventory.inventoryBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryTable), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.updateInventoryBtn), 10000));
        await app.inventory.updateInventoryBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.inventory.updateInventoryForm), 10000);

    });

    it('Verify delete inventory item', async () => {
        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryBtn), 10000));
        await app.inventory.inventoryBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.inventoryTable), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.deleteInventoryBtn), 10000));
        await app.inventory.deleteInventoryBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.notification.deletePopup), 10000);
    });

    // Verify list of Locations appears with ADD Location option

    it('Verify location page', async () => {
        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationsBtn), 10000));
        await app.inventory.locationsBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationHeader), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationLists), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.addLocationBtn), 10000));
        await app.inventory.addLocationBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.inventory.addLocationForm), 10000);
    });

    // Verify user can update and delete the location added

    it('Verify delete location', async () => {

        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationsBtn), 10000));
        await app.inventory.locationsBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationHeader), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationLists), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.editLocationBtn), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.deleteLocationBtn), 10000));
        await app.inventory.deleteLocationBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.deletePopup), 10000));

    });

    it('Verify edit location ', async () => {

        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationsBtn), 10000));
        await app.inventory.locationsBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationHeader), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.locationLists), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.editLocationBtn), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.deleteLocationBtn), 10000));
        await app.inventory.editLocationBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.editLocationForm), 10000));

    });


    // Verify user can add and view the list of warehouses available

    it('Verify Warehouse page ', async () => {

        await browser.waitForAngularEnabled(false);
        await app.inventory.inventoryDropdownBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.warehouseBtn), 10000));
        await app.inventory.warehouseBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.warehouseHeader), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.addWarehouseForm), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.availableWarehouseList), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.searchWarehouse), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.inventory.deleteWarehouseBtn), 10000));
        await app.inventory.deleteWarehouseBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.deletePopup), 10000));

    });

});
