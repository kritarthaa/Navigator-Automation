import { AppPage } from '../app.po';
import { browser, logging, element, by, protractor, ExpectedConditions } from 'protractor';

describe('On Top nav bar', () => {
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

    // Top-nav -> Queue : Verify queue pop up open and close
    it('Verify queue pop up open and close', async () => {

    await app.topnav.queueLink.click();

    await browser.wait(ExpectedConditions.visibilityOf(app.topnav.CustomerListwholePopup));

    await browser.wait(ExpectedConditions.visibilityOf(app.topnav.closeIcon));

    await app.topnav.closeIcon.click();
  });

  // Top-nav -> Orders: Verify clicking on Orders icon leads to Sales-> orders page
    it('Verify clicking on Orders icon leads to Sales-> orders page ', async () => {

    await app.topnav.orderLink.click();
    await browser.wait(ExpectedConditions.visibilityOf(app.topnav.orderTableList));
    await browser.wait(ExpectedConditions.visibilityOf(app.topnav.tableList));

  });

  // Top-nav -> Home: Verify clicking on Home icon leads to home page
    it('Verify clicking on Orders icon leads to Sales-> orders page ', async () => {

    await app.topnav.homeIcon.click();
    await(browser.wait(ExpectedConditions.visibilityOf(app.dashboard.dashboardBtn())));


  });

  // Top-nav -> Cashier: Verify clicking on cashier icon open pop up
    it('Verify clicking on cashier icon open pop up', async () => {

      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.cashierCard));
      await app.topnav.cashierIcon.click();
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.textCenter));
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.startShiftButton));


     });

     // Top-nav -> Cashier: Verify pop up icon close when clicked close icon for cashier
    it('Verify pop up icon close when clicked close icon for cashier', async () => {

      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.cashierCard));
      await app.topnav.cashierIcon.click();
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.closeIconForCashier));
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.startShiftButton));
      await app.topnav.closeIconForCashier.click();


     });

     // Top-nav -> kebab menu: Verify clicking on kebab menu open kebab menu item
    it('Verify clicking on kebab menu open kebab menu item', async () => {

      await app.topnav.kebabMenu.click();
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.dropdownList));
    });

    // Top-nav -> kebab menu: Verify the contents of the kebab menu
    it('Verify the contents of the kebab menu', async () => {

      await app.topnav.kebabMenu.click();
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.dropdownList));
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.NewOrder));
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.RemoveCustomer));
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.ClearCart));

    });

    // Top-nav -> kebab menu -> New order: Verify the contents of the kebab menu
    it('Verify the contents of the kebab menu', async () => {

      await app.topnav.kebabMenu.click();
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.dropdownList));
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.NewOrder));
      await app.topnav.NewOrder.click();
      await browser.wait(ExpectedConditions.visibilityOf(app.pos.wholeProductList));
    });

    // Top-nav -> Search bar: Verify search bar works
    it('Verify search bar works', async () => {

      await app.topnav.searchBar.sendKeys('POS');
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.searchPOS));
      await app.topnav.searchPOS.click();
    });

    // Top-nav -> Search bar: Verify clicking on item after searching will leads to respective page
    it('Verify clicking on item after searching will leads to respective page', async () => {

      await app.topnav.searchBar.sendKeys('POS');
      await browser.wait(ExpectedConditions.visibilityOf(app.topnav.searchPOS));
      await app.topnav.searchPOS.click();
      await browser.wait(ExpectedConditions.visibilityOf(app.pos.addProduct));
      await browser.wait(ExpectedConditions.visibilityOf(app.pos.wholeProductList));
    });
});


