import { by, element, ElementFinder } from 'protractor';

export class SalesReportPage {

    public get salesReportLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/ul/li[11]/a'));
    }

    public get salesReportTitle(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/h5'));
    }

    public get salesReportLocation(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/h5/span[2]/div/select'));
    }
    public get endDate(): ElementFinder {
        return element(by.xpath('//*[@id="example-daterange2"]'));
    }
    public get startDate(): ElementFinder {
        return element(by.xpath('//*[@id="example-daterange1"]'));
    }
    public get salesReportSubHeading(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[1]/div[1]/h5'));
    }

    public get generateSalesReport(): ElementFinder {
        return element(by.xpath('//*[@id="dropdownMenuButton"]'));
    }
    public get generateSalesReportAll(): ElementFinder {
        return element(by.xpath('//*[@id="submit_allsales"]'));
    }
    public get generatedReports(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[3]/div/div[1]/div[1]/h5'));
    }
    public get generatedReportsTable(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[3]/div/div[3]/table'));
    }
    public get refreshBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[3]/div/div[1]/div[2]/a'));
    }
}
