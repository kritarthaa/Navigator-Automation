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

    await app.marketing.marketingSideNav.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
    await app.marketing.discountsLink.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.generalDiscountTab)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createNewVolumeDiscountButton)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createANewDiscountButton)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.activeLink)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.inactiveLink)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchBar)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.tableHeadForGeneralDiscount)));

});

// Marketing -> Discounts: Verify search bar works for respective discount code

    it('Verify search bar works for respective discount code', async () => {

    await app.marketing.marketingSideNav.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
    await app.marketing.discountsLink.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchBar)));
    await app.marketing.searchBar.sendKeys('Test20');
    await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchBar)));
});

    // Marketing -> Discounts: Verify clicking on InActive leads to inactive list for General discount
    it('Verify clicking on InActive leads to inactive list for General discount', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.inactiveLink)));
        await app.marketing.inactiveLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.tableHeadForInactive)));

    });

    // Marketing -> Discounts: Verify the UI of Volume Discount
    it('Verify the UI of Volume Discount', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.volumeDiscountTab)));
        await app.marketing.volumeDiscountTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.tableHeadForVolumeDiscount)));
    });

    // Marketing -> Discounts: Verify clicking on InActive leads to inactive list for Volume Discount
    it('Verify clicking on InActive leads to inactive list for Volume Discount', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.volumeDiscountTab)));
        await app.marketing.volumeDiscountTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.inActiveLinkForVolumeDiscount)));
        await app.marketing.inActiveLinkForVolumeDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.inActiveListForVolumeDiscount)));
    });

    // Marketing -> Discounts: Verify clicking on Create new volume discount leads to create discount by volume page

    it('Verify clicking on Create new volume discount leads to create discount by volume page', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createNewVolumeDiscountButton)));
        await app.marketing.createNewVolumeDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createDiscountByVolumeTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.codeInputForDiscount)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.dicountNameInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.dicountFactorInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountFactorCondition)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.selectProducts)));
    });

    // Marketing -> Discounts: Verify clicking on Create a new discount leads to create discount page
    it('Verify clicking on Create a new discount leads to create discount page', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createANewDiscountButton)));
        await app.marketing.createANewDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.codeInputForDiscount)));
        await app.marketing.codeInputForDiscount.sendKeys('test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.dicountNameInput)));
        await app.marketing.dicountNameInput.sendKeys('test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountValueInput)));
        await app.marketing.discountValueInput.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.startDateInput)));
        await app.marketing.startDateInput.sendKeys('08/20/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.endDateInput)));
        await app.marketing.endDateInput.sendKeys('08/20/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountType)));
        await app.marketing.discountType.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.selectProducts)));
        await app.marketing.selectProducts.click();

    });

    // Marketing -> Discounts: Verify new discount can be created from create a new discount page
    it('Verify new discount can be created from create a new discount page', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createANewDiscountButton)));
        await app.marketing.createANewDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.codeInputForDiscount)));
        await app.marketing.codeInputForDiscount.sendKeys('test2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.dicountNameInput)));
        await app.marketing.dicountNameInput.sendKeys('test2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountValueInput)));
        await app.marketing.discountValueInput.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountType)));
        await app.marketing.discountType.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.selectProducts)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchbarforNewDiscount)));
        await app.marketing.searchbarforNewDiscount.sendKeys('weed');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.checkboxForSearchBar)));
        await app.marketing.checkboxForSearchBar.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createDiscountButton)));
        await app.marketing.createDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchBar)));
        await app.marketing.searchBar.sendKeys('test2');

    });

    //  Marketing: Discount: Verify pop up open when click view button for specific row
    it('Verify pop up open when click view button for specific row', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.ViewButton)));
        await app.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.editButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.deleteButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.closeButton)));

    });

    // Marketing -> Discounts: Verify View pop can be close using close icon and close button
    it('Verify View pop can be close using close icon and close button', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.ViewButton)));
        await app.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.closeIconForView)));
        await app.marketing.closeIconForView.click();
        browser.sleep(5000);
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.ViewButton)));
        await app.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.closeButton)));
        await app.marketing.closeButton.click();
    });


    // Marketing -> Discounts: Verify new volume discount can be created from create a new volume discount page
    it('Verify new volume discount can be created from create a new volume discount page', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createNewVolumeDiscountButton)));
        await app.marketing.createNewVolumeDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.codeInputForDiscount)));
        await app.marketing.codeInputForDiscount.sendKeys('seva1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.dicountNameInput)));
        await app.marketing.dicountNameInput.sendKeys('seva1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.dicountFactorInput)));
        await app.marketing.dicountFactorInput.sendKeys('2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountFactorCondition)));
        await app.marketing.discountFactorCondition.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTypeForVolumeDiscount)));
        await app.marketing.discountTypeForVolumeDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.selectProducts)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.searchbarforNewDiscount)));
        await app.marketing.searchbarforNewDiscount.sendKeys('weed');
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.checkboxForSearchBar)));
        await app.marketing.checkboxForSearchBar.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.createDiscountButton)));
        await app.marketing.createDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.volumeDiscountTab)));

    });
    // Marketing -> Discounts: Verify click on edit for pop up view of general discount leads to Edit discount page
    it('Verify click on edit for pop up view of general discount leads to Edit discount page', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.ViewButton)));
        await app.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.editButton)));
        await app.marketing.editButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.editDiscountTitle)));
    });

    // Marketing -> Discounts: Verify click on delete for pop up view of general discount deletes the discount

    it('Verify click on delete for pop up view of general discount deletes the discount', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.ViewButton)));
        await app.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.deleteButton)));
        await app.marketing.deleteButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.confirmDelete)));
        await app.marketing.confirmDelete.click();
    });

    // Marketing -> Discounts: Verify paginater works for discount page
    it('Verify paginater works for discount page', async () => {

        await app.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountsLink)));
        await app.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.paginatorForDiscount)));
        await app.marketing.paginatorForDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.marketing.previousPaginatorForDiscount)));

    });
});
