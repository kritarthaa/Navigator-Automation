import { browser, by, element, ElementFinder } from 'protractor';

export class TopNavPage {
    all: any;

    // queue

    public get queueLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[2]/div[3]/a'));
    }

    public get CustomerListwholePopup(): ElementFinder {
         return element.all(by.xpath('/html/body/div[2]/div/div')).first();
    }
    public get closeIcon(): ElementFinder {
        return element(by.xpath('/html/body/div[2]/div/div/div[1]/button'));
    }

    // Orders

    public get orderLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[2]/div[4]/a'));
    }
    public get orderTableList(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[2]'));
    }
    public get tableList(): ElementFinder {
        return element.all(by.xpath('//*[@id="dt_Orders"]')).first();
    }

    // Home
    public get homeIcon(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[2]/div[1]/a'));
    }
    public get dashboardCard(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[2]/div[1]/a'));
    }

    // Cashier

    public get cashierIcon(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[2]/div[2]/a'));
    }
    public get cashierCard(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[2]/div[2]'));
    }
    public get textCenter(): ElementFinder {
        return element(by.xpath('//*[@id="ModalStartShift"]/div/div/div/form/div/div[1]'));
    }
    public get formCenter(): ElementFinder {
        return element(by.xpath('//*[@id="ModalStartShift"]/div/div/div/form'));
    }
    public get closeIconForCashier(): ElementFinder {
        return element(by.xpath('//*[@id="ModalStartShift"]/div/div/div/form/a'));
    }
    public get startShiftButton(): ElementFinder {
        return element(by.xpath('//*[@id="ModalStartShift"]/div/div/div/form/div/div[4]/button'));
    }

    // Kebab menu

    public get kebabMenu(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[3]/div/div/div[2]/a'));
    }
    public get dropdownList(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[3]/div/div/div[2]/div'));
    }
    public get NewOrder(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[3]/div/div/div[2]/div/a[1]'));
    }
    public get RemoveCustomer(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[3]/div/div/div[2]/div/a[2]'));
    }
    public get ClearCart(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[3]/div/div/div[2]/div/a[3]/span'));
    }

    // Search bar

    public get searchBar(): ElementFinder {
        return element(by.xpath('//*[@id="search-input"]'));
    }
    public get searchPOS(): ElementFinder {
        return element(by.xpath('//*[@id="search-list"]/li[2]/a'));
    }
}
