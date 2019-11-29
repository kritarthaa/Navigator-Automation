import { by, element, ElementFinder } from 'protractor';

export class BestSellingProductPage {
    public get ReportLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/a[1]/span[1]'));
    }
    public get bestSellingProductsLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/ul[1]/li[6]/a[1]'));
    }
    public get bestSellingProductsTitle(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/h5[1]'));
    }
    public get startTime(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/input[1]'));
    }
    public get endTime(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/input[2]'));
    }
    public get runWithNewData(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[2]/div[2]/form[1]/input[1]'));
    }
    public get exportDataToCSV(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[2]/div[3]/form[1]/input[1]'));
    }
    public get cannabisProductTab(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/ul[1]/li[2]'));
    }
    public get nonCannabisProductTab(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/ul[1]/li[3]'));
    }
    public get tableItems(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/ul[1]/li[3]'));
    }
    public get nonCannabisProductTabGraph(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/ul[1]/li[3]'));
    }
    public get productNameLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[2]/a[1]'));
    }
    public get productDetailsPage(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/h5[1]/strong[1]'));
    }
}