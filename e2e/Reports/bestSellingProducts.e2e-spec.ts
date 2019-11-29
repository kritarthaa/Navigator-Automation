import { browser, ExpectedConditions } from 'protractor';
import { AppPage } from '../app.po';


describe('Report Page ', () => {
    const app = new AppPage();

    beforeEach(async () => {
        await app.login.navigateTo();
        await (browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000));
        await app.validLogin(app.users[0].email, app.users[0].password);
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationCard())));
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationBtn())));
        await app.notification.selectLocationBtn().click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.notification.closeBtn())));
        await app.notification.closeBtn().click();

    });

    it('Verify the UI of Best Selling Products', async () => {
        await app.reports.bestSellingProduct.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsLink)));
        await app.reports.bestSellingProduct.bestSellingProductsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.startTime)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.endTime)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.runWithNewData)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.exportDataToCSV)));

    });

    it('Verify the functionality of Best Selling Products Page', async () => {
        await app.reports.bestSellingProduct.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsLink)));
        await app.reports.bestSellingProduct.bestSellingProductsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.startTime)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.endTime)));
        await app.reports.bestSellingProduct.startTime.clear();
        await app.reports.bestSellingProduct.startTime.sendKeys('10/14/2019');
        await app.reports.bestSellingProduct.runWithNewData.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.cannabisProductTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.nonCannabisProductTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.tableItems)));
    });

    it('Verify the functionality Export Data TO CSV', async () => {
        await app.reports.bestSellingProduct.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsLink)));
        await app.reports.bestSellingProduct.bestSellingProductsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.startTime)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.endTime)));
        await app.reports.bestSellingProduct.startTime.clear();
        await app.reports.bestSellingProduct.startTime.sendKeys('10/14/2019');
        await app.reports.bestSellingProduct.runWithNewData.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.cannabisProductTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.nonCannabisProductTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.tableItems)));
        await app.reports.bestSellingProduct.exportDataToCSV.click();
    });

    it('Verify the functionality Non-Cannabis Product Tab', async () => {
        await app.reports.bestSellingProduct.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsLink)));
        await app.reports.bestSellingProduct.bestSellingProductsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.startTime)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.endTime)));
        await app.reports.bestSellingProduct.startTime.clear();
        await app.reports.bestSellingProduct.startTime.sendKeys('10/14/2019');
        await app.reports.bestSellingProduct.runWithNewData.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.cannabisProductTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.nonCannabisProductTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.tableItems)));
        await app.reports.bestSellingProduct.nonCannabisProductTab.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.nonCannabisProductTabGraph)));
    });

    it('Verify Product Details page is displayed while clicking from product name column', async () => {
        await app.reports.bestSellingProduct.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsLink)));
        await app.reports.bestSellingProduct.bestSellingProductsLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.bestSellingProductsTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.startTime)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.endTime)));
        await app.reports.bestSellingProduct.startTime.clear();
        await app.reports.bestSellingProduct.startTime.sendKeys('10/14/2019');
        await app.reports.bestSellingProduct.runWithNewData.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.cannabisProductTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.nonCannabisProductTab)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.tableItems)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.productNameLink), 5000));
        await app.reports.bestSellingProduct.productNameLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.bestSellingProduct.productDetailsPage)));
    });
});
