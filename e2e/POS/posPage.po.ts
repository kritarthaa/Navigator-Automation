import { browser, by, element, ElementFinder } from 'protractor';

export class PosPage {

    // elements

    public get PosSpan(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[2]/a/span'));
    }

    public get addProduct(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[2]/div/div/div/div/div'));
    }

    public get topNav(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[1]/div/div/ul'));
    }

    public get searchBar(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[2]/div[2]/input'));
    }

    public get discount(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[1]/div/a'));
    }

    public get tax(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[3]/div[1]/a'));
    }

    public get cannabisTax(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[4]/div[1]/a'));
    }

    public get orderDetails(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[5]/div[1]/a'));
    }

    public get payButton(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[7]/div[2]/button'));
    }

    public get removeButton(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[7]/div[1]/a'));
    }

    public get addCustomer(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[1]/div/div/div[2]/a'));
    }

    public get customerTitle(): ElementFinder {
        return element(by.xpath('/html/body/div[1]/div/div/div[1]/h6'));
    }
    public async navigateTo(): Promise<any> {
        return browser.get('/#');
      }
}
