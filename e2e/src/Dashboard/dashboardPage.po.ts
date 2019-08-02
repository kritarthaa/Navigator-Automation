import { browser, by, element, ElementFinder } from 'protractor';

export class DashboardPage {
  // Elements

  public get navBarBrand(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[1]/a'))
  }

  // Actions

  public async navigateTo(): Promise<any> {
    return browser.get('/#/dashboard');
  }
}