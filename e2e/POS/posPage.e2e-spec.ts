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

    // it('Verify Customer should be selected to purchase product', async () => {

    //     await app.pos.PosSpan.click();
    //     await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
    //     await app.pos.addCustomer.click();
    //     // await browser.wait(ExpectedConditions.visibilityOf(app.pos.linkOrderget));
    //     console.log(app.pos.linkOrderget);
    //     // await app.pos.linkOrderget().click();
    //     browser.sleep(500000);


    // });

    it('Verify POS page top bar item is clickable and show its specific information', async () => {
        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await app.pos.all.click();
        await app.pos.favourite.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.favouriteContent));
        await app.pos.cannabis.click();
        await app.pos.regular.click();
        await app.pos.locationIcon.click();

     });

    // need working
    it('Verify user wont be able to pay until customer is added', async () => {

        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await app.pos.payButtonCart;
    });

    // need workig

    it('Verify to add product on cart', async () => {

        await app.pos.PosSpan.click();
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
        await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProducts));
        await app.pos.addProducts;
        browser.sleep(5000);

        await browser.wait(ExpectedConditions.visibilityOf(app.pos.itemTitle));
        browser.sleep(5000);
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
