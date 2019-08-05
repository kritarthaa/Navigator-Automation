import { browser, by, element, ElementFinder, ExpectedConditions } from "protractor"

export class Notification {
  public wrongPasswordMessage: string = "The password is invalid or the user does not have a password."
  public noUserMessage: string = "There is no user record corresponding to this identifier. The user may have been deleted."

  // Elements

  public get notificationElement(): ElementFinder {
    return element(by.css(".alert"))
  }

  public async waitForNotificationExistence(): Promise<void> {
    await browser.wait(ExpectedConditions.visibilityOf(this.notificationElement))
  }

  public async getNotificationMessage(): Promise<any> {
    return this.notificationElement.getText()
  }
}
