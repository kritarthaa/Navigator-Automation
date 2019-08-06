import { LoginPage } from './Login/loginPage.po';
import { DashboardPage } from './Dashboard/dashboardPage.po';
import { Notification } from './notification.po';
import { LogoutPage } from './Logout/logout.po';
import { PosPage } from './POS/posPage.po';

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

}
