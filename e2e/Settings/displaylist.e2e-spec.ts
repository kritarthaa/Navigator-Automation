import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from 'q';

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
    // Settings -> Display Lists : Verify clicking on edit icon leads to custom display settings
    it('Verify clicking on edit icon leads to custom display settings', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displaylistsLink)));
        await app.displaylist.displaylistsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displayTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displaySettingLink)));
        await app.displaylist.displaySettingLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.nameOfDisplayInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.saveCustomDisplayButton)));
    });

    // Settings -> Display Lists : Verify display name can be edit and save
    it('Verify display name can be edit and save', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displaylistsLink)));
        await app.displaylist.displaylistsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displayTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displaySettingLink)));
        await app.displaylist.displaySettingLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.nameOfDisplayInput)));
        await app.displaylist.nameOfDisplayInput.clear();
        await app.displaylist.nameOfDisplayInput.sendKeys('test1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.saveCustomDisplayButton)));
        await app.displaylist.saveCustomDisplayButton.click();
    });
    // Settings -> Display Lists : Verify new display can be created
    it('Verify new display can be created', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displaylistsLink)));
        await app.displaylist.displaylistsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displayTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.createNewDisplayButton)));
        await app.displaylist.createNewDisplayButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.nameOfDisplayInput)));
        await app.displaylist.nameOfDisplayInput.clear();
        await app.displaylist.nameOfDisplayInput.sendKeys('test2');
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.saveCustomDisplayButton)));
        await app.displaylist.saveCustomDisplayButton.click();
    });
    // Settings -> Display Lists : Verify available product page open when clicked run display button
    it('Verify available product page open when clicked run display button', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displaylistsLink)));
        await app.displaylist.displaylistsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.displayTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.displaylist.runDisplayLink)));
        await app.displaylist.runDisplayLink.click();
    });
});

