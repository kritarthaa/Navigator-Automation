import { browser, by, element } from 'protractor';

export class DashboardPage {
    // elements

    salesCard() {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div[1]/div/div/div[1]/div'));
    }

    customerCard() {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div[1]/div/div/div[2]/div'));
    }

    totalOrdersCard() {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div[1]/div/div/div[3]/div'));
    }

    todayStatCard() {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[3]/div[1]/div'));
    }

    terminalcard() {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[2]/div[2]/div'));
    }

    vendorCard() {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/div[3]/div[2]/div[2]'));
    }

}

