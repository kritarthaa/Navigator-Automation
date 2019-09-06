import { by, element, ElementFinder } from 'protractor';

export class SalesLimitPage {


    public get salesLimitLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/ul/li[5]/a'));
    }
    public get salesLimitTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
    }
    public get saveChangesButton(): ElementFinder {
        return element(by.xpath('//*[@id="tab_customer_group"]/div[1]/div[2]/a'));
    }
    public get massachusetssTab(): ElementFinder {
        return element(by.xpath("//a[@class='text-white col font-md pl-0 pt-4 pb-4 ng-binding']"));
    }
    public get recreationalTab(): ElementFinder {
        return element(by.xpath("//a[@class='col pl-0 pt-3 pb-3 ng-binding']"));
    }
    public get medicalTab(): ElementFinder {
        return element(by.xpath("//a[@class='col pl-0 pt-3 pb-3 ng-binding collapsed']"));
    }
    public get inputForFirstProduct(): ElementFinder {
        return element(by.xpath('//*[@id="collapseOne0"]/div/div/div[1]/div/div[2]/div/div/input'));
    }

    // show
    public get showToggle(): ElementFinder {
        return element(by.xpath('//*[@id="tab_customer_group"]/table/tbody/tr[1]/td[2]/div/label'));
    }
}
