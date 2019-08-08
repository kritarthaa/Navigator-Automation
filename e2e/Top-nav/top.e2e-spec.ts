import { AppPage } from '../app.po';
import { browser, logging, element, by, protractor, ExpectedConditions } from 'protractor';

describe('On Top nav bar', () => {
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

    fit('Verify clicking on queue icon open pop up', async () => {

    await app.topnav.queueLink.click();
    // await browser.wait(ExpectedConditions.visibilityOf(app.topnav.getOptions()));
    browser.findElement(by.className('close'));
    expect(element(by.tagName('span')).getText()).toEqual(element(by.xpath('/html/body/div[2]/div/div/div[1]/button/span')));
    browser.sleep(5000);
  });
});


