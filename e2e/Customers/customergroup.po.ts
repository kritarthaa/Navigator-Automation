import { by, element, ElementFinder } from 'protractor';

export class CustomerGroupPage {

    // Customer UI

    public get customerGroupLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[6]/ul/li[2]/a'));
    }

    public get customerGroupTitle(): ElementFinder {
        return element(by.xpath("//h5[@class='element-header']"));
      }

    public get defineNewCustomerGroupButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[1]/a'));
    }
    public get tableHead(): ElementFinder {
       return element(by.xpath("//table[@class='customer-list-table table table-cozyX table-hover table-lightborder dataTable element-box']//thead//tr"));
    }
    public get editIcon(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[3]/div/a[1]'));
    }
    public get deleteIcon(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td[3]/div/a[2]'));
    }
    public get customerGroupList(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div/div[2]/div/table/tbody'));
    }


    // Define New Customer Group
    public get defineNewCustomerGroupTitle(): ElementFinder {
        return element(by.xpath('//*[@id="CreateCustomerGroupModal"]/div/div/div[1]/h4'));
    }
    public get customerGroupNameInput(): ElementFinder {
        return element(by.xpath("//input[@placeholder='Enter customer group name']"));
    }
    public get descriptionText(): ElementFinder {
        return element(by.xpath("//textarea[@name='Description']"));
    }
    public get cancelButton(): ElementFinder {
        return element(by.xpath('//*[@id="CreateCustomerGroupModal"]/div/div/div[3]/button[1]'));
    }
    public get createButton(): ElementFinder {
        return element(by.xpath('//*[@id="CreateCustomerGroupModal"]/div/div/div[3]/button[2]'));
    }

    // Edit icon

    public get updateButton(): ElementFinder {
        return element(by.xpath('/html/body/div[1]/div/div/div[3]/button[2]'));
    }

    // Delete icon
    public get cancelButtonForDelete(): ElementFinder {
        return element(by.xpath('/html/body/div[12]/div/div/div[2]/button[1]'));
    }
    public get okButton(): ElementFinder {
        return element(by.xpath('/html/body/div[12]/div/div/div[2]/button[2]'));
    }

}
