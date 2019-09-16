import { by, element, ElementFinder } from 'protractor';

export class DisplayListPage {

 public get displaylistsLink(): ElementFinder {
     return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/ul/li[4]/a'));
 }

 public get createNewDisplayButton(): ElementFinder {
     return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/div/a'));
 }
 public get displayTitle(): ElementFinder {
     return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/h5'));
 }
 public get tableHead(): ElementFinder {
     return element(by.xpath("//table[@class='table table-cozy dataTable']//thead//tr"));
 }

 // display setting

 public get displaySettingLink(): ElementFinder {
     return element(by.xpath('//*[@id="displayList"]/tr/td[5]/a[1]'));
 }
 public get nameOfDisplayInput(): ElementFinder {
     return element(by.xpath('//*[@id="DisplayName"]'));
 }
 public get saveCustomDisplayButton(): ElementFinder {
     return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/form/div/div[3]/div/div[6]/button'));
 }

 public get runDisplayLink(): ElementFinder {
     return element(by.xpath('//*[@id="displayList"]/tr[1]/td[5]/a[2]'));
 }
 public get runDisplayTextCenter(): ElementFinder {
     return element(by.xpath("//h1[@class='text-center']"));
 }
}
