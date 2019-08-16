import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from 'q';

describe('Customers Page', () => {
    let app = new AppPage();

    beforeEach(async () => {
        app = new AppPage();
        await app.login.navigateTo();
        await (browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000));
        await app.validLogin(app.users[0].email, app.users[0].password);
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationCard())));
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationBtn())));
        await app.notification.selectLocationBtn().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.closeBtn())));
        await app.notification.closeBtn().click();

    });

    // Customers -> Customers : Verify dropdown appears when click customer from side-nav
    it('Verify dropdown appears when click customer from side-nav', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
    });

    // Customers -> Customers: Verify UI of customers page

    it('Verify UI of customers page', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.exportData)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.importCustomerButton)));
        // await (browser.wait(ExpectedConditions.visibilityOf(app.customers.downloadCsvTemplate)));
        // await (browser.wait(ExpectedConditions.visibilityOf(app.customers.importingCustomerGuides)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.newCustomerButton)));

        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.seachBar)));

        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.tableList)));

        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.deleteIcon)));

    });

    // Customers -> Customers: Verify the Export data
    it('Verify the Export data', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.exportData)));
        await app.customers.exportData.click();
    });

    // Customers -> Customers: Verify the contents of import customers

    it('Verify the contents of import customers', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.importCustomerButton)));
        await app.customers.importCustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.importPopuptitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.chooseFileButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.uploadAndImport)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.cancelIcon)));
    });

    // Customers -> Customers: Verify the download CSV template
    it('Verify the download CSV template', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.downloadCsvTemplate)));
        await app.customers.downloadCsvTemplate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.downloadCsvdropdown)));
        await app.customers.downloadCsvdropdown.click();
    });

    // Customers -> Customers: Verify the contents of import customer guide

    it('Verify the contents of import customer guide', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.downloadCsvTemplate)));
        await app.customers.downloadCsvTemplate.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.importCustomerGuides)));
        await app.customers.importCustomerGuides.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.importCustomerGuideTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.lastName)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.medicalCardExpirationDate)));

    });

    // Customers -> Customers: Verify cancel button for new customer
    it('Verify cancel button for new customer', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.newCustomerButton)));
        await app.customers.newCustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.usersCard)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.cancelIconForNewCustomer)));
        await app.customers.cancelIconForNewCustomer.click();
    });

    // Customers -> Customers: Verify the search for customers
    it('Verify the search for customers', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.seachBar)));
        await app.customers.seachBar.sendKeys('Courtney');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.tableFirstcustomer)));

    });

    // Customers -> customers: Verify Customers are displayed as per required no of rows in show dropdown
    it('Verify Customers are displayed as per required no of rows in show dropdown', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.showButton)));
        await app.customers.showButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.showTwentyFive)));
        await app.customers.showTwentyFive.click();
        await app.customers.showButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.deleteIcon)));

    });

    // Customers -> Customers : Verify the components of delete of customer

    it('Verify the components of delete of customer', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.deleteIcon)));
        await app.customers.deleteIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.popupTitleForDelete)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.closeButton)));

     });

     // Customers -> Customers : Verify the cancel for delete of customer

    it('Verify the cancel for delete of customer', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.deleteIcon)));
        await app.customers.deleteIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.popupTitleForDelete)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.closeButton)));
        await app.customers.closeButton.click();
    });

    // Customers -> Customers: Verify user can delete existing customer from customers table

    it('Verify user can delete existing customer from customers table', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.deleteIcon)));
        await app.customers.deleteIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.popupTitleForDelete)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.removeButton)));
        await app.customers.removeButton.click();
    });

    // Customers -> Customers : Verify the first pop up components of new customer
    it('Verify the first pop up components of new customer', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.newCustomerButton)));
        await app.customers.newCustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.chooseUserTypes)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.firstName)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.lastNameForNewCustomer)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.continueButton)));
    });

    // Customers -> Customers : Verify the second pop up components of new customer

    it('Verify the second pop up components of new customer', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.newCustomerButton)));
        await app.customers.newCustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.continueButton)));
        await app.customers.continueButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.secondPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.phoneInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.emailInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.previousButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.streetAddressInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.cityInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.nextButtonOfSecondPopUP)));
    });

    // Customers -> Customers : Verify the third pop up components of new customer

    it('Verify the third pop up components of new customer', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.newCustomerButton)));
        await app.customers.newCustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.firstName)));
        await app.customers.firstName.sendKeys('kumar');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.lastNameForNewCustomer)));
        await app.customers.lastNameForNewCustomer.sendKeys('pun');

        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.continueButton)));
        await app.customers.continueButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.secondPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.phoneInput)));
        await app.customers.phoneInput.sendKeys('+977 9819428228');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.emailInput)));
        await app.customers.emailInput.sendKeys('kpun@sevadev.com');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.streetAddressInput)));
        await app.customers.streetAddressInput.sendKeys('Manglapur');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.cityInput)));
        await app.customers.cityInput.sendKeys('Butwal');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.nextButtonOfSecondPopUP)));
        await app.customers.nextButtonOfSecondPopUP.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.thirdPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.previousButtonOFThirdPopUP)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.nextButtonOFThirdPopUP)));
        await app.customers.nextButtonOFThirdPopUP.click();
    });

    // Customers -> Customers : Verify the fourth pop up components of new customer

    it('Verify the fourth pop up components of new customer', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customersLink)));
        await app.customers.customersLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.newCustomerButton)));
        await app.customers.newCustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.firstName)));
        await app.customers.firstName.sendKeys('kumar');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.lastNameForNewCustomer)));
        await app.customers.lastNameForNewCustomer.sendKeys('pun');

        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.continueButton)));
        await app.customers.continueButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.secondPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.phoneInput)));
        await app.customers.phoneInput.sendKeys('+977 9819428228');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.emailInput)));
        await app.customers.emailInput.sendKeys('kpun@sevadev.com');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.streetAddressInput)));
        await app.customers.streetAddressInput.sendKeys('Manglapur');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.cityInput)));
        await app.customers.cityInput.sendKeys('Butwal');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.nextButtonOfSecondPopUP)));
        await app.customers.nextButtonOfSecondPopUP.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.thirdPopUpTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.previousButtonOFThirdPopUP)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.nextButtonOFThirdPopUP)));
        await app.customers.nextButtonOFThirdPopUP.click();

    });
});

