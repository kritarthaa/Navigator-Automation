import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

fdescribe('Dashboard Page', () => {
  let app = new AppPage();

  beforeEach(async () => {
    app = new AppPage();
    await app.login.navigateTo();
    await(browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000));
    await app.validLogin(app.users[0].email, app.users[0].password);
    await(browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationCard())));
    await(browser.wait(ExpectedConditions.visibilityOf(app.notification.selectLocationBtn())));
    await app.notification.selectLocationBtn().click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.notification.closeBtn())));
    await app.notification.closeBtn().click();

  });

  it('Only navigates', async () => {
    await browser.waitForAngularEnabled(false);
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardBtn())));
    await app.dashboard.dashboardBtn().click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardHeader), 10000));
  });

  it('Verify contents of dashboard page', async () => {

    await browser.waitForAngularEnabled(false);
    await app.dashboard.dashboardBtn().click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardHeader), 10000));
    await app.dashboard.customerCard.isPresent();
    await app.dashboard.salesCard.isPresent();
    await app.dashboard.totalOrdersCard.isPresent();
    await app.dashboard.terminalCard.isPresent();
    await app.dashboard.vendorCard.isPresent();
    await app.dashboard.todayStatCard.isPresent();


  });

  it('Verify contents of todays stats', async () => {

    await browser.waitForAngularEnabled(false);
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardBtn())));
    await app.dashboard.dashboardBtn().click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardHeader), 10000));
    await app.dashboard.salesEarningTab.isDisplayed();
    await app.dashboard.bestSellerTab.isDisplayed();

  });


});
