import { AppPage } from '../app.po';
import { browser, ExpectedConditions, Browser } from 'protractor';

describe('Report Page', () => {
    let app = new AppPage();

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

    // Verify the UI contents of Z-Report link
    it('Verify the UI of Z-Report', async () => {
        await app.reports.zReport.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.zReportLink)));
        await app.reports.zReport.zReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.zReportTitle)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.locationDropdown)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.dataTimePicker)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.loadTerminaSalesData)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.exportZReportData)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.searchBar)));
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.showDropdown)));
    });

    // Verify the functionality of Load Terminal Sales Data
    it('Verify the Load Terminal Sales Data button', async () => {
        await app.reports.zReport.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.zReportLink)));
        await app.reports.zReport.zReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.zReportTitle)));
        await app.reports.zReport.dataTimePicker.clear();
        await app.reports.zReport.dataTimePicker.sendKeys('11/11/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.loadTerminaSalesData)));
        await app.reports.zReport.loadTerminaSalesData.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.firtRowtable), 10000));
    })

    // Verify the functionality of Export Z-Report Data
    it('Verify the Export Z-Report Data button ', async () => {
        await app.reports.zReport.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.zReportLink)));
        await app.reports.zReport.zReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.zReportTitle)));
        await app.reports.zReport.dataTimePicker.clear();
        await app.reports.zReport.dataTimePicker.sendKeys('11/11/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.loadTerminaSalesData)));
        await app.reports.zReport.loadTerminaSalesData.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.firtRowtable), 10000));
        await app.reports.zReport.exportZReportData.click();

    });

    it('Verfy the functionality of search field', async () => {
        await app.reports.zReport.ReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.zReportLink)));
        await app.reports.zReport.zReportLink.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.zReportTitle)));
        await app.reports.zReport.dataTimePicker.clear();
        await app.reports.zReport.dataTimePicker.sendKeys('11/11/2019');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.loadTerminaSalesData)));
        await app.reports.zReport.loadTerminaSalesData.click();
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.firtRowtable), 10000));
        app.reports.zReport.searchBar.sendKeys('Rajkumar');
        await (browser.wait(ExpectedConditions.visibilityOf(app.reports.zReport.firtRowtable), 10000));

    });

});