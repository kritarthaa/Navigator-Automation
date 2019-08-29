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

      // Customers -> Waiting List : Verify UI of waiting list page
    it('Verify UI of waiting list page', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListDropdown)));
        await app.waitinglist.waitingListDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkInACustomerButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkedInTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkedOutTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.tableHeadForCheckedIn)));
    });

    // Customers -> Waiting List: Verify UI of check in a customer button
    it('Verify UI of check in a customer button', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListDropdown)));
        await app.waitinglist.waitingListDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkInACustomerButton)));
        await app.waitinglist.checkInACustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.customerCheckInPopupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.customerCheckInFromList)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.searchBarForCustomerChekIn)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.closeIcon)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.closeButton)));

    });

    // Customers -> Waiting List : Verify check in a customer pop up close when clicked on close icon as well as close button
    it('Verify check in a customer pop up close when clicked on close icon as well as close button', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListDropdown)));
        await app.waitinglist.waitingListDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkInACustomerButton)));
        await app.waitinglist.checkInACustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.customerCheckInPopupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.closeIcon)));
        await app.waitinglist.closeIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.customerCheckInPopupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkInACustomerButton)));

        await app.waitinglist.checkInACustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.closeButton)));

        await app.waitinglist.closeButton.click();

    });

    // Customers -> Waiting List : Verify New Customers can be check in
    it('Verify New Customers can be check in', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListDropdown)));
        await app.waitinglist.waitingListDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkInACustomerButton)));
        await app.waitinglist.checkInACustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.customerCheckInPopupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.customerCheckInFromList)));
        await app.waitinglist.customerCheckInFromList.click();
    });

    // Customers -> Waiting List : Verify customers name can be select in search bar and checked in
    it('Verify customers name can be select in search bar and checked in', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListDropdown)));
        await app.waitinglist.waitingListDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkInACustomerButton)));
        await app.waitinglist.checkInACustomerButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.customerCheckInPopupTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.searchBarForCustomerChekIn)));
        await app.waitinglist.searchBarForCustomerChekIn.sendKeys('Old Man');
        browser.sleep(5000);
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.oldManRow)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.oldManCheckIn)));
        await app.waitinglist.oldManCheckIn.click();
    });

    // Customers -> Waiting List : Verify customer can be checked out
    it('Verify customer can be checked out', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListDropdown)));
        await app.waitinglist.waitingListDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.tableHeadForCheckedIn)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkoutCustomerFromRow)));
        await app.waitinglist.checkoutCustomerFromRow.click();
    });

    // Customers -> Waiting List : Verify clicking on start order leads to POS page
    it('Verify clicking on start order leads to POS page', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListDropdown)));
        await app.waitinglist.waitingListDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.tableHeadForCheckedIn)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.startOrderButton)));
        await app.waitinglist.startOrderButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct)));

    });

    // Customers -> Waiting List : Verify UI of checked out tab
    it('Verify UI of checked out tab', async () => {

        await app.customers.customerSidenav.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.customers.customerDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListDropdown)));
        await app.waitinglist.waitingListDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.waitingListTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkedOutTab)));
        await app.waitinglist.checkedOutTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.waitinglist.checkedOutTableHead)));
    });
});
