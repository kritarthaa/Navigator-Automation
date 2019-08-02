import { browser, logging, element, by, protractor, ExpectedConditions } from 'protractor';
import { LoginPage } from './loginPage.po';
import { async } from 'q';


describe('After Login, Page', () => {
    let page: LoginPage;


    // beforeAll(() => {
    //     browser.waitForAngularEnabled(false);
    // });

    beforeEach(() => {
        page = new LoginPage();
        browser.get('/');
        // browser.ignoreSynchronization = true;

    });



    fit('should be able to logIn successfully', async () => {
        // browser.ignoreSynchronization = true;

        browser.waitForAngularEnabled(false);
        await browser.wait(ExpectedConditions.visibilityOf(page.username()));
        // await browser.wait(ExpectedConditions.elementToBeClickable(page.username()));
        await page.username().sendKeys('nbsqa01');
        await page.password().sendKeys('nbsqa01');
        await page.logIn().click();
        // browser.waitForAngularEnabled(true)

    });

    fit('should be able to view select location card', async () => {
        browser.waitForAngularEnabled(false);
        await expect(page.selectLocationCard().isDisplayed());
        await page.selectLocationBtn().click();
        browser.sleep(10000);

      });


});


afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    // browser.ignoreSynchronization = true;
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
