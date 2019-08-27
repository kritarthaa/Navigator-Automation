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
}
