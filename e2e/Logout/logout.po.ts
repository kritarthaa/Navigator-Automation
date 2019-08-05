import {browser, by, element, ElementFinder, ExpectedConditions, protractor} from 'protractor';

export class LogoutPage {
    // Elements

  public dropdownBelowUserName = () => element(by.css('//*[@id="main-body"]/div[2]/div[2]/div/div/div[2]'));
  public logoutBtn = () => element(by.xpath('//*[@id="logoutForm_topLeft"]/a'));

    // Actions

  public async hoverUserName(): Promise<any> {
    const dropdownBelowUserName = this.dropdownBelowUserName();
    await browser.wait(ExpectedConditions.visibilityOf(dropdownBelowUserName))
    await browser.wait(ExpectedConditions.elementToBeClickable(dropdownBelowUserName));
    await browser.actions().mouseMove(dropdownBelowUserName).perform();
  }
  public async clickLogoutBtn(): Promise<any> {
    const logoutBtn = this.logoutBtn();
    await browser.wait(ExpectedConditions.visibilityOf(logoutBtn));
    await browser.wait(ExpectedConditions.elementToBeClickable(logoutBtn));
    await logoutBtn.click();
  }

}
