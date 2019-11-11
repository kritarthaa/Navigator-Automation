import { by, element, ElementFinder } from 'protractor';

export class ReturnReportPage {

    public get ReturnReportLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/ul/li[13]/a'));
    }
    public get returnReportTitle(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/h5'));
    }
    public get startDateInput(): ElementFinder {
        return element(by.xpath('//*[@id="startDateCal"]'));
    }
    public get endDateInput(): ElementFinder {
        return element(by.xpath('//*[@id="endDateCal"]'));
    }
    public get runWithNewDate(): ElementFinder {
        return element(by.xpath('//*[@id="submit_allReturns"]'));
    }
    public get exportReportButton(): ElementFinder {
        return element(by.xpath("//button[@class='btn btn-primary btn-block metrcexport']"));
    }
    public get searchBar(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[3]/div[1]/div[1]/div/input'));
    }
    public get showOption(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[3]/div[1]/div[3]/div/select'));
    }
    public get firstRowData(): ElementFinder {
        return element(by.xpath("//div[@class='element-wrapper']//tbody//tr[1]"));
    }
    public get fromFirstRowOfGeneratedReports(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div/div[3]/table/tbody/tr[1]/td[4]'));
    }
    
}
