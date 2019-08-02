import { browser, logging, element, by, protractor, ExpectedConditions } from 'protractor';
import { DashboardPage } from './dashboardPage.po';
import { async } from 'q';


describe('After Login, Page', () => {
    let page: DashboardPage;

    beforeEach(() => {
        page = new DashboardPage();
        browser.get('/');
        // browser.ignoreSynchronization = true;

    });



    it('should be able to logIn successfully', async () => {
        // browser.ignoreSynchronization = true;

        await browser.wait(ExpectedConditions.urlContains('Dashboard'), 10000);

        await page.customerCard().isDisplayed();
        await page.salesCard().isDisplayed();
        await page.totalOrdersCard().isDisplayed();
        await page.terminalcard().isDisplayed();
        await page.vendorCard().isDisplayed();
        await page.todayStatCard().isDisplayed();

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
