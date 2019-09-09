import { LoginPage } from './Login/loginPage.po';
import { DashboardPage } from './Dashboard/dashboardPage.po';
import { Notification } from './notification.po';
import { LogoutPage } from './Logout/logout.po';
import { PosPage } from './POS/posPage.po';
import { TopNavPage } from './Top-nav/top.po';
import { browser, ExpectedConditions } from 'protractor';
import { CatalogPage } from './Catalog/catalog.po';
import { CustomersPage } from './Customers/customers.po';
import { InventoryPage } from './Inventory/inventory.po';
import { MarketingPage } from './Marketing/marketing.po';
import { ReportsPage } from './Reports/reports.po';
import { SalesPage } from './Sales/sales.po';
import { SettingsPage } from './Settings/settings.po';
import { VendorsPage } from './Vendors/vendors.po';
import { CustomerGroupPage } from './Customers/customergroup.po';
import { WaitingListPage } from './Customers/waitinglist.po';
import { LoyaltyPage } from './Marketing/loyalty.po';
import { UserPage } from './Settings/users.po';
import { TerminalConfigurationPage } from './Settings/terminalconf.po';
import { DisplayListPage } from './Settings/displaylist.po';
import { CompanyInfoPage } from './Settings/companyinfo.po';
import { SalesLimitPage } from './Settings/saleslimit.po';
import { PatientLabelPage } from './Settings/patientlabel.po';
import { PrinterSettingsPage } from './Settings/printerSettings.po';
import { TaxesPage } from './Settings/taxes.po';

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
  public catalog = new CatalogPage();
  public dashboard = new DashboardPage();
  public notification = new Notification();
  public logout = new LogoutPage();
  public customers = new CustomersPage();
  public inventory = new InventoryPage();
  public marketing = new MarketingPage();
  public reports = new ReportsPage();
  public sales = new SalesPage();
  public settings = new SettingsPage();
  public vendors = new VendorsPage();
  public topnav = new TopNavPage();
  public customergroup = new CustomerGroupPage();
  public waitinglist = new WaitingListPage();
  public loyalty = new LoyaltyPage();
  public userSetting = new UserPage();
  public terminalconf = new TerminalConfigurationPage();
  public displaylist = new DisplayListPage();
  public companyInfo = new CompanyInfoPage();
  public saleslimit = new SalesLimitPage();
  public patientlabel = new PatientLabelPage();
  public printerSettings = new PrinterSettingsPage();
  public taxes = new TaxesPage();

  public validLogin(usernameText, passwordText) {
    browser.wait(ExpectedConditions.visibilityOf(this.login.emailInput()), 10000);
    this.login.setEmailText(usernameText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.passwordInput()), 10000);
    this.login.setPasswordText(passwordText);
    browser.wait(ExpectedConditions.visibilityOf(this.login.loginButton()), 10000);
    this.login.clickLoginBtn();
  }


}
