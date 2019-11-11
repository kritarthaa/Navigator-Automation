import { LoginPage } from '../Login/loginPage.po';
import { CloseOutTerminalPage } from './closeoutTerminal.po';
import { MetrcReportPage } from './metrcReport.po';
import { browser, ExpectedConditions } from 'protractor';
import { ReturnReportPage } from './returnReports.po';

export interface AutomationUser {
  email: string;
  username?: string;
  password: string;
}

export class ReportPage {
  public users: AutomationUser[] = [
    { email: 'nbsqa01', password: 'nbsqa01' },
  ];

  public login = new LoginPage(); 
  public closeout = new CloseOutTerminalPage();
  public metrcReport = new MetrcReportPage();
  public returnReport = new ReturnReportPage();

  public validLogin(usernameText, passwordText) {
    browser.wait(ExpectedConditions.visibilityOf(this.login.emailInput()), 10000);
    this.login.setEmailText(usernameText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.passwordInput()), 10000);
    this.login.setPasswordText(passwordText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.loginButton()), 10000);
    this.login.clickLoginBtn();
  }
}

