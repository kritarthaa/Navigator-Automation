import { browser, logging, element, by, protractor, ExpectedConditions } from 'protractor';
import { AppPage } from '../app.po';
import { async } from 'q';

describe('After Clicking POS', () => {
    let app = new AppPage();


    beforeEach(async () => {
        app = new AppPage();
        await app.login.navigateTo();
        await(browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000));
        await app.validLogin(app.users[0].email, app.users[0].password);
        await(browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationCard())));
        await(browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationBtn())));
        await app.notification.selectLocationBtn().click();
        await(browser.wait(ExpectedConditions.visibilityOf(app.notification.closeBtn())));
        await app.notification.closeBtn().click();

    });
    it('should able to click POS on sidenav', async () => {

        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));

        await app.pos.addProduct.isPresent();
        await app.pos.topNav.isPresent();
        await app.pos.searchBar.isPresent();
        await app.pos.discount.isPresent();
        await app.pos.cannabisTax.isPresent();
        await app.pos.tax.isPresent();
        await app.pos.orderDetails.isPresent();
        await app.pos.payButton.isPresent();
        await app.pos.removeButton.isPresent();
    });

    it('verify pop up close when click (X) icon', async () => {

        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await app.pos.addCustomer.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.customerTitle));
        await app.pos.closeIcon.click();

    });

    // POS-> Add Customer-> Link To Order: Verify Customer should be selected to purchase product

    it('Verify Customer should be selected to purchase product', async () => {

        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await app.pos.addCustomer.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.CustomerList));
        await app.pos.linkToOrderFirst.click();


    });

    it('Verify POS page top bar item is clickable and show its specific information', async () => {
        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await app.pos.allTab.click();
        await app.pos.favouriteTab.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.favouriteContent));
        await app.pos.cannabisTab.click();
        await app.pos.regularTab.click();
        await app.pos.locationIcon.click();

     });

    // POs-> Product list -> Canabis Product:Verify notification appears for adding cannabis product without assigning customer

    it('Verify notification appears for adding cannabis product without assigning customer', async () => {

        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.wholeProductList));
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.singleProduct));
        await app.pos.plusIconFirst.click();
    });

    // POS -> Discount: Verify pop up open when click discount
    it('Verify pop up open when click discount', async () => {

        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.wholeProductList), 1000);
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.discountButton));
        await app.pos.discountButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.discountPopupTitle));
    });

    // POS -> Discount: Verify discount pop up close when clicked cancel
    it('Verify discount pop up close', async () => {

        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.wholeProductList), 80000);
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.discountButton));
        await app.pos.discountButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.discountPopupTitle));
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.discountPopupClose), 80000);
        await app.pos.discountPopupClose.click();
    });
});


afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    browser.ignoreSynchronization = true;
    const logs = await browser
        .manage()
        .logs()
        .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
        jasmine.objectContaining({
            level: logging.Level.SEVERE
        })
    );
});
