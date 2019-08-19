import { by, element, ElementFinder } from 'protractor';

export class VendorsPage {

    public get vendorsBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[8]/a'));
    }

    public get vendorsDropdownList(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[8]/ul'));
    }

    public get cannabisVendorBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[8]/ul/li[1]/a'));
    }

    public get myVendorBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[8]/ul/li[2]/a'));
    }

    // Cannabis Vendor

    public get cannabisVendorHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/h5'));
    }

    public get newVendorBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/div[1]/button'));
    }
    public get cannabisVendorTable(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/table'));
    }

    public get updateVendorBtn(): ElementFinder {
        return element(by.xpath('//*[@id="679"]/td[5]/a[1]'));
    }

    public get deleteVendorBtn(): ElementFinder {
        return element(by.xpath('//*[@id="679"]/td[5]/a[2]'));
    }

    public get vendorForm(): ElementFinder {
        return element(by.xpath('//*[@id="add-vendor-form"]'));
    }
    public get vendorFormNext(): ElementFinder {
        return element(by.xpath('//*[@id="slick-slide41"]/button'));
    }
    public get vendorFormNext2(): ElementFinder {
        return element(by.xpath('//*[@id="slick-slide42"]/button'));
    }
    public get vendorForm1(): ElementFinder {
        return element(by.xpath('//*[@id="add-vendor-form"]/div/div[2]/div/div/div/div[1]'));
    }
    public get vendorForm2(): ElementFinder {
        return element(by.xpath('//*[@id="add-vendor-form"]/div/div[2]/div/div/div/div[2]'));
    }
    public get vendorForm3(): ElementFinder {
        return element(by.xpath('//*[@id="add-vendor-form"]/div/div[2]/div/div/div/div[3]'));
    }

    public get deleteVendorPopup(): ElementFinder {
        return element(by.xpath('//*[@id="removeEntryModal"]/div/div'));
    }

    public get vendorProfileBtn(): ElementFinder {
        return element(by.xpath('//*[@id="679"]/td[1]'));
    }

    public get vendorProfile(): ElementFinder {
        return element(by.xpath('//*[@id="vendorInfo"]/div/div'));
    }

    // My Vendor

    public get vendorHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/h5'));
    }
    public get vendorTable(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div[1]/table'));
    }

}