import { by, element, ElementFinder } from 'protractor';

export class MetrcReportPage {

    public get MetrcReportLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/ul/li[1]/a'));
    }
    public get metrcReportTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
    }
    public get startDateInput(): ElementFinder {
        return element(by.xpath('//*[@id="startDateCal"]'));
    }
    public get endDateInput(): ElementFinder {
        return element(by.xpath('//*[@id="endDateCal"]'));
    }
    public get runWithNewDate(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div/div[2]/input'));
    }
    public get exportReportButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div/div[3]/button'));
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
}
