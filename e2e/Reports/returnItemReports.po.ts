import { by, element, ElementFinder } from 'protractor';

export class ReturnItemReportPage {

    public get ReturnItemReportLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/ul/li[14]/a'));
    }
    public get returnItemReportTitle(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/h5'));
    }
    public get startDateInput(): ElementFinder {
        return element(by.xpath('//*[@id="startDateCal"]'));
    }
    public get locationFilter(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/h5/span[2]/div/select'));
    }
    public get endDateInput(): ElementFinder {
        return element(by.xpath('//*[@id="endDateCal"]'));
    }
    public get runWithNewDate(): ElementFinder {
        return element(by.xpath('//*[@id="form_allReturnItems"]/div'));
    }
    public get exportReportButton(): ElementFinder {
        return element(by.xpath('//*[@id="form_allReturnItems_export"]/div'));
    }
    public get searchBar(): ElementFinder {
        return element(by.xpath('//*[@id="returnitems_report_filter"]'));
    }
    public get showOption(): ElementFinder {
        return element(by.xpath('//*[@id="returnitems_report_length"]/label/select'));
    }
    public get firstRowData(): ElementFinder {
        return element(by.xpath('//*[@id="returns_report"]/thead/tr/th[2]'));
    }
}
