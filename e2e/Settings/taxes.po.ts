import { by, element, ElementFinder } from 'protractor';

export class TaxesPage {

    public get taxesLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/ul/li[8]/a'));
    }
    public get taxesTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
    }
    public get taxCodeInput(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[1]/div/div/form/div[1]/input'));
    }
    public get rateInput(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[1]/div/div/form/div[2]/div/input'));
    }
    public get textArea(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[1]/div/div/form/div[6]/textarea'));
    }
    public get SaltLakeLocation(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[1]/div/div/form/div[7]/div/ul/li[2]/label'));
    }
    public get addButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[1]/div/div/form/div[8]/button'));
    }
    public get allLocation(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/div/select'));
    }
    public get selectLocation(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/div/select/option[3]'));
    }

    // delete
    public get deleteIcon(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/div[2]/div/table/tbody/tr[1]/td[7]/a'));
    }
    public get okButtonDelete(): ElementFinder {
        return element(by.xpath('/html/body/div[12]/div/div/div[2]/button[2]'));
    }
    public get AllLocation(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/div/select/option[2]'));
    }
}

