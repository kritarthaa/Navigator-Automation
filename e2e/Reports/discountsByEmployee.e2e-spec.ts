import { AppPage } from '../app.po';
import { ReportPage } from './reports.po';
import { browser, ExpectedConditions } from 'protractor';

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
    // Reports -> Discounts By Employee : Verify the UI of Discounts By Employee
    it('Verify the UI of Discounts By Employee', async () => {

        await app.reports.discountsByEmployee.reportsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.discountsByEmployee.discountByEmployeeLink)));
        await app.reports.discountsByEmployee.discountByEmployeeLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.discountsByEmployee.discountByEmployeeTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.discountsByEmployee.discountByEmployeeTable)));

    });
});
