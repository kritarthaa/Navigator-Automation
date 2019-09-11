import { by, element, ElementFinder } from 'protractor';

export class PatientLabelPage {

public get patientLabelLink(): ElementFinder {
    return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[10]/ul/li[6]/a'));
}
public get patientLabelTitle(): ElementFinder {
    return element(by.xpath("//h5[@class='element-header']"));
}
public get saveSettingsButton(): ElementFinder {
    return element(by.xpath('//*[@id="labelOptions"]/div[19]/div/div[2]/button'));
}
public get stateIdLabel(): ElementFinder {
    return element(by.xpath('//*[@id="labelOptions"]/div[4]/label'));
}
public get patientIdLabel(): ElementFinder {
    return element(by.xpath('//*[@id="labelOptions"]/div[5]/label'));
}
}

