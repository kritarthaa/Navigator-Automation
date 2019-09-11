import { LoginPage } from '../Login/loginPage.po';
import { browser, ExpectedConditions } from 'protractor';
import { MarketingPage } from './marketing.po';
import { LoyaltyPage } from './loyalty.po';


export interface AutomationUser {
  email: string;
  username?: string;
  password: string;
}

export class MarketingsPage {
  public users: AutomationUser[] = [
    { email: 'nbsqa01', password: 'nbsqa01' },
  ];

  public login = new LoginPage();
  public marketing = new MarketingPage();
  public loyalty = new LoyaltyPage();

  public validLogin(usernameText, passwordText) {
    browser.wait(ExpectedConditions.visibilityOf(this.login.emailInput()), 10000);
    this.login.setEmailText(usernameText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.passwordInput()), 10000);
    this.login.setPasswordText(passwordText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.loginButton()), 10000);
    this.login.clickLoginBtn();
  }


}
