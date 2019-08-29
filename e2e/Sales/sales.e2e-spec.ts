import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Sales Page', () => {
    let app = new AppPage();
    const searchKey = '720';

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

    // Verify when clicking Sales Dropdown appears

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

    it('Verify contents of Sales', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await app.sales.ordersBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.searchOrder), 10000);
        await app.sales.searchOrder.sendKeys('1 Old Man');
        await expect(app.sales.firstCustomer().getText()).toContain('1 Old Man');

    });
    // Verify Pressing EXPORT DATA button download the CSV sheet

    it('Verify export data btn', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await app.sales.ordersBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.exportData), 10000);
        await app.sales.exportData.click();

    });

    // Verify pop up opens when click NEW ORDER button
    // Verify contents of the pop up when click NEW ORDER button
    // Verify clicking Close button will cancel pop up of New order

    it('Verify New order btn close operation', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await app.sales.ordersBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrder), 10000);
        await app.sales.newOrder.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrderCard), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrderClose), 10000);
        await app.sales.newOrderClose.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrder), 10000);
    });

    // Verify clicking Continue button of new order pop up will takes user to the POS screen

    it('Verify New order btn continue operation', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await app.sales.ordersBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrder), 10000);
        await app.sales.newOrder.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrderCard), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrderContinue), 10000);
        await app.sales.newOrderContinue.click();
        await browser.wait(ExpectedConditions.urlContains('order/POS'));
    });


    // Verify clicking on Return
    // Verify the UI of "Return" page

    it('Verify contents of Return page', async () => {

        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.returnsBtn), 10000);
        await app.sales.returnsBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order/returns/'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrder), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.searchOrder), 10000);
        await app.sales.locationDropdown.isDisplayed();
        await app.sales.orderTable.isDisplayed();
        await app.sales.pagination.isDisplayed();
    });

    // Verify search option works when enter ID

    it('Verify contents of Return page', async () => {

        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.returnsBtn), 10000);
        await app.sales.returnsBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order/returns/'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.searchOrder), 10000);
        await app.sales.searchOrder.sendKeys(searchKey);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.firstCustomer()), 10000);
        await expect(app.sales.searchedId().getText()).toContain(searchKey);
    });

    // Verify pop up opens when click NEW ORDER button
    // Verify contents of the pop up when click NEW ORDER button
    // Verify clicking Close button will cancel pop up of New order

    it('Verify New order btn close operation', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.returnsBtn), 10000);
        await app.sales.returnsBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order/returns/'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrder), 10000);
        await app.sales.newOrder.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrderCard), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrderClose), 10000);
        await app.sales.newOrderClose.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrder), 10000);
    });

    // Verify clicking Continue button of new order pop up will takes user to the POS screen

    it('Verify New order btn continue operation', async () => {
        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.returnsBtn), 10000);
        await app.sales.returnsBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order/returns/'));
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrder), 10000);
        await app.sales.newOrder.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrderCard), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.newOrderContinue), 10000);
        await app.sales.newOrderContinue.click();
        await browser.wait(ExpectedConditions.urlContains('order/POS'));
    });

    // Verify the contents of General Returns
    // Verify clicking New Item button opens pop up
    // Verify the contents of pop up when clicked New item

    it('Verify contents of General Return page', async () => {

        await browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownBtn));
        await app.sales.salesDropdownBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.salesDropdownContents), 10000);
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.generalReturnsBtn), 10000);
        await app.sales.generalReturnsBtn.click();
        await browser.wait(ExpectedConditions.urlContains('order/generalwaste/'), 10000);
        await app.sales.generalReturnsHeader.isDisplayed();
        await app.sales.generalWasteTable.isDisplayed();
        await app.sales.addNewItemBtn.isDisplayed();
        await app.sales.searchGeneralWaste.isDisplayed();
        await app.sales.addNewItemBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.sales.addNewItemCard), 10000);
        await app.sales.addNewItemHeader().isDisplayed();
        await app.sales.addBtn().isDisplayed();
    });

});
