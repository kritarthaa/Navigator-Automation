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
}
