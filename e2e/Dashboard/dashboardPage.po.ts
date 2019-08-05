import { browser, by, element, ElementFinder } from 'protractor';
import { relative } from 'path';

export class DashboardPage {
  // Elements

  public get dashboardHeader(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/h6'))
  }

  public get salesCard(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div[1]/div/div/div[1]/div'));
  }

  public get customerCard(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div[1]/div/div/div[2]/div'));
  }

  public get totalOrdersCard(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div[1]/div/div/div[3]/div'));
  }

  public get todayStatCard(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[3]/div[1]/div'));
  }

  public get terminalCard(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div[2]/div'));
  }

  public get vendorCard(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[3]/div[2]/div[2]'));
  }

  public get recentOrderTable(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div/div/div'));
  }

  public get bestSellerTab(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[3]/div[1]/div/div/div/div[1]/ul[1]/li[3]/a'));
  }

  public get salesEarningTab(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[3]/div[1]/div/div/div/div[1]/ul[1]/li[2]/a'));
  }

  // Actions

  public async navigateTo(): Promise<any> {
    return browser.get('/#');
  }
}