import { by, element, ElementFinder } from 'protractor';

export class MarketingPage {


    public get marketingSideNav(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[7]/a/span'));
    }
    public get discountsLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[7]/ul/li[1]/a'));
    }

    // UI

    public get generalDiscountTab(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div[1]/ul/li[1]/a'));
    }
    public get volumeDiscountTab(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div[1]/ul/li[2]/a'));
    }
    public get discountTitle(): ElementFinder {
        return element(by.xpath("//div[@id='general_discount']//h5[@class='element-header'][contains(text(),'Discount')]"));
    }
    public get activeLink(): ElementFinder {
        return element(by.xpath('//*[@id="general_discount"]/div[1]/div[1]/ul/li[1]/a'));
    }
    public get inactiveLink(): ElementFinder {
        return element(by.xpath('//*[@id="general_discount"]/div[1]/div[1]/ul/li[2]/a'));
    }
    public get createNewVolumeDiscountButton(): ElementFinder {
        return element(by.xpath('//*[@id="general_discount"]/div[1]/div[2]/a[1]'));
    }
    public get createANewDiscountButton(): ElementFinder {
        return element(by.xpath('//*[@id="general_discount"]/div[1]/div[2]/a[2]'));
    }
    public get searchBar(): ElementFinder {
        return element(by.xpath("//input[@placeholder='Search / Scan']"));
    }
    public get tableHeadForGeneralDiscount(): ElementFinder {
        return element(by.xpath("//div[@class='col-sm-12']//thead//tr"));
    }
    public get test20Code(): ElementFinder {
        return element(by.xpath("//td[contains(text(),'Test20')]"));
    }
    public get tableHeadForInactive(): ElementFinder {
        return element(by.xpath("//div[@id='discount_inactive']//thead//tr"));
    }

    // table head for Volume discount
    public get tableHeadForVolumeDiscount(): ElementFinder {
        return element(by.xpath("//div[@id='volume_active']//thead//tr"));
    }

    public get inActiveLinkForVolumeDiscount(): ElementFinder {
        return element(by.xpath('//*[@id="volume_discount"]/div[1]/div[1]/ul/li[2]/a'));
    }
    public get inActiveListForVolumeDiscount(): ElementFinder {
        return element(by.xpath("//tr[@id='494']"));
    }

    // create new volume discount

    public get createDiscountByVolumeTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
    }
    public get codeInputForDiscount(): ElementFinder {
        return element(by.xpath("//div[@class='col-md-2']//input[@id='DiscountToCreate_Name']"));
    }
    public get dicountNameInput(): ElementFinder {
        return element(by.xpath("//input[@id='DiscountToCreate_DiscountDescription']"));
    }
    public get dicountFactorInput(): ElementFinder {
        return element(by.xpath("//input[@id='DiscountToCreate_FactorQuantity']"));
    }
    public get discountFactorCondition(): ElementFinder {
        return element(by.xpath("//input[@id='DiscountToCreate_FactorCondition']"));
    }
    public get startDateInput(): ElementFinder {
        return element(by.xpath("//input[@id='DiscountToCreate_StartDate']"));
    }
    public get endDateInput(): ElementFinder {
        return element(by.xpath("//input[@id='DiscountToCreate_EndDate']"));
    }
    public get selectProducts(): ElementFinder {
        return element(by.xpath("//a[@class='btn btn-block btn-secondary']"));
    }

 // UI for create a new discount

    public get discountValueInput(): ElementFinder {
        return element(by.xpath("//input[@id='DiscountToCreate_Value']"));
    }
    public get discountAppliedValue(): ElementFinder {
        return element(by.xpath('//*[@id="DiscountToCreate_DiscountValueType_chosen"]/a'));
    }
    public get discountType(): ElementFinder {
        return element(by.xpath('//*[@id="typeOfDiscount_chosen"]/a'));
    }

    // create new discount
    public get searchbarforNewDiscount(): ElementFinder {
        return element(by.xpath("//input[@placeholder='Search / Scan']"));
    }
    public get checkboxForSearchBar(): ElementFinder {
        return element(by.xpath("//input[@class='checkbox_products']"));
    }
    public get createDiscountButton(): ElementFinder {
        return element(by.xpath('//*[@id="btnCreateDiscount"]'));
    }

    // pop for view

    public get ViewButton(): ElementFinder {
        return element(by.xpath("//tr[@id='356']//div[@class='btn-group']//a[@id='orderOverview']"));
    }
    public get viewPopUpTitle(): ElementFinder {
        return element(by.xpath('//*[@id="DetailsModal_356"]/div/div/div[1]/h6'));
    }
    public get editButton(): ElementFinder {
        return element(by.xpath('//*[@id="DetailsModal_356"]/div/div/div[2]/div[1]/a[2]'));
    }
    public get deleteButton(): ElementFinder {
        return element(by.xpath('//*[@id="DetailsModal_356"]/div/div/div[2]/div[1]/a[3]'));
    }
    public get closeButton(): ElementFinder {
        return element(by.xpath('//*[@id="DetailsModal_356"]/div/div/div[3]/button'));
    }
    public get closeIconForView(): ElementFinder {
        return element(by.xpath("//div[@class='modal-dialog modal-lg']//button[@class='close']"))
    }

    // UI for create discount by volume
    public get discountTypeForVolumeDiscount(): ElementFinder {
        return element(by.xpath("//select[@id='typeOfDiscount']"));
    }

    // Edit discount
    public get editDiscountTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
    }

    // Delete button
    public get confirmDelete(): ElementFinder {
        return element(by.xpath('//*[@id="modal_Delete_Warning"]/div/div/div[2]/div/div/div[2]/button'));
    }

    // Pagination
    public get paginatorForDiscount(): ElementFinder {
        return element(by.xpath('//*[@id="dt_ActiveDiscounts_next"]/a'));
    }
    public get previousPaginatorForDiscount(): ElementFinder {
        return element(by.xpath('//*[@id="dt_ActiveDiscounts_previous"]'));
    }
}
