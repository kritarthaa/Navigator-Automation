import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Dashboard Page', () => {
  let app = new AppPage();

  beforeEach(async () => {
    app = new AppPage();
    await app.login.navigateTo();
    await(browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000));
  });

  it('Only navigates', async () => {
    // Navigate to login page
    await browser.waitForAngularEnabled(false);
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardHeader), 10000));
    // await app.login.setEmailText(app.users[0].email);
    // await app.login.setPasswordText(app.users[0].password);
    // await app.login.login();
  });

  it('Verify contents of dashboard page', async () => {

    await browser.waitForAngularEnabled(false);

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
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardHeader), 10000));
    await app.dashboard.salesEarningTab.isDisplayed();
    await app.dashboard.bestSellerTab.isDisplayed();

  });


});
