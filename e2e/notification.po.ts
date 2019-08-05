import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor'

export class Notification {
  public wrongPasswordMessage = 'Invalid username or password.';

  // Elements

  public get notificationElement(): ElementFinder {
    return element(by.xpath('/html/body/div[1]/div/div/div/form/div[1]'));
  }

  public async waitForNotificationExistence(): Promise<void> {
    await browser.wait(ExpectedConditions.visibilityOf(this.notificationElement));
  }

  public async getNotificationMessage(): Promise<any> {
    return this.notificationElement.getText();
  }
}
