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
    it('Navigates to catalog and click', async () => {
        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.availableCannabis())));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.allCannabisProduct())));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.regularProducts())));


    });

    // Verify contents of the Catalog -> Cannabis ->Available cannabis pages
    it('Verify contents of available cannabis page', async () => {

        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.availableCannabis())));
        await app.catalog.availableCannabis().click();
        await (browser.wait(ExpectedConditions.urlContains('reports/inventory')));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.inventoryHeader), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.codeLink), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.codeCopy), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.codePreview), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.availableProductTitle), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.cannabisInfoCard), 10000));

    });

    // Verify contents of the Catalog -> Cannabis ->Available cannabis-> CANNABIS PRODUCT DETAILS pages
    it('Verify contents of Cannabis product details', async () => {

        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.availableCannabis())));
        await app.catalog.availableCannabis().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.productLinkBtn), 10000));
        await app.catalog.productLinkBtn.click();
        await (browser.wait(ExpectedConditions.urlContains('cannabisproduct/details')));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.purchaseHistoryHeader), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.productInformationHeader), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.attachedFilesHeader), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.viewLinkedFileBtn), 10000));

    });

    // Verify contents of the Catalog -> Cannabis ->All Cannabis Products pages
    it('Verify contents of All cannabis product', async () => {

        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.allCannabisProduct())));
        await app.catalog.allCannabisProduct().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.searchBox), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.locationDropdown), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.exportData), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.newProduct), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.table), 10000));

    });

    // Verify contents of the Catalog -> Cannabis ->All Cannabis Products -> Export Data
    it('Verify contents of All cannabis product export data', async () => {

        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.allCannabisProduct())));
        await app.catalog.allCannabisProduct().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.exportData), 10000));
        await app.catalog.exportData.click();

    });

    // Verify contents of the Catalog -> Cannabis ->All Cannabis Products -> add new product
    it('Verify contents of All cannabis product add new product', async () => {

        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.allCannabisProduct())));
        await app.catalog.allCannabisProduct().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.newProduct), 10000));
        await app.catalog.newProduct.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.addNewProductForm), 10000));
        await app.catalog.closeAddNewProduct.click();

    });

    // Verify contents of the Catalog -> Cannabis ->Regular products
    it('Verify contents of Regular product and product edit button', async () => {

        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.regularProducts())));
        await app.catalog.regularProducts().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.table), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.editProductBtn), 10000));
        await app.catalog.editProductBtn.click();
        await (browser.wait(ExpectedConditions.urlContains('product/edit/'), 10000));

    });
    it('Verify contents of Regular product and delete product button', async () => {

        await browser.waitForAngularEnabled(false);
        await app.catalog.catalogBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.regularProducts())));
        await app.catalog.regularProducts().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.table), 10000));
        await (browser.wait(ExpectedConditions.visibilityOf(app.catalog.deleteProductBtn), 10000));
        await app.catalog.deleteProductBtn.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.deleteProductCard), 10000));
        await app.notification.removeProduct.click();

    });

});
