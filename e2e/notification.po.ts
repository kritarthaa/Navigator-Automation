import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor'
import { rendererTypeName } from '@angular/compiler';

export class Notification {
  public wrongPasswordMessage = 'Invalid username or password.';

  // Elements

  public get notificationElement(): ElementFinder {
    return element(by.xpath('/html/body/div[1]/div/div/div/form/div[1]'));
  }

  public selectLocationCard(): ElementFinder {
    return element(by.xpath('/html/body/div[1]/div/div'));
  }

  public selectLocationBtn(): ElementFinder {
    return element(by.xpath('/html/body/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/a'));
  }

  public closeBtn(): ElementFinder {
    return element(by.xpath('//*[@id="terminal"]/div/div/div[1]/button'));
  }

  public get deleteProductCard(): ElementFinder {
    return element(by.xpath('//*[@id="removeProductModal"]/div/div'));
  }

  public get removeProduct(): ElementFinder {
    return element(by.xpath('//*[@id="removeProductModal"]/div/div/div[3]/button[2]'));
  }
  public get importInventoryPopup(): ElementFinder {
    return element(by.xpath('//*[@id="customerInfo"]/div/div'));
  }

  public get deletePopup(): ElementFinder {
    return element(by.xpath('/html/body/div[12]/div/div'));
  }

  // Actions

  public async waitForNotificationExistence(): Promise<void> {
    await browser.wait(ExpectedConditions.visibilityOf(this.notificationElement));
  }

  public async getNotificationMessage(): Promise<any> {
    return this.notificationElement.getText();
  }

}
