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

    public get newUserButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/div/button'));
    }

    // new user pop up
    public get firstNameInput(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[1]/div/div/div[1]/div[1]/div[1]/div/input'));
    }
    public get lastNameInput(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[1]/div/div/div[1]/div[1]/div[2]/div/input'));
    }
    public get continueButton(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[1]/div/div/div[2]/button'));
    }
    public get phoneNumberInput(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[2]/div/div[2]/div[2]/div/input'));
    }
    public get streetAdressInput(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[2]/div/div[2]/div[5]/div/input'));
    }
    public get cityInput(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[2]/div/div[2]/div[7]/div/input'));
    }
    public get zipInput(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[2]/div/div[2]/div[9]/div/input'));
    }
    public get nextButton(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[2]/div/div[3]/button[2]'));
    }
    public get emailInput(): ElementFinder {
        return element(by.xpath('//*[@id="EMail"]'));
    }
    public get newUserName(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[3]/div/div[2]/div[3]/div/input'));
    }
    public get newUserPassword(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[3]/div/div[3]/div[1]/div/input'));
    }
    public get confirmPassword(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[3]/div/div[3]/div[2]/div/input'));
    }
    public get submitButton(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/div[2]/div/div/div/div/div[3]/div/div[4]/button[2]'));
    }
    public get closeIcon(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div/a'));
    }

    // Edit button
    public get editButtonForUsers(): ElementFinder {
        return element(by.xpath("//tr[@id='f6806ea1-7245-4153-bee7-6243e986ff42']//i[@class='icon-user']"));
    }
    public get userInfoTab(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div[2]/div/div[2]/div[1]/ul/li[1]/a'));
    }
    public get firstNameInputForPopup(): ElementFinder {
        return element(by.xpath('//*[@id="tab_userinfo"]/div/div/table/tbody/tr[1]/td[2]/input'));
    }
    public get AccountSettingsTab(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div[2]/div/div[2]/div[1]/ul/li[2]/a'));
    }
    public get dispalyNameInputForPopup(): ElementFinder {
        return element(by.xpath('//*[@id="displayname"]'));
    }
    public get saveAndChangesButton(): ElementFinder {
        return element(by.xpath('//*[@id="add-user-form"]/div[3]/button[2]'));
    }
    public get closeButtonForPopup(): ElementFinder {
        return element(by.xpath("//button[@class='btn btn-white']"));
    }
    // delete
    public get deleteIconForUser(): ElementFinder {
        return element(by.xpath("//tr[@id='e1182c2f-77df-4697-bedf-aa6df8a5946d']//a[@class='btn btn-danger btn-md btn-remove']"));
    }
    public get removeButtonForUser(): ElementFinder {
        return element(by.xpath('//*[@id="removeEntryModal"]/div/div/div[3]/button[2]'));
    }
    public get deleteTextForUser(): ElementFinder {
        return element(by.xpath("//div[@class='modal-body text-center']"));
    }
    // pagination
    public get nextPageButton(): ElementFinder {
        return element(by.xpath("//a[contains(text(),'Next')]"));
    }
    public get previousPageButton(): ElementFinder {
        return element(by.xpath("//li[@id='dt_Users_previous']"));
    }
}


