import { LoginPage } from './Login/loginPage.po';
import { DashboardPage } from './Dashboard/dashboardPage.po';
import { Notification } from './notification.po';
import { LogoutPage } from './Logout/logout.po';
import { PosPage } from './POS/posPage.po';
import { browser, ExpectedConditions } from 'protractor';

export interface AutomationUser {
  email: string;
  username?: string;
  password: string;
}

export class AppPage {
  public users: AutomationUser[] = [
    { email: 'nbsqa01', password: 'nbsqa01' },
  ];

  public login = new LoginPage();
  public pos = new PosPage();

  public dashboard = new DashboardPage();
  public notification = new Notification();
  public logout = new LogoutPage();

  public validLogin(usernameText, passwordText) {
    browser.wait(ExpectedConditions.visibilityOf(this.login.emailInput()), 10000);
    this.login.setEmailText(usernameText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.passwordInput()), 10000);
    this.login.setPasswordText(passwordText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.loginButton()), 10000);
    this.login.clickLoginBtn();
  }


}
