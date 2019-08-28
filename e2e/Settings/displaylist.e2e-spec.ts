import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Settings Page', () => {
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
    // Settings -> Display Lists: Verify the UI of display lists
    it('Verify the UI of display lists', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displaylistsLink)));
        await app.displaylist.displaylistsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displayTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.tableHead)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.createNewDisplayButton)));

    });
});
