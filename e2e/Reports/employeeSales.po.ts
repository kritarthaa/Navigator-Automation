import { by, element, ElementFinder } from 'protractor';

export class EmployeeSales {
    public get ReportLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/a[1]/span[1]'));
    }
    public get employeeSalesLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/ul[1]/li[9]'));
    }
    public get employeeSalesTitle(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/h5[1]'));
    }
    public get startDate(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]'));
    }
    public get endDate(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]'));
    }
    public get runWithNewDate(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/form[1]/input[1]'));
    }
    public get graphSalesDataTable(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]'));
    }
    public get employeeSalesData(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[3]'));
    }
    public get exportDataToCSV(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/form[1]/input[1]'));
    }

}
