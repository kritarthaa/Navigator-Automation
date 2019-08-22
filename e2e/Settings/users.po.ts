import { by, element, ElementFinder } from 'protractor';

export class UserPage {

      // settings
      public get sideNavSettings(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/a'));
    }
    public get userDropdown(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/ul/li[2]/a'));
    }

    // Users page
    public get usersPageTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
    }

    // Search bar
    public get searchBar(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Users_filter"]/label/input'));
    }
    public get userName(): ElementFinder {
        return element(by.xpath('//*[@id="d559d27e-a1d1-4274-bdb4-f8eb6abd1628"]/td[1]/a/strong'));
    }

    // export data
    public get exportDataButton(): ElementFinder {
        return element(by.xpath('//*[@id="form_user_export"]/input'));
    }

    // Show options
    public get showOption(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Users_length"]/label/select'));
    }

    public get showTwentyFiveOption(): ElementFinder {
        return element(by.xpath("//option[contains(text(),'25')]"));
    }
}

