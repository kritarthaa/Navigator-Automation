import { by, element, ElementFinder } from 'protractor';

export class ZReport {

    public get ReportLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/a[1]/span[1]'));
    }
    public get zReportLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/ul[1]/li[3]'));
    }
    public get zReportTitle(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]/h5[1]/span[1]'));
    }
    public get locationDropdown(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]/h5[1]/span[2]/div[1]'));
    }
    public get dataTimePicker(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/div[1]/input[2]'));
    }
    public get loadTerminaSalesData(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/div[1]/span[2]/button[1]'));
    }
    public get exportZReportData(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]/div[2]/div[1]/div[3]/form[1]/div[1]'));
    }
    public get searchBar(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/label[1]/input[1]'));
    }
    public get showDropdown(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]'));
    }
    public get firtRowtable(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]'));
    }


}
