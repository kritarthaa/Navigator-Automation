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
        return element(by.xpath('//*[@id="form_allReturns"]/div'));
    }
    public get exportReportButton(): ElementFinder {
        return element(by.xpath('//*[@id="form_allReturns_export"]/div'));
    }
    public get searchBar(): ElementFinder {
        return element(by.xpath('//*[@id="returns_report_filter"]/label/input'));
    }
    public get showOption(): ElementFinder {
        return element(by.xpath('//*[@id="returns_report_length"]/label/select'));
    }
    public get firstRowData(): ElementFinder {
        return element(by.xpath('//*[@id="returns_report"]/thead/tr/th[2]'));
    }
    public get fromFirstRowOfGeneratedReports(): ElementFinder {
        return element(by.xpath('//*[@id="returns_report"]/tbody/tr[1]'));
    }
}
