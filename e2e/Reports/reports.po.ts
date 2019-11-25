import { LoginPage } from '../Login/loginPage.po';
import { CloseOutTerminalPage } from './closeoutTerminal.po';
import { MetrcReportPage } from './metrcReport.po';
import { browser, ExpectedConditions } from 'protractor';
import { ReturnReportPage } from './returnReports.po';
import { ExportDataPage } from './exportData.po';
import { InventoryOnHandPage } from './inventoryOnHand.po';
import { ReturnItemReportPage } from './returnItemReports.po';
import {  SalesReportPage } from './salesReport.po';
import {NewCustomers} from './newCustomers.po';
import { ZReport } from './zReport.po';

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
  public exportData = new ExportDataPage();
  public inventoryOnHand = new InventoryOnHandPage();
  public returnItemReport = new ReturnItemReportPage();
  public salesReport = new SalesReportPage();
  public newCustomers = new NewCustomers();
  public zReport = new ZReport();

  public validLogin(usernameText, passwordText) {
    browser.wait(ExpectedConditions.visibilityOf(this.login.emailInput()), 10000);
    this.login.setEmailText(usernameText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.passwordInput()), 10000);
    this.login.setPasswordText(passwordText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.loginButton()), 10000);
    this.login.clickLoginBtn();
  }
}

