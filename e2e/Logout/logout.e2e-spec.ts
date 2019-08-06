
import { browser, ExpectedConditions } from 'protractor'
import { AppPage } from '../app.po'

describe('Logout Page', () => {
  let app: AppPage;

  beforeEach(async () => {
    app = new AppPage();
    await app.login.navigateTo();
    await(browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()), 10000))
  });

  it('should be able to login and should be logged out ', async () => {
    await app.login.setEmailText(app.users[0].email);
    await app.login.setPasswordText(app.users[0].password);
    await app.login.clickLoginBtn();
    await(browser.wait(ExpectedConditions.visibilityOf(app.logout.dropdownBelowUserName()), 10000));
    await app.logout.hoverUserName();
    await app.logout.clickLogoutBtn();
    await(browser.wait(ExpectedConditions.urlContains(app.login.loginUrlPath), 10000));
  })
})
