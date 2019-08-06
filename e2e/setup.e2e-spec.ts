import { browser, ExpectedConditions } from 'protractor';
import { AppPage } from './app.po';

describe('Login Page', () => {
  let app: AppPage;

  beforeEach(async () => {
    app = new AppPage();
    await app.login.navigateTo();
    await browser.wait(ExpectedConditions.visibilityOf(app.login.emailInput()));
    await browser.wait(ExpectedConditions.visibilityOf(app.login.passwordInput()));
  });

   //Test for Verify login with invalid credentials
  it('should send error when user does not exist', async () => {
    await app.login.setEmailText('non-existent-email@email.com');
    await app.login.setPasswordText('random-password');
    await app.login.clickLoginBtn();
    await app.notification.waitForNotificationExistence();
    expect(await app.notification.getNotificationMessage()).toContain(app.notification.wrongPasswordMessage);
  });


  it('should show error when password is invalid', async () => {
    await browser.waitForAngularEnabled(false);
    await app.login.setEmailText(app.users[0].email)
    await app.login.setPasswordText('invalid-password');
    await app.login.clickLoginBtn();
    await app.notification.waitForNotificationExistence()
    expect(await app.notification.getNotificationMessage()).toContain(app.notification.wrongPasswordMessage);
  });

  //Test for Verify login with valid credentials

  it('should log the user in when the user exists', async () => {
    await browser.waitForAngularEnabled(false);
    await app.login.setEmailText(app.users[0].email);
    await app.login.setPasswordText(app.users[0].password);
    await app.login.clickLoginBtn();
  });
});
