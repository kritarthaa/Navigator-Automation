import { AppPage } from '../app.po';
import { browser, ExpectedConditions } from 'protractor';
import { async } from 'q';

describe('Dashboard Page', () => {
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
// only navigates
  it('Only navigates', async () => {
    await browser.waitForAngularEnabled(false);
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardBtn())));
    await app.dashboard.dashboardBtn().click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardHeader), 10000));
  });

  // Verify contents of the dashboard page

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
  // Verify contents from 'today's Stats wizard

  it('Verify contents of todays stats', async () => {

    await browser.waitForAngularEnabled(false);
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardBtn())));
    await app.dashboard.dashboardBtn().click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardHeader), 10000));
    await app.dashboard.salesEarningTab.isDisplayed();
    await app.dashboard.bestSellerTab.isDisplayed();

  });

  // Verify contents from Today's Stats tabs
  // Verify contents from Today's Stats > Sales & Earnings Today
  // Verify contents from Today's Stats > Best Seller


  it('Verify contents of tabs', async () => {

    await browser.waitForAngularEnabled(false);
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardBtn())));
    await app.dashboard.dashboardBtn().click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.salesEarningTab), 10000));
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.salesToday), 10000));
    await app.dashboard.bestSellerTab.click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.bestSeller), 10000));

  });

  // Verify contents from '10 Most Recent Orders' table
  // Click '10 Most Recent Orders' table -> 'View All' link

  it('Verify Most recent orders', async () => {
    await browser.waitForAngularEnabled(false);
    await app.dashboard.dashboardBtn().click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.mostRecentOrdersHeader), 10000));
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.viewOrderBtn), 10000));
    await app.dashboard.viewOrderBtn.click();
    await(browser.wait(ExpectedConditions.urlContains('Order/Details')));


  });





});
