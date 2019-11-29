import { by, element, ElementFinder } from 'protractor';

export class PaymentsReport {

    public get ReportsLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]'));
    }
    
    public get paymentsReportLink(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[2]/ul[1]/li[9]/ul[1]/li[12]'));
    }
    public get paymentsReportTitle(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/h5[1]'));
    }
    public get startDate(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/input[1]'));
    }
    public get endDate(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/input[2]'));
    }
    public get runWithNewDateButton(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[2]/div[2]/form[1]'));
    }
    public get exportPaymentDate(): ElementFinder {
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[2]/div[3]/form[1]/input[1]'));
    }
    public get paymentDataTable(): ElementFinder{
        return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]'));
    }
}
