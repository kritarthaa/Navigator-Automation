import { by, element, ElementFinder } from 'protractor';

export class CatalogPage {
    // Elements

    public get catalogBtn(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[3]/a'));
    }

    public availableCannabis(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[3]/ul/li[2]/a'));
    }

    public allCannabisProduct(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[3]/ul/li[3]/a'));
    }

    public regularProducts(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[2]/div[2]/ul/li[3]/ul/li[5]/a'));
    }

    public get inventoryHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div[2]/div/div[1]/h5'));
    }

    public get codeLink(): ElementFinder {
        return element(by.xpath('//*[@id="iframeCode"]'));
    }
    public get codeCopy(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div[2]/div/div[2]/div/div[1]/div/div/div[2]/a[1]'));
    }
    public get codePreview(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div[2]/div/div[2]/div/div[1]/div/div/div[2]/a[2]'));
    }

    public get availableProductTitle(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[1]/strong'));
    }

    public get cannabisInfoCard(): ElementFinder {
        return element(by.xpath('//*[@id="angular_app_products"]'));
    }

    public get productLinkBtn(): ElementFinder {
        return element(by.xpath('//*[@id="angular_app_products"]/div[3]/div/div/div[2]/h6/a'));
    }
    public get purchaseHistoryHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div/div/div/div[1]/div/div[1]/h5'));
    }
    public get productInformationHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div/div/div/div[2]/div[1]/div[1]/div[3]/strong'));
    }
    public get attachedFilesHeader(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div/div/div/div[2]/div[2]/div[1]/h6'));
    }
    public get viewLinkedFileBtn(): ElementFinder {
        return element(by.xpath('//*[@id="OpenFileListModal"]'));
    }
    public get searchBox(): ElementFinder {
        return element(by.xpath('//*[@id="dt_ActiveProducts_filter"]/label/input'));
    }
    public get locationDropdown(): ElementFinder {
        return element(by.xpath('//*[@id="storelocations"]'));
    }
    public get exportData(): ElementFinder {
        return element(by.xpath('//*[@id="form_cannbisproduct_export"]/input'));
    }
    public get newProduct(): ElementFinder {
        return element(by.xpath('//*[@id="main-body"]/div[3]/div[2]/div/div[2]/div[1]/div/div[1]/ul/li[3]/button'));
    }
    public get table(): ElementFinder {
        return element(by.xpath('//*[@id="dt_ActiveProducts"]'));
    }
    public get addNewProductForm(): ElementFinder {
        return element(by.xpath('//*[@id="add-product-form"]'));
    }
    public get closeAddNewProduct(): ElementFinder {
        return element(by.xpath('//*[@id="add-product-form"]/div[1]/a'));
    }


    public get deleteProductBtn(): ElementFinder {
        return element(by.xpath('//*[@id="2737"]/td[8]/div/button'));
    }
    public get editProductBtn(): ElementFinder {
        return element(by.xpath('//*[@id="btnEdit"]'));
    }

}