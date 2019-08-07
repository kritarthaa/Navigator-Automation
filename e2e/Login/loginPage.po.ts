import {browser, by, element, ElementFinder, ExpectedConditions} from 'protractor';

export class LoginPage {
  public loginUrlPath = '/Account/Login';
  public emailInput = () => element(by.xpath('//*[@id="UserName"]'));
  public passwordInput = () => element(by.xpath('//*[@id="Password"]'));
  public loginButton = () => element(by.xpath('/html/body/div[1]/div/div/div/form/div[2]/div[3]/button'));

  public async navigateTo(): Promise<any> {
    return browser.get(`#/${this.loginUrlPath}`);
  }

  // public async getEmailText(): Promise<any> {
  //   return this.emailInput().getText();
  // }

  public async setEmailText(text: string): Promise<any> {
    const emailInput = this.emailInput();
    await emailInput.clear();
    await emailInput.sendKeys(text);
  }

  // public async getPasswordText(): Promise<any> {
  //   return this.passwordInput().getText();
  // }

  public async setPasswordText(text: string): Promise<any> {
    const passwordInput = this.passwordInput();
    await passwordInput.clear();
    await passwordInput.sendKeys(text);
  }

  public async clickLoginBtn(): Promise<any> {
    await this.loginButton().click();
  }

}
