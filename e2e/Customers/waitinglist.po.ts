import { by, element, ElementFinder } from 'protractor';

export class WaitingListPage {

    // dropdown
    public get waitingListDropdown(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[6]/ul/li[3]/a'));
    }
    // UI of waiting list
    public get waitingListTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
      }
      public get checkedInTab(): ElementFinder {
          return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div[1]/ul/li[1]/a'));
      }
      public get checkedOutTab(): ElementFinder {
          return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div[1]/ul/li[2]'));
      }
      public get checkInACustomerButton(): ElementFinder {
          return element(by.xpath("//a[contains(text(),'Check In A Customer')]"));
      }
      public get tableHeadForCheckedIn(): ElementFinder {
          return element(by.xpath("//div[@id='tab_checked_in']//thead//tr"));
      }
      public get checkoutCustomerFromRow(): ElementFinder {
          return element(by.xpath('//*[@id="tab_checked_in"]/div/table/tbody/tr[1]/td[4]/a[2]'));
      }

      // check in a customer
      public get customerCheckInPopupTitle(): ElementFinder {
          // tslint:disable-next-line:max-line-length
          return element(by.xpath("//div[contains(@class,'modal CustomerModal fade ng-scope ng-isolate-scope in')]//h6[contains(@class,'modal-title')][contains(text(),'Customer Check In')]"));
      }
      public get customerCheckInFromList(): ElementFinder {
                    // tslint:disable-next-line:max-line-length
          return element(by.xpath("//div[contains(@class,'modal CustomerModal fade ng-scope ng-isolate-scope in')]//div[contains(@class,'modal-body ng-scope')]//div[2]//div[3]//a[1]"));
      }
      public get searchBarForCustomerChekIn(): ElementFinder {
                    // tslint:disable-next-line:max-line-length
          return element(by.xpath("//div[@class='modal CustomerModal fade ng-scope ng-isolate-scope in']//input[@placeholder='Search customers...']"));
      }
      public get closeIcon(): ElementFinder {
                    // tslint:disable-next-line:max-line-length
          return element(by.xpath("//div[@class='modal CustomerModal fade ng-scope ng-isolate-scope in']//span[contains(text(),'×')]"));
      }
      public get closeButton(): ElementFinder {
                    // tslint:disable-next-line:max-line-length
          return element(by.xpath("//div[@class='modal CustomerModal fade ng-scope ng-isolate-scope in']//button[@class='btn btn-white float-right'][contains(text(),'Close')]"));
      }
      public get oldManCheckIn(): ElementFinder {
                    // tslint:disable-next-line:max-line-length
        return element(by.xpath("//div[contains(@class,'user-w with-statusX status-green hasHover px-3 row ng-scope')]//div//a[contains(@class,'a-gray2')][contains(text(),'Check In')]"));
      }
      public get oldManRow(): ElementFinder {
          return element(by.xpath("//div[@class='user-title ng-binding']"));
      }

      // Start order

      public get startOrderButton(): ElementFinder {
          return element(by.xpath('//*[@id="tab_checked_in"]/div/table/tbody/tr[1]/td[4]/a[1]'));
      }

      // Checked out
      public get checkedOutTableHead(): ElementFinder {
          return element(by.xpath("//div[@id='tab_checked_out']//thead//tr"));
      }

    }
