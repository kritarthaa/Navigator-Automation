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

    // Settings -> Terminal configuration : Verify clicking on specific location shows terminal list of that location
    it('Verify clicking on specific location shows terminal list of that location', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalListTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.allLocationDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.locationDropdown)));
        await app.terminalconf.locationDropdown.click();
        browser.sleep(5000);
    });
    // Settings -> Terminal configuration : Verify terminal can be edit and save
    it('Verify terminal can be edit and save', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalListTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.allLocation)));
        await app.terminalconf.allLocation.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.editTerminal)));
        await app.terminalconf.editTerminal.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.nameInputTerminal)));
        await app.terminalconf.nameInputTerminal.clear();
        await app.terminalconf.nameInputTerminal.sendKeys('testing terminal1');
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.saveButton)));
        await app.terminalconf.saveButton.click();
    });
    // Settings -> Terminal configuration : Verify the contents of terminal details
    it('Verify the contents of terminal details', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalListTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.allLocation)));
        await app.terminalconf.allLocation.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.viewIcon)));
        await app.terminalconf.viewIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.termianlName)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.dateCreated)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.openCashDrawerButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.closeIcon)));
        await app.terminalconf.closeIcon.click();

    });
    // Settings -> Terminal configuration: Verify terminals can be deleted
    it('Verify terminals can be deleted', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalListTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.allLocation)));
        await app.terminalconf.allLocation.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.deleteIcon)));
        await app.terminalconf.deleteIcon.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.deleteTerminalButton)));
        await app.terminalconf.deleteTerminalButton.click();
    });
    // Settings -> Terminal configuration: Verify new terminal can be created
    it('Verify new terminal can be created', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalConfLink)));
        await app.terminalconf.terminalConfLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.terminalListTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.createNewTerminal)));
        await app.terminalconf.createNewTerminal.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.nameInputForNewTerminal)));
        await app.terminalconf.nameInputForNewTerminal.sendKeys('Test');
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.warehouseSelect)));
        await app.terminalconf.warehouseSelect.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.PGdestruction1)));
        await app.terminalconf.PGdestruction1.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.terminalconf.createNewTerminalSubmitButton)));
        await app.terminalconf.createNewTerminalSubmitButton.click();
    });
});
