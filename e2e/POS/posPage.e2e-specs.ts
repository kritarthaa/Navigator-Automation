import { browser, logging, element, by, protractor, ExpectedConditions } from 'protractor';
import { PosPage } from './posPage.po';
import { async } from 'q';

describe('After Clicking POS', () => {
    let page: PosPage;

    beforeEach(() => {
        page = new PosPage();
        browser.get('/');
    });

    fit('should able to click POS on sidenav', async () => {

        await page.PosSpan().click();
        await browser.wait(ExpectedConditions.visibilityOf(page.addProduct()));

        await page.addProduct().isPresent();
        await page.topNav().isPresent();
        await page.searchBar().isPresent();
        await page.discount().isPresent();
        await page.cannabisTax().isPresent();
        await page.tax().isPresent();
        await page.orderDetails().isPresent();
        await page.payButton().isPresent();
        await page.removeButton().isPresent();
    });

    // it('pop up opens when clicked add customer', async () => {

    //     await page.addCustomer().click();
    //     await page.popupCustomer().isPresent();
    // })
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
