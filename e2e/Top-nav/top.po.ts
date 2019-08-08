import { browser, by, element, ElementFinder } from 'protractor';

export class TopNavPage {
    all: any;

    // elements

    public get queueLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[2]/div[3]/a'));
    }

    // getOptions() {
    //     return this.all(by.xpath('/html/body/div[2]/div/div/div[1]/button')).getText('×');
    // }
    public get dashboardButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[2]/div[1]/a'));
    }
}