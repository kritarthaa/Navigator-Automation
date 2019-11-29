import { by, element, ElementFinder } from 'protractor';

export class DiscountsByEmployee {

    public get reportsLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/a[1]'));
    }
    public get discountByEmployeeLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/ul[1]/li[8]'));
    }
    public get discountByEmployeeTitle(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/h5[1]'));
    }
    public get discountByEmployeeTable(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]'));
    }


}
