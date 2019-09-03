import { by, element, ElementFinder } from 'protractor';

export class CompanyInfoPage {


    public get companyInfoLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/ul/li[1]/a'));
    }

    public get companyInformationTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
    }
    public get companyProfileTab(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/form/div/div/div[1]/ul/li[1]/a'));
    }
    public get posSettingsTab(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/form/div/div/div[1]/ul/li[2]/a'));
    }
    public get stateInfoTab(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/form/div/div/div[1]/ul/li[3]/a'));
    }
    public get quickBooksInfoTab(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/form/div/div/div[1]/ul/li[4]/a'));
    }

    // Company profile
    public get streetAdressInput(): ElementFinder {
        return element(by.xpath("//input[@id='Company_Address1']"));
    }
    public get unitInput(): ElementFinder {
        return element(by.xpath("//input[@id='Company_Address2']"));
    }
    public get phoneInput(): ElementFinder {
        return element(by.xpath("//input[@id='Company_Phone']"));
    }
    public get publicWebsiteInput(): ElementFinder {
        return element(by.xpath("//input[@id='Company_Website']"));
    }
    public get saveCompanyDetailsButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/form/div/div/div[3]/div/div/div[2]/button'));
    }

    public get dashboardLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[1]/form/div/div/div[3]/div/div/div[1]/a'));
    }

    // state info
    public get usernameInput(): ElementFinder {
        return element(by.xpath("//input[@id='Company_WAState_Username']"));
    }
    public get locationIdInput(): ElementFinder {
        return element(by.xpath("//input[@id='Company_WAState_Location']"));
    }
}
