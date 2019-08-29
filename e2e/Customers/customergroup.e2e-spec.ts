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

    // Customers -> Customer Groups : Verify UI of Customergroup page
    it('Verify UI of Customergroup page', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.tableHead)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.editIcon)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.deleteIcon)));
    });

    // Customers -> Customer Groups: Verify the UI of define new customer group

    it('Verify the UI of define new customer group', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await app.customergroup.defineNewCustomerGroupButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupNameInput)));
        await app.customergroup.customerGroupNameInput.sendKeys('KumarP');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.descriptionText)));
        await app.customergroup.descriptionText.sendKeys('employee');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.cancelButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.createButton)));
    });

    // Customers -> Customer Groups: Verify user can enter customer group name and description in the define new customer group pop up

    it('Verify user can enter customer group name and description in the define new customer group pop up', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await app.customergroup.defineNewCustomerGroupButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupNameInput)));
        await app.customergroup.customerGroupNameInput.sendKeys('KumarP');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.descriptionText)));
        await app.customergroup.descriptionText.sendKeys('employee');
    });

    // Customers -> Customer Groups: Verify new customer group name can be created
    it('Verify new customer group name can be created', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await app.customergroup.defineNewCustomerGroupButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupNameInput)));
        await app.customergroup.customerGroupNameInput.sendKeys('KumarP');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.descriptionText)));
        await app.customergroup.descriptionText.sendKeys('employee');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.createButton)));
        await app.customergroup.createButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupList)));
    });

    //  Customers -> Customer Groups: Verify clicking Cancel button close pop up of define new customer group

    it('Verify clicking Cancel button close pop up of define new customer group', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await app.customergroup.defineNewCustomerGroupButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupNameInput)));
        await app.customergroup.customerGroupNameInput.sendKeys('KumarP');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.descriptionText)));
        await app.customergroup.descriptionText.sendKeys('employee');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.cancelButton)));
        await app.customergroup.cancelButton.click();
    });

    //  Customers -> Customer Groups: Verify pop up open when click edit icon

    it('Verify pop up open when click edit icon', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.tableHead)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.editIcon)));
        await app.customergroup.editIcon.click();
    });

    //  Customers -> Customer Groups: Verify customer group name and description can be edited

    it('Verify customer group name and description can be edited and submit', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.tableHead)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.editIcon)));
        await app.customergroup.editIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupNameInput)));
        await app.customergroup.customerGroupNameInput.clear();
        await app.customergroup.customerGroupNameInput.sendKeys('Veteran');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.descriptionText)));
        await app.customergroup.descriptionText.sendKeys('Employee');
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.updateButton)));
        await app.customergroup.updateButton.click();
    });

    // Customers -> Customer Groups: Verify clicking cancel close the pop up from delete icon

    it('Verify clicking cancel close the pop up from delete icon', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.tableHead)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.deleteIcon)));
        await app.customergroup.deleteIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.cancelButtonForDelete)));
        await app.customergroup.cancelButtonForDelete.click();

    });

    // Customers -> Customer Groups: Verify clicking OK button delete the customer group

    it('Verify clicking OK button delete the customer group', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupLink)));
        await app.customergroup.customerGroupLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.customerGroupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.defineNewCustomerGroupButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.tableHead)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.deleteIcon)));
        await app.customergroup.deleteIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customergroup.okButton)));
        await app.customergroup.okButton.click();

    });

});
