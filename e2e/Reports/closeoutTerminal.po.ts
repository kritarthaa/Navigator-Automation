import { by, element, ElementFinder } from 'protractor';

export class CloseOutTerminalPage {

    public get ReportsLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/a'));
    }
    public get closeOutTeminalLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/ul/li[2]/a'));
    }
    public get closeOutTeminalTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header row']"));
    }
    public get dateInput(): ElementFinder {
        return element(by.xpath('//*[@id="add-stock-form"]/div/div/input[2]'));
    }
    public get loadTerminalSalesDataButton(): ElementFinder {
        return element(by.xpath('//*[@id="add-stock-form"]/div/div/span[1]/button'));
    }
    public get exportDataToCSV(): ElementFinder {
        return element(by.xpath('//*[@id="add-stock-form"]/div/div/span[2]/button'));
    }
    public get tableHead(): ElementFinder {
        return element(by.xpath("//table[@class='table table-hover']//thead//tr"));
    }
    public get viewIcon(): ElementFinder {
        return element(by.xpath('//*[@id="save-closeout-form"]/div[1]/table/tbody/tr[1]/td[13]/button'));
    }
    public get closeIcon(): ElementFinder {
        return element(by.xpath('//*[@id="section-to-print2"]/form/a'));
    }
}
