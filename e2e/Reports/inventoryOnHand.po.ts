import { by, element, ElementFinder } from 'protractor';

export class InventoryOnHandPage{

    public get reportLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/a'));
    }
    public get inventoryOnHandLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[9]/ul/li[4]/a'));
    }
    public get inventoryOnHandTitle(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]'));
    }
    public get exportDataToCSV(): ElementFinder {
        return element(by.xpath('//*[@id="form_inventory_export"]/input'));
    }
}