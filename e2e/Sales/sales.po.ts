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
    public get returnsHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/h5'));
    }
    public get generalReturnsHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/h5'));
    }
    public get searchOrder(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders_filter"]/label/input'));
    }
    public get searchGeneralWaste(): ElementFinder {
        return element(by.xpath('//*[@id="dt_general_waste_filter"]/label/input'));
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
    public get newOrderCard(): ElementFinder {
        return element(by.xpath('//*[@id="triggerModal"]/div/div'));
    }
    public get newOrderContinue(): ElementFinder {
        return element(by.xpath('//*[@id="triggerModal"]/div/div/div[2]/div/a'));
    }
    public get newOrderClose(): ElementFinder {
        return element(by.xpath('//*[@id="triggerModal"]/div/div/div[2]/div/button'));
    }
    public get orderTable(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders"]'));
    }
    public get generalWasteTable(): ElementFinder {
        return element(by.xpath('//*[@id="dt_general_waste"]'));
    }
    public get pagination(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders"]'));
    }
    public get addNewItemCard(): ElementFinder {
        return element(by.xpath('//*[@id="modal_add_general_waste"]/div/div'));
    }
    public get addNewItemBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/div/a'));
    }
    public firstCustomer(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders"]/tbody/tr[1]/td[5]/a'));
    }
    public searchedId(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Orders"]/tbody/tr'));
    }
    public addNewItemHeader(): ElementFinder {
        return element(by.xpath('//*[@id="modal_add_general_waste"]/div/div/div[1]/h6'));
    }
    public addBtn(): ElementFinder {
        return element(by.xpath('//*[@id="modal_add_general_waste"]/div/div/div[2]/form/div[5]/a'));
    }

}
