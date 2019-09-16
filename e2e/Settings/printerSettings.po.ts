import { by, element, ElementFinder } from 'protractor';

export class PrinterSettingsPage {

public get printerSettingLink(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/ul/li[7]/a'));
}
public get saveButton(): ElementFinder {
    return element(by.xpath('//*[@id="tab_receipt"]/form/div/div/div/div[2]/a'));
}
public get posPrinterSettingsTitle(): ElementFinder {
    return element(by.xpath("//h5[@class='element-header']"));
}
public get printerSelect(): ElementFinder {
    return element(by.xpath("//select[@id='installedPrinterName']"));
}
public get brotherLaserPrinter(): ElementFinder {
    return element(by.xpath("//option[contains(text(),'Brother Laser Type2 Class Driver - AFRYE')]"));
}

// printnode account
public get printNodeUsername(): ElementFinder {
    return element(by.xpath('//*[@id="tab_receipt"]/form/div/div/table/tbody/tr[7]/td[2]/div[1]/input'));
}
public get printNodePAssword(): ElementFinder {
    return element(by.xpath('//*[@id="tab_receipt"]/form/div/div/table/tbody/tr[7]/td[2]/div[2]/input'));
}

public get clientInstallerWindows(): ElementFinder {
    return element(by.xpath('//*[@id="tab_receipt"]/form/div/div/table/tbody/tr[8]/td[2]/a[1]'));
}
public get macInstallerWindows(): ElementFinder {
    return element(by.xpath('//*[@id="tab_receipt"]/form/div/div/table/tbody/tr[8]/td[2]/a[2]'));
}
public get defaultReceiptPrinter(): ElementFinder {
    return element(by.xpath('//*[@id="tab_receipt"]/form/div/div/table/tbody/tr[9]/td[2]/button'));
}
}

