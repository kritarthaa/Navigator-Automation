import { AppPage } from '../app.po';
import { browser, element, ElementFinder, ExpectedConditions } from 'protractor';
import { async } from 'q';
import { ExpressionStatement } from '@angular/compiler';

describe('Reports Page', () => {
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

    it('Verify the UI of Inventory On Hand Link', async () => {
        await app.reports.inventoryOnHand.reportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.inventoryOnHand.inventoryOnHandLink)));
        await app.reports.inventoryOnHand.inventoryOnHandLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.inventoryOnHand.inventoryOnHandTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.inventoryOnHand.exportDataToCSV)));

    });

    it('Verify the functionlaity of Export Data to CSV', async () => {
        await app.reports.inventoryOnHand.reportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.inventoryOnHand.inventoryOnHandLink)));
        await app.reports.inventoryOnHand.inventoryOnHandLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.inventoryOnHand.inventoryOnHandTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.inventoryOnHand.exportDataToCSV)));
        await app.reports.inventoryOnHand.exportDataToCSV.click();

    });

});