import { browser, by, element, ElementFinder } from 'protractor';

export class TopNavPage {

    // elements

    public get queueLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[2]/div[3]/a'));
    }

    public get queueCustomerTitle(): ElementFinder {
        return element(by.xpath('/html/body/div[2]/div/div'));
    }
    public get dashboardButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[2]/div[1]/a'));
    }
}