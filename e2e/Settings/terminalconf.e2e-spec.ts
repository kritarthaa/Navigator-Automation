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
    // Settings -> Terminal configuration : Verify the UI of terminal
    it('Verify the UI of terminal', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalListTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalSettingsTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.createNewTerminal)));

    });
    // Settings -> Terminal configuration : Verify the UI of terminal settings
    it('Verify the UI of terminal settings', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalSettingsTab)));
        await app.terminalconf.terminalSettingsTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalApiKeyInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.backToDashboardLink)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.saveTerminalSettingsButton)));

    });
    // Settings -> Terminal configuration : Save the new terminal api key from the terminal settings tab
    it('Save the new terminal api key from the terminal settings tab', async () => {


        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalSettingsTab)));
        await app.terminalconf.terminalSettingsTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalApiKeyInput)));
        await app.terminalconf.terminalApiKeyInput.clear();
        await app.terminalconf.terminalApiKeyInput.sendKeys('12345');
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.saveTerminalSettingsButton)));
        await app.terminalconf.saveTerminalSettingsButton.click();
    });
    // Settings -> Terminal configuration : Verify clicking on back to dashboard page leads to dashboard page
    it('Verify clicking on back to dashboard page leads to dashboard page', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalSettingsTab)));
        await app.terminalconf.terminalSettingsTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalApiKeyInput)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.backToDashboardLink)));
        await app.terminalconf.backToDashboardLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardBtn())));
    });
});
