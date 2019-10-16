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

    await app.market.marketingSideNav.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
    await app.market.discountsLink.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.generalDiscountTab)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.createNewVolumeDiscountButton)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.createANewDiscountButton)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.activeLink)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.inactiveLink)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.searchBar)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.tableHeadForGeneralDiscount)));

});

// Marketing -> Discounts: Verify search bar works for respective discount code

    it('Verify search bar works for respective discount code', async () => {

    await app.market.marketingSideNav.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
    await app.market.discountsLink.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.searchBar)));
    await app.market.searchBar.sendKeys('Test20');
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.searchBar)));
});

    // Marketing -> Discounts: Verify clicking on InActive leads to inactive list for General discount
    it('Verify clicking on InActive leads to inactive list for General discount', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.inactiveLink)));
        await app.market.inactiveLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.tableHeadForInactive)));

    });

    // Marketing -> Discounts: Verify the UI of Volume Discount
    it('Verify the UI of Volume Discount', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.volumeDiscountTab)));
        await app.market.volumeDiscountTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.tableHeadForVolumeDiscount)));
    });

    // Marketing -> Discounts: Verify clicking on InActive leads to inactive list for Volume Discount
    it('Verify clicking on InActive leads to inactive list for Volume Discount', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.volumeDiscountTab)));
        await app.market.volumeDiscountTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.inActiveLinkForVolumeDiscount)));
        await app.market.inActiveLinkForVolumeDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.inActiveListForVolumeDiscount)));
    });

    // Marketing -> Discounts: Verify clicking on Create new volume discount leads to create discount by volume page

    it('Verify clicking on Create new volume discount leads to create discount by volume page', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.createNewVolumeDiscountButton)));
        await app.market.createNewVolumeDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.createDiscountByVolumeTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.codeInputForDiscount)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.dicountNameInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.dicountFactorInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountFactorCondition)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.selectProducts)));
    });

    // Marketing -> Discounts: Verify clicking on Create a new discount leads to create discount page
    it('Verify clicking on Create a new discount leads to create discount page', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.createANewDiscountButton)));
        await app.market.createANewDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.codeInputForDiscount)));
        await app.market.codeInputForDiscount.sendKeys('test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.dicountNameInput)));
        await app.market.dicountNameInput.sendKeys('test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountValueInput)));
        await app.market.discountValueInput.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.startDateInput)));
        await app.market.startDateInput.sendKeys('08/20/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.endDateInput)));
        await app.market.endDateInput.sendKeys('08/20/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountType)));
        await app.market.discountType.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.selectProducts)));
        await app.market.selectProducts.click();

    });

    // Marketing -> Discounts: Verify new discount can be created from create a new discount page
    it('Verify new discount can be created from create a new discount page', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.createANewDiscountButton)));
        await app.market.createANewDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.codeInputForDiscount)));
        await app.market.codeInputForDiscount.sendKeys('test2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.dicountNameInput)));
        await app.market.dicountNameInput.sendKeys('test2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountValueInput)));
        await app.market.discountValueInput.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountType)));
        await app.market.discountType.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.selectProducts)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.searchbarforNewDiscount)));
        await app.market.searchbarforNewDiscount.sendKeys('weed');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.checkboxForSearchBar)));
        await app.market.checkboxForSearchBar.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.createDiscountButton)));
        await app.market.createDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.searchBar)));
        await app.market.searchBar.sendKeys('test2');

    });

    //  Marketing: Discount: Verify pop up open when click view button for specific row
    it('Verify pop up open when click view button for specific row', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.ViewButton)));
        await app.market.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.editButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.deleteButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.closeButton)));

    });

    // Marketing -> Discounts: Verify View pop can be close using close icon and close button
    it('Verify View pop can be close using close icon and close button', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.ViewButton)));
        await app.market.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.closeIconForView)));
        await app.market.closeIconForView.click();
        browser.sleep(5000);
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.ViewButton)));
        await app.market.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.closeButton)));
        await app.market.closeButton.click();
    });


    // Marketing -> Discounts: Verify new volume discount can be created from create a new volume discount page
    it('Verify new volume discount can be created from create a new volume discount page', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.createNewVolumeDiscountButton)));
        await app.market.createNewVolumeDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.codeInputForDiscount)));
        await app.market.codeInputForDiscount.sendKeys('seva1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.dicountNameInput)));
        await app.market.dicountNameInput.sendKeys('seva1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.dicountFactorInput)));
        await app.market.dicountFactorInput.sendKeys('2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountFactorCondition)));
        await app.market.discountFactorCondition.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTypeForVolumeDiscount)));
        await app.market.discountTypeForVolumeDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.selectProducts)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.searchbarforNewDiscount)));
        await app.market.searchbarforNewDiscount.sendKeys('weed');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.checkboxForSearchBar)));
        await app.market.checkboxForSearchBar.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.createDiscountButton)));
        await app.market.createDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.volumeDiscountTab)));

    });
    // Marketing -> Discounts: Verify click on edit for pop up view of general discount leads to Edit discount page
    it('Verify click on edit for pop up view of general discount leads to Edit discount page', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.ViewButton)));
        await app.market.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.editButton)));
        await app.market.editButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.editDiscountTitle)));
    });

    // Marketing -> Discounts: Verify click on delete for pop up view of general discount deletes the discount

    it('Verify click on delete for pop up view of general discount deletes the discount', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.ViewButton)));
        await app.market.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.deleteButton)));
        await app.market.deleteButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.confirmDelete)));
        await app.market.confirmDelete.click();
    });

    // Marketing -> Discounts: Verify paginater works for discount page
    it('Verify paginater works for discount page', async () => {

        await app.market.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountsLink)));
        await app.market.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.paginatorForDiscount)));
        await app.market.paginatorForDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.previousPaginatorForDiscount)));

    });
});
