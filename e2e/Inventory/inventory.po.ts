import { by, element, ElementFinder } from 'protractor';

export class InventoryPage {

    public get inventoryDropdownBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[4]/a'));
    }

    public get inventoryBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[4]/ul/li[1]/a'));
    }

    public get locationsBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[4]/ul/li[3]/a'));
    }

    public get warehouseBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[4]/ul/li[4]/a'));
    }

    public get inventoryHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/h5'));
    }

    public get exportDataBtn(): ElementFinder {
        return element(by.xpath('//*[@id="form_inventory_export"]/input'));
    }
    public get importItemBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/div/button'));
    }
    public get downloadCsvTempBtn(): ElementFinder {
        return element(by.xpath('//*[@id="dropdownMenuButton"]'));
    }
    public get intakeInventoryBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/div/a[3]'));
    }
    public get inventorySearch(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div[1]/div[1]/div/input'));
    }
    public get locationDropDown(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div[1]/div[2]/div/select'));
    }
    public get inventoryTable(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div[2]/table'));
    }
    public get downloadCsvTemp(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/div/div/div/a[1]'));
    }
    public get importingItemGuides(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/div/div/div/a[2]'));
    }

}
