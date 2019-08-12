import { by, element, ElementFinder } from 'protractor';

export class SalesPage {

    public get salesDropdownBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[5]/a'));
    }
    public get salesDropdownContents(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[5]/ul'));
    }
    public get ordersBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[5]/ul/li[1]/a'));
    }
    public get returnsBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[5]/ul/li[2]/a'));
    }
    public get generalReturnsBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[5]/ul/li[3]/a'));
    }
    public get orderHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/h5'));
    }
    public get searchOrder(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders_filter"]/label/input'));
    }
    public get locationDropdown(): ElementFinder {
        return element(by.xpath('//*[@id="storelocations"]'));
    }
    public get exportData(): ElementFinder {
        return element(by.xpath('//*[@id="form_order_export"]/input'));
    }
    public get newOrder(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/div/a'));
    }
    public get orderTable(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders"]'));
    }
    public get pagination(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders"]'));
    }
    public  firstCustomer(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders"]/tbody/tr[1]/td[5]/a'));
    }





}