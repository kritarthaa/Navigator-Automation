import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from '@angular/core/testing';

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

    // Settings -> Users: Visit Users page
    it('Visit Users page', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.userDropdown)));
        await app.userSetting.userDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.usersPageTitle)));
    });

    // Settings -> Users: Verify search bar works for Users
    it('Verify search bar works for Users', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.userDropdown)));
        await app.userSetting.userDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.usersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.searchBar)));
        await app.userSetting.searchBar.sendKeys('devtest');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.userName)));
    });

    // Settings -> Users: Validate Export Data button
    it('Validate Export Data button', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.userDropdown)));
        await app.userSetting.userDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.usersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.exportDataButton)));
        await app.userSetting.exportDataButton.click();
    });

    // Settings -> Users: Validate show options works
    it('Validate show options works', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.userDropdown)));
        await app.userSetting.userDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.usersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.showOption)));
        await app.userSetting.showOption.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.showTwentyFiveOption)));
        await app.userSetting.showTwentyFiveOption.click();
    });
});
