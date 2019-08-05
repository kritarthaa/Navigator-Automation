import { browser, by, element } from 'protractor';

export class PosPage {

    // elements

    PosSpan() {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[2]/a/span'));
    }

    addProduct() {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[2]/div/div/div/div/div'));
    }

    topNav() {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[1]/div/div/ul'));
    }

    searchBar() {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/div[2]/div[2]/input'));
    }

    discount() {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[1]/div/a'));
    }
    tax() {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[3]/div[1]/a'));
    }
    cannabisTax() {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[4]/div[1]/a'));
    }
    orderDetails() {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[5]/div[1]/a'));
    }
    payButton() {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[7]/div[2]/button'));
    }
    removeButton() {
        return element(by.xpath('//*[@id="cart-panel"]/div[1]/div/div/div/div[3]/div/div[7]/div[1]/a'));
    }
}