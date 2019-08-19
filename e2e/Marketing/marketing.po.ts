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
}
