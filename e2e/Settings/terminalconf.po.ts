import { by, element, ElementFinder } from 'protractor';

export class TerminalConfigurationPage {

    public get terminalConfLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/ul/li[3]/a'));
    }
    public get terminalListTab(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/form/div/div/div[1]/ul/li[2]/a'));
    }
    public get terminalSettingsTab(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/form/div/div/div[1]/ul/li[1]/a'));
    }
    public get createNewTerminal(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/div/a'));
    }

    // terminalsettingtab
    public get terminalApiKeyInput(): ElementFinder {
        return element(by.xpath("//input[@id='apiKey']"));
    }
    public get backToDashboardLink(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/form/div/div/div[2]/div[3]/div/div/a'));
    }
    public get saveTerminalSettingsButton(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div/form/div/div/div[2]/div[3]/div/div/button'));
    }
    public get allLocationDropdown(): ElementFinder {
        return element(by.xpath("//div[@class='d-inline-flex mr-2']"));
    }
    public get locationDropdown(): ElementFinder {
        return element(by.xpath('//*[@id="storelocations"]/option[3]'));
    }
    public get allLocation(): ElementFinder {
        return element(by.xpath('//*[@id="storelocations"]/option[1]'));
    }
    public get editTerminal(): ElementFinder {
        return element(by.xpath('//*[@id="datatable-Terminal"]/tbody/tr[1]/td[6]/div/a[1]'));
    }
    public get nameInputTerminal(): ElementFinder {
        return element(by.xpath("//input[@id='Name']"));
    }
    public get saveButton(): ElementFinder {
        return element(by.xpath('//*[@id="EditTerminalModal_74"]/div/div/form/div[2]/input'));
    }

    // View
    public get viewIcon(): ElementFinder {
        return element(by.xpath('//*[@id="datatable-Terminal"]/tbody/tr[1]/td[6]/div/a[2]'));
    }
    public get termianlName(): ElementFinder {
        return element(by.xpath('//*[@id="ViewTerminalDetailModal_74"]/div/div/form/div[1]/div/div[1]/table/tbody/tr[2]/td[1]/strong'));
    }
    public get dateCreated(): ElementFinder {
        return element(by.xpath('//*[@id="ViewTerminalDetailModal_74"]/div/div/form/div[1]/div/div[1]/table/tbody/tr[3]/td[1]/strong'));
    }
    public get openCashDrawerButton(): ElementFinder {
        return element(by.xpath('//*[@id="ViewTerminalDetailModal_74"]/div/div/form/div[1]/div/div[2]/div/input[1]'));
    }
    public get closeIcon(): ElementFinder {
        return element(by.xpath('//*[@id="ViewTerminalDetailModal_74"]/div/div/div/button'));
    }

    // delete
    public get deleteIcon(): ElementFinder {
        return element(by.xpath('//*[@id="datatable-Terminal"]/tbody/tr[1]/td[6]/div/a[3]'));
    }
    public get deleteTerminalButton(): ElementFinder {
        return element(by.xpath('//*[@id="delete-terminal-form"]/div[2]/input'));
    }

    // New terminal
    public get nameInputForNewTerminal(): ElementFinder {
        return element(by.xpath("//input[@id='Name']"));
    }

    public get warehouseSelect(): ElementFinder {
        return element(by.xpath('//*[@id="add-terminal-form"]/div[2]/div/div/div/div[3]/select'));
    }
    public get PGdestruction1(): ElementFinder {
        return element(by.xpath('//*[@id="add-terminal-form"]/div[2]/div/div/div/div[3]/select/option[4]'));
    }
    public get createNewTerminalSubmitButton(): ElementFinder {
        return element(by.xpath('//*[@id="add-terminal-form"]/div[3]/button[2]'));
    }
}
