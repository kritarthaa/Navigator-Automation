import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from '@angular/core/testing';

fdescribe('Marketing Page', () => {
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

    await app.market.marketing.marketingSideNav.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
    await app.market.marketing.discountsLink.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.generalDiscountTab)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createNewVolumeDiscountButton)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createANewDiscountButton)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.activeLink)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.inactiveLink)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.searchBar)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.tableHeadForGeneralDiscount)));

});

// Marketing -> Discounts: Verify search bar works for respective discount code

    it('Verify search bar works for respective discount code', async () => {

    await app.market.marketing.marketingSideNav.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
    await app.market.marketing.discountsLink.click();
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.searchBar)));
    await app.market.marketing.searchBar.sendKeys('Test20');
    await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.searchBar)));
});

    // Marketing -> Discounts: Verify clicking on InActive leads to inactive list for General discount
    it('Verify clicking on InActive leads to inactive list for General discount', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.inactiveLink)));
        await app.market.marketing.inactiveLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.tableHeadForInactive)));

    });

    // Marketing -> Discounts: Verify the UI of Volume Discount
    it('Verify the UI of Volume Discount', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.volumeDiscountTab)));
        await app.market.marketing.volumeDiscountTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.tableHeadForVolumeDiscount)));
    });

    // Marketing -> Discounts: Verify clicking on InActive leads to inactive list for Volume Discount
    it('Verify clicking on InActive leads to inactive list for Volume Discount', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.volumeDiscountTab)));
        await app.market.marketing.volumeDiscountTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.inActiveLinkForVolumeDiscount)));
        await app.market.marketing.inActiveLinkForVolumeDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.inActiveListForVolumeDiscount)));
    });

    // Marketing -> Discounts: Verify clicking on Create new volume discount leads to create discount by volume page

    it('Verify clicking on Create new volume discount leads to create discount by volume page', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createNewVolumeDiscountButton)));
        await app.market.marketing.createNewVolumeDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createDiscountByVolumeTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.codeInputForDiscount)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.dicountNameInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.dicountFactorInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountFactorCondition)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.selectProducts)));
    });

    // Marketing -> Discounts: Verify clicking on Create a new discount leads to create discount page
    it('Verify clicking on Create a new discount leads to create discount page', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createANewDiscountButton)));
        await app.market.marketing.createANewDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.codeInputForDiscount)));
        await app.market.marketing.codeInputForDiscount.sendKeys('test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.dicountNameInput)));
        await app.market.marketing.dicountNameInput.sendKeys('test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountValueInput)));
        await app.market.marketing.discountValueInput.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.startDateInput)));
        await app.market.marketing.startDateInput.sendKeys('08/20/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.endDateInput)));
        await app.market.marketing.endDateInput.sendKeys('08/20/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountType)));
        await app.market.marketing.discountType.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.selectProducts)));
        await app.market.marketing.selectProducts.click();

    });

    // Marketing -> Discounts: Verify new discount can be created from create a new discount page
    it('Verify new discount can be created from create a new discount page', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createANewDiscountButton)));
        await app.market.marketing.createANewDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.codeInputForDiscount)));
        await app.market.marketing.codeInputForDiscount.sendKeys('test2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.dicountNameInput)));
        await app.market.marketing.dicountNameInput.sendKeys('test2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountValueInput)));
        await app.market.marketing.discountValueInput.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountType)));
        await app.market.marketing.discountType.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.selectProducts)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.searchbarforNewDiscount)));
        await app.market.marketing.searchbarforNewDiscount.sendKeys('weed');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.checkboxForSearchBar)));
        await app.market.marketing.checkboxForSearchBar.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createDiscountButton)));
        await app.market.marketing.createDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.searchBar)));
        await app.market.marketing.searchBar.sendKeys('test2');

    });

    //  Marketing: Discount: Verify pop up open when click view button for specific row
    it('Verify pop up open when click view button for specific row', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.ViewButton)));
        await app.market.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.editButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.deleteButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.closeButton)));

    });

    // Marketing -> Discounts: Verify View pop can be close using close icon and close button
    it('Verify View pop can be close using close icon and close button', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.ViewButton)));
        await app.market.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.closeIconForView)));
        await app.market.marketing.closeIconForView.click();
        browser.sleep(5000);
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.ViewButton)));
        await app.market.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.closeButton)));
        await app.market.marketing.closeButton.click();
    });


    // Marketing -> Discounts: Verify new volume discount can be created from create a new volume discount page
    it('Verify new volume discount can be created from create a new volume discount page', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createNewVolumeDiscountButton)));
        await app.market.marketing.createNewVolumeDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.codeInputForDiscount)));
        await app.market.marketing.codeInputForDiscount.sendKeys('seva1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.dicountNameInput)));
        await app.market.marketing.dicountNameInput.sendKeys('seva1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.dicountFactorInput)));
        await app.market.marketing.dicountFactorInput.sendKeys('2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountFactorCondition)));
        await app.market.marketing.discountFactorCondition.sendKeys('1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.startDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.endDateInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTypeForVolumeDiscount)));
        await app.market.marketing.discountTypeForVolumeDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.selectProducts)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.searchbarforNewDiscount)));
        await app.market.marketing.searchbarforNewDiscount.sendKeys('weed');
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.checkboxForSearchBar)));
        await app.market.marketing.checkboxForSearchBar.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.createDiscountButton)));
        await app.market.marketing.createDiscountButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.volumeDiscountTab)));

    });
    // Marketing -> Discounts: Verify click on edit for pop up view of general discount leads to Edit discount page
    it('Verify click on edit for pop up view of general discount leads to Edit discount page', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.ViewButton)));
        await app.market.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.editButton)));
        await app.market.marketing.editButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.editDiscountTitle)));
    });

    // Marketing -> Discounts: Verify click on delete for pop up view of general discount deletes the discount

    it('Verify click on delete for pop up view of general discount deletes the discount', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.ViewButton)));
        await app.market.marketing.ViewButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.viewPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.deleteButton)));
        await app.market.marketing.deleteButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.confirmDelete)));
        await app.market.marketing.confirmDelete.click();
    });

    // Marketing -> Discounts: Verify paginater works for discount page
    it('Verify paginater works for discount page', async () => {

        await app.market.marketing.marketingSideNav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountsLink)));
        await app.market.marketing.discountsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.discountTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.paginatorForDiscount)));
        await app.market.marketing.paginatorForDiscount.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.market.marketing.previousPaginatorForDiscount)));

    });
});
