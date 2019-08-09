import { browser, by, element, ElementFinder } from 'protractor';

export class TopNavPage {
    all: any;

    // queue

    public get queueLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[1]/div[2]/div[3]/a'));
    }

    public get wholePopup(): ElementFinder {
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
}
