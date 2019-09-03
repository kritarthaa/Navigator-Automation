import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from 'q';

fdescribe('Settings Page', () => {
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
    // Settings -> Company Info : Verify the UI of CompanyInfo
    it('Verify the UI of CompanyInfo', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.companyInfoLink)));
        await app.companyInfo.companyInfoLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.companyInformationTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.posSettingsTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.stateInfoTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.quickBooksInfoTab)));

    });

    // Settings -> Company Info : Verify companyProfile can be updated
    it('Verify companyProfile can be updated', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.companyInfoLink)));
        await app.companyInfo.companyInfoLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.companyInformationTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.companyProfileTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.streetAdressInput)));
        await app.companyInfo.streetAdressInput.clear();
        await app.companyInfo.streetAdressInput.sendKeys('200 east 3rd av');
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.unitInput)));
        await app.companyInfo.unitInput.clear();
        await app.companyInfo.unitInput.sendKeys('Suite 101');
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.phoneInput)));
        await app.companyInfo.phoneInput.clear();
        await app.companyInfo.phoneInput.sendKeys('70261056777');
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.publicWebsiteInput)));
        await app.companyInfo.publicWebsiteInput.clear();
        await app.companyInfo.publicWebsiteInput.sendKeys('www.devtest.com');
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.saveCompanyDetailsButton)));
        await app.companyInfo.saveCompanyDetailsButton.click();
    });
    // Settings -> Company Info : Verify clicking on back to dashboard leads to dashboard page
    it('Verify clicking on back to dashboard leads to dashboard page', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.companyInfoLink)));
        await app.companyInfo.companyInfoLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.companyInformationTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.dashboardLink)));
        await app.companyInfo.dashboardLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardBtn())));
});
    // Settings -> Company Info : Verify state info can be update
    it('Verify state info can be update', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.companyInfoLink)));
        await app.companyInfo.companyInfoLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.stateInfoTab)));
        await app.companyInfo.stateInfoTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.usernameInput)));
        await app.companyInfo.usernameInput.clear();
        await app.companyInfo.usernameInput.sendKeys('c.towery@viridiansciences.com');
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.locationIdInput)));
        await app.companyInfo.locationIdInput.clear();
        await app.companyInfo.locationIdInput.sendKeys('98034');
        await (browser.wait(ExpectedConditions.visibilityOf(app.companyInfo.saveCompanyDetailsButton)));
        await app.companyInfo.saveCompanyDetailsButton.click();
    });
});
