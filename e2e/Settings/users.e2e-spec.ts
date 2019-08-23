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

    // Settings -> Users : Validate New user button
    it('Validate New user button', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.userDropdown)));
        await app.userSetting.userDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.usersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.newUserButton)));
        await app.userSetting.newUserButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.firstNameInput)));
        await app.userSetting.firstNameInput.sendKeys('kumar');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.lastNameInput)));
        await app.userSetting.lastNameInput.sendKeys('test1');
    });

    // Settings -> Users: Validate new user pop up open and close
    it('Validate new user pop up open and close', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.userDropdown)));
        await app.userSetting.userDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.usersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.newUserButton)));
        await app.userSetting.newUserButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.firstNameInput)));
        await app.userSetting.firstNameInput.sendKeys('kumar');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.lastNameInput)));
        await app.userSetting.lastNameInput.sendKeys('test1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.closeIcon)));
        await app.userSetting.closeIcon.click();
    });


        // Settings -> Users: Validate new user can be added successfully
    it('Validate new user can be added successfully', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.userDropdown)));
        await app.userSetting.userDropdown.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.usersPageTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.newUserButton)));
        await app.userSetting.newUserButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.firstNameInput)));
        await app.userSetting.firstNameInput.sendKeys('kumar');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.lastNameInput)));
        await app.userSetting.lastNameInput.sendKeys('test1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.continueButton)));
        await app.userSetting.continueButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.phoneNumberInput)));
        await app.userSetting.phoneNumberInput.sendKeys('98194267');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.streetAdressInput)));
        await app.userSetting.streetAdressInput.sendKeys('Manglapur');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.cityInput)));
        await app.userSetting.cityInput.sendKeys('Butwal');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.zipInput)));
        await app.userSetting.zipInput.sendKeys('22306');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.nextButton)));
        await app.userSetting.nextButton.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.emailInput)));
        await app.userSetting.emailInput.sendKeys('kpun1@gmail.com');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.newUserName)));
        await app.userSetting.newUserName.sendKeys('kpun03');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.newUserPassword)));
        await app.userSetting.newUserPassword.sendKeys('1234567890');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.confirmPassword)));
        await app.userSetting.confirmPassword.sendKeys('1234567890');
        await (browser.wait(ExpectedConditions.visibilityOf(app.userSetting.submitButton)));
        await app.userSetting.submitButton.click();
    });
});
