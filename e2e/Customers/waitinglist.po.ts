import { by, element, ElementFinder } from 'protractor';

export class WaitingListPage {

    public get waitingListTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
      }
    }
