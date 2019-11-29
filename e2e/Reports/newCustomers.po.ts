import { by, element, ElementFinder } from 'protractor';
export class NewCustomers {

    public get ReportsLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/a'));
    }
    public get newCustomersLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/ul/li[16]/a'));
    }
    public get newCustomersPageTitle(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div[2]/div/div/div/div[1]/div[1]/h5'));
    }
    public get startDate(): ElementFinder {
        return element(by.xpath('//*[@id="example-daterange1"]'));
    }
    public get endDate(): ElementFinder {
        return element(by.xpath('//*[@id="example-daterange2"]'));
    }
    public get submitButton(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/button[1]'));
    }
    public get customerFound(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]'))
    }
    public get exportStatus(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[3]/div[2]/div[1]'));
    }
    public get newCustomersDataTable(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[4]/div[1]/div[1]'));
    }
    public get generateExportFile(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div[2]/div/div/div/div[3]/div[3]/div[2]/div/div[2]/div/button'));
    }
    public get clickToSeeIfReadyForDownloadButton(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[3]/div[2]/div[1]/div[2]/div[1]/button[1]'));
    }
    public get completeText(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div[2]/div/div/div/div[3]/div[3]/div[2]/div/div[2]/div/span'));
    }
    public get DownloadButton(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[3]/div[2]/div[1]/div[2]/div[1]/a[1]'));

    }

}