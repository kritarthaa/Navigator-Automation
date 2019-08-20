import { by, element, ElementFinder } from 'protractor';


export class LoyaltyPage {

    public get LoyaltyLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[7]/ul/li[2]/a'));
    }
    public get loyaltyTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
    }
    public get pointConversionSettingsText(): ElementFinder {
        return element(by.xpath('//*[@id="tab_points"]/div[1]/div/h6'));
    }
    public get tableHeadForLoyalty(): ElementFinder {
        return element(by.xpath("//div[@id='tab_points']//thead//tr"));
    }
    public get toggleOptionForEarnStatus(): ElementFinder {
        return element(by.xpath("//table[1]//tbody[1]//tr[1]//td[4]//div[1]//label[1]"));
    }
    public get toggleForMaximumPointsDiscount(): ElementFinder {
        return element(by.xpath("//table[2]//tbody[1]//tr[1]//td[4]//div[1]//label[1]"));
    }
    public get toggleForRedemptionStatus(): ElementFinder {
        return element(by.xpath("//tr[2]//td[4]//div[1]//label[1]"));
    }
}
