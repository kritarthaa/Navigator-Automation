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
    // Settings -> patient label : Verify UI of patient label page
    it('Verify UI of patient label page', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientLabelLink)));
        await app.patientlabel.patientLabelLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientLabelTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.saveSettingsButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.stateIdLabel)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientIdLabel)));

    });
    // Settings -> patient label : Verify patient label reflect the labels checked and unchecked
    it('Verify patient label reflect the labels checked and unchecked', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientLabelLink)));
        await app.patientlabel.patientLabelLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientLabelTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.saveSettingsButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.stateIdLabel)));
        await app.patientlabel.stateIdLabel.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientIdLabel)));
        await app.patientlabel.patientIdLabel.click();
    });

    // Settings -> patient label : Verify new label settings can be saved
    it('Verify new label settings can be saved', async () => {

        await app.userSetting.sideNavSettings.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientLabelLink)));
        await app.patientlabel.patientLabelLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientLabelTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.saveSettingsButton)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.stateIdLabel)));
        await app.patientlabel.stateIdLabel.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.patientIdLabel)));
        await app.patientlabel.patientIdLabel.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.patientlabel.saveSettingsButton)));
        await app.patientlabel.saveSettingsButton.click();
        });
    });
