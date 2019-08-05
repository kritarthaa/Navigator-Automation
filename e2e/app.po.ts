import { LoginPage } from '././src/Login/loginPage.po';
import { DashboardPage } from '././src/Dashboard/dashboardPage.po';
import { Notification } from './notification.po';


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
  public dashboard = new DashboardPage();
  public notification = new Notification();

}
