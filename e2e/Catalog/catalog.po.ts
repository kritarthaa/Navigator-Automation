import { browser, by, element, ElementFinder } from 'protractor';
import { relative } from 'path';

export class CatalogPage {
    //Elements

    public get catalogBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[3]/a'));
    }

    public availableCannabis(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[3]/ul/li[2]/a'));
    }

    public allCannabisProduct(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[3]/ul/li[3]/a'));
    }

    public regularProducts(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[3]/ul/li[5]/a'));
    }
    
}