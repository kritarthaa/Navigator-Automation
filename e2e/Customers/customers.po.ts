import { by, element, ElementFinder } from 'protractor';

export class CustomersPage {

    // Drop-down mwnu

    public get customerSidenav(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[6]/a/span'));
      }
    public get customerDropdown(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[6]/ul'));
    }
    public get customersLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[6]/ul/li[1]/a'));
    }

    // Customers page
    public get exportData(): ElementFinder {
        return element(by.xpath('//*[@id="form_customer_export"]/input'));
    }
    public get importCustomerButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/div/button[1]'));
    }
    public get downloadCsvTemplate(): ElementFinder {
        return element(by.xpath('//*[@id="dropdownMenuButton"]'));
    }
    public get importingCustomerGuides(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/div/div/div/a[2]'));
    }
    public get newCustomerButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/div/button[2]'));
    }
    public get seachBar(): ElementFinder {
        return element(by.xpath("//input[@placeholder='Search / Scan']"))
    }
    public get tableList(): ElementFinder {
        return element(by.xpath('//*[@id="dt_Customers"]'));
    }
    public get deleteIcon(): ElementFinder {
        return element(by.xpath("//tr[@id='13616']//a[@class='btn btn-danger btn-md btn-remove']"));
    }
    public get popupTitleForDelete(): ElementFinder {
        return element(by.xpath('//*[@id="exampleModalLabel"]'));
    }

    // import customer pop up
    public get importPopuptitle(): ElementFinder {
        return element(by.xpath('//*[@id="customerInfo"]/div/div/div[1]/h6'));
    }
    public get chooseFileButton(): ElementFinder {
        return element(by.xpath('//*[@id="customerInfo"]/div/div/div[2]/div/div[1]/form/input[1]'));
    }
    public get uploadAndImport(): ElementFinder {
        return element(by.xpath('//*[@id="customerInfo"]/div/div/div[2]/div/div[1]/form/input[2]'));
    }
    public get cancelIcon(): ElementFinder {
        return element(by.xpath('//*[@id="customerInfo"]/div/div/div[1]/a'));
    }

    // Download CSV template
    public get downloadCsvdropdown(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/div/div/div/a[1]'));
    }

    // Import customer guide
    public get importCustomerGuides(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/div/div/div/a[2]'));
    }
    public get importCustomerGuideTitle(): ElementFinder {
        return element(by.xpath('//*[@id="customerInfo"]/div/div/div[1]/h6'));
    }
    public get lastName(): ElementFinder {
        return element(by.xpath("//td[contains(text(),'LastName')]"));
    }
    public get medicalCardExpirationDate(): ElementFinder {
        return element(by.xpath("//td[contains(text(),'MedicalCardExpirationDate')]"));
    }

    // New customer
    public get cancelIconForNewCustomer(): ElementFinder {
        return element(by.xpath('//*[@id="add-customer-form"]/div/a'));
    }
    public get usersCard(): ElementFinder {
        return element(by.xpath("//div[@class='row']//div[@class='col-md-6']"));
    }

    // Search bar
    public get tableFirstcustomer(): ElementFinder {
        return element(by.xpath("//tr[@id='11024']//td[@class='sorting_1']"));
    }

    // Show
    public get showButton(): ElementFinder {
        return element(by.xpath("//select[@name='dt_Customers_length']"));
    }
    public get showTwentyFive(): ElementFinder {
        return element(by.xpath("//option[contains(text(),'25')]"));
    }
    public get tableForCustomers(): ElementFinder {
        return element(by.xpath("//table[@id='dt_Customers']"));
    }

    // Delete
    public get closeButton(): ElementFinder {
        return element(by.xpath('//*[@id="removeEntryModal"]/div/div/div[3]/button[1]'));
    }
    public get removeButton(): ElementFinder {
        return element(by.xpath('//*[@id="removeEntryModal"]/div/div/div[3]/button[2]'));
    }

    // New customer first pop up
    public get chooseUserTypes(): ElementFinder {
        return element(by.xpath("//label[contains(text(),'Choose User Type')]"));
    }
    public get firstName(): ElementFinder {
        return element(by.xpath("//input[@id='FirstName']"));
    }
    public get lastNameForNewCustomer(): ElementFinder {
        return element(by.xpath("//input[@id='LastName']"));
    }
    public get continueButton(): ElementFinder {
        return element(by.xpath("//button[contains(text(),'Continue')]"));
    }

    // New customer second pop up
    public get secondPopUpTitle(): ElementFinder {
        return element(by.xpath("//h5[contains(text(),'Customer Information')]"));
    }
    public get phoneInput(): ElementFinder {
        return element(by.xpath("//input[@id='Phone']"));
    }
    public get emailInput(): ElementFinder {
        return element(by.xpath("//input[@id='EMail']"));
    }
    public get previousButton(): ElementFinder {
        return element(by.xpath("//div[contains(@class,'cardX mb-4')]//button[contains(@class,'btn btn-white btn-slider-prev slick-arrow')][contains(text(),'Previous')]"));
    }
    public get streetAddressInput(): ElementFinder {
        return element(by.xpath("//input[@id='Address1']"));
    }
    public get cityInput(): ElementFinder {
        return element(by.xpath("//input[@id='City']"));
    }
    public get nextButtonOfSecondPopUP(): ElementFinder {
        return element(by.xpath("//button[contains(@class,'basic-info')][contains(text(),'Next')]"));
    }

    // New customer third pop up
    public get thirdPopUpTitle(): ElementFinder {
        return element(by.xpath("//h5[contains(text(),'Customer Group')]"));
    }
    public get previousButtonOFThirdPopUP(): ElementFinder {
        return element(by.xpath('//*[@id="CustomerSlider"]/div/div/div[3]/div/div/div[3]/button[1]'));
    }
    public get nextButtonOFThirdPopUP(): ElementFinder {
        return element(by.xpath("//div[contains(@class,'bxslide slide-enable slick-slide slick-current slick-active')]//button[contains(@class,'slick-arrow')][contains(text(),'Next')]"));
    }

    // New customer fourth pop up

    public get fourthPopUpTitle(): ElementFinder {
        return element(by.xpath("//h5[contains(text(),'Additional Notes')]"));
    }
    public get noteOne(): ElementFinder {
        return element(by.xpath("//textarea[@id='AddNote1']"));
    }
    public get previousButtonOFFourthPopUp(): ElementFinder {
        return element(by.xpath('//*[@id="CustomerSlider"]/div/div/div[4]/div/div/div[5]/button[1]'));
    }
}
