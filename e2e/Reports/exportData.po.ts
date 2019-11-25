import { by, element, ElementFinder } from 'protractor';
export class ExportDataPage {

    public get ReportsLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/a'));
    }
    public get exportDataLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/ul/li[15]'));
    }
    public get exportDataTitle(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/h5'));
    }
    public get exportDataSubHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[1]/div[1]/div/strong'));
    }
    public get exportSalesData(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[2]/div[1]/form/button'));
    }
    public get exportCustomerData(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[2]/div[2]/form/button'));
    }
}

