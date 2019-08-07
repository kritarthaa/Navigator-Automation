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

    // 

    public get addCustomer(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[1]/div/div/div[2]/a'));
    }

    public get customerTitle(): ElementFinder {
        return element(by.xpath('/html/body/div[1]/div/div/div[1]/h6'));
    }

    public get closeIcon(): ElementFinder {
        return element(by.xpath('/html/body/div[1]/div/div/div[1]/button'));
    }

    public get searchBarCustomer(): ElementFinder {
        return element(by.xpath('/html/body/div[2]/div/div/div[2]/div/div[1]/input'));
    }
    public get linkToOrder(): ElementFinder {
        return element(by.xpath('/html/body/div[1]/div/div/div[2]/div/div[3]/div[1]/div[3]/a'));
    }
    public linkOrderget() {
       return element(by.xpath('/html/body/div[2]/div/div/div[2]/div/div[3]/div[1]/div[3]'));
    //    return element(by.xpath('/html/body/div[2]/div/div/div[2]/div/div[3]')).first().all(by.css('div')).last().getText();

    }
    public get customerfromPopup(): ElementFinder {
        return element(by.xpath('/html/body/div[2]/div/div/div[2]/div/div[3]/div[1]/div[2]/a'));
    }


    // top bar

    public get favourite(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[1]/div/div/ul/li[4]/a/div'));
    }
    public get favouriteContent(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[2]/div[3]/div'));
    }
    public get cannabis(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[1]/div/div/ul/li[3]/a'));
    }
    public get all(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[1]/div/div/ul/li[1]/a'));
    }
    public get regular(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[1]/div/div/ul/li[2]/a'));
    }
    public get locationIcon(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[1]/div/div/ul/li[7]/a/i'));
    }
    public get displayScreen(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[1]/div/div/ul/li[8]/a/i'));
    }
    public get qty(): ElementFinder {
        return element(by.xpath('/html/body/div[2]/div/div[2]/div/div[1]/table/thead/tr/th[1]'));
    }


    // Cart
    public get payButtonCart(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[7]/div[2]/button'));
    }
    public get pleaseAddCartNotification(): ElementFinder {
        return element(by.xpath('/html/body/div[12]/div'));

    }
    public get addProducts(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[2]/div[3]/div[1]/a/div/div[2]'));
    }
    public get cartItem(): ElementFinder {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[2]/div/div/div/div[2]/div[1]'));
    }
    public get itemTitle(): ElementFinder {
        return element(by.xpath('/html/body/div[2]/div/div/div[2]/div/div[1]/div/div/div/div[2]/div[1]/div'));
    }
    public async navigateTo(): Promise<any> {
        return browser.get('/#');
      }
}
