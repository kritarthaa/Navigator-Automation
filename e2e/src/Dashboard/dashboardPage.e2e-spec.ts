import { browser, logging, element, by, protractor, ExpectedConditions } from 'protractor';
import { DashboardPage } from './dashboardPage.po';
import { async } from 'q';


describe('After Login, Page', () => {
    let page: DashboardPage;

    beforeEach(() => {
        page = new DashboardPage();
        browser.get('/');


    });



    it('should be able to logIn successfully', async () => {
        // browser.ignoreSynchronization = true;


        await page.dashboardBtn().click();
        await browser.wait(ExpectedConditions.urlContains('Dashboard'), 10000);

        await page.customerCard().isPresent();
        await page.salesCard().isPresent();
        await page.totalOrdersCard().isPresent();
        await page.terminalCard().isPresent();
        await page.vendorCard().isPresent();
        await page.todayStatCard().isPresent();

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
