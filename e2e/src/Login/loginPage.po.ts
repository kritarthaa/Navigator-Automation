import { browser, by, element } from 'protractor';

export class LoginPage {
    // elements
    username() {
        return element(by.xpath('//*[@id="UserName"]'));
    }

    password() {
        return element(by.xpath('//*[@id="Password"]'));
    }

    logIn() {
        return element(by.xpath('/html/body/div[1]/div/div/div/form/div[2]/div[3]/button'));
    }

    selectLocationCard() {
        return element(by.xpath('/html/body/div[1]/div/div/div[2]/div/div[2]/div[1]'));
    }

    selectLocationBtn() {
        return element(by.xpath('/html/body/div[1]/div/div/div[2]/div/div[2]/div[1]/div[3]/a'));
    }
}

