import { browser, logging, element, by, protractor, ExpectedConditions } from 'protractor';
import { AppPage } from '../app.po';
import { async } from 'q';

describe('After Clicking POS', () => {
    let app = new AppPage();

//
//
    beforeEach(async () => {
        app = new AppPage();
        await app.login.navigateTo();
        await (browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000));
        await app.login.login();
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
    it('should open pop up when clicked', async () => {

        await app.pos.addCustomer.click();
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
