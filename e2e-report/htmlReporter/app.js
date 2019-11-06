var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var convertTimestamp = function (timestamp) {
    var d = new Date(timestamp),
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),
        dd = ('0' + d.getDate()).slice(-2),
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh === 0) {
        h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

    return time;
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    } else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    } else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};

//</editor-fold>

app.controller('ScreenshotReportController', ['$scope', '$http', 'TitleService', function ($scope, $http, titleService) {
    var that = this;
    var clientDefaults = {};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    this.warningTime = 1400;
    this.dangerTime = 1900;
    this.totalDurationFormat = clientDefaults.totalDurationFormat;
    this.showTotalDurationIn = clientDefaults.showTotalDurationIn;

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
        if (initialColumnSettings.warningTime) {
            this.warningTime = initialColumnSettings.warningTime;
        }
        if (initialColumnSettings.dangerTime) {
            this.dangerTime = initialColumnSettings.dangerTime;
        }
    }


    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };
    this.hasNextScreenshot = function (index) {
        var old = index;
        return old !== this.getNextScreenshotIdx(index);
    };

    this.hasPreviousScreenshot = function (index) {
        var old = index;
        return old !== this.getPreviousScreenshotIdx(index);
    };
    this.getNextScreenshotIdx = function (index) {
        var next = index;
        var hit = false;
        while (next + 2 < this.results.length) {
            next++;
            if (this.results[next].screenShotFile && !this.results[next].pending) {
                hit = true;
                break;
            }
        }
        return hit ? next : index;
    };

    this.getPreviousScreenshotIdx = function (index) {
        var prev = index;
        var hit = false;
        while (prev > 0) {
            prev--;
            if (this.results[prev].screenShotFile && !this.results[prev].pending) {
                hit = true;
                break;
            }
        }
        return hit ? prev : index;
    };

    this.convertTimestamp = convertTimestamp;


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };

    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.totalDuration = function () {
        var sum = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.duration) {
                sum += result.duration;
            }
        }
        return sum;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };


    var results = [
    {
        "description": "should send error when user does not exist|Login Page",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1571225229967,
        "duration": 10429
    },
    {
        "description": "should show error when password is invalid|Login Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00cd0042-00eb-0079-0021-003100370028.png",
        "timestamp": 1571225240447,
        "duration": 0
    },
    {
        "description": "should log the user in when the user exists|Login Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003f00f7-002b-0081-0073-00fb007b00c8.png",
        "timestamp": 1571225240470,
        "duration": 0
    },
    {
        "description": "Navigates to catalog and click|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d30007-0067-002e-0068-009200630007.png",
        "timestamp": 1571225240500,
        "duration": 0
    },
    {
        "description": "Verify contents of available cannabis page|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00100035-00bb-003e-0016-0048006a00d7.png",
        "timestamp": 1571225240540,
        "duration": 0
    },
    {
        "description": "Verify contents of Cannabis product details|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c50052-00ee-00e2-00dd-00d2004f0078.png",
        "timestamp": 1571225240576,
        "duration": 0
    },
    {
        "description": "Verify contents of All cannabis product|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007500c3-0028-00fa-0058-00d30072007d.png",
        "timestamp": 1571225240607,
        "duration": 0
    },
    {
        "description": "Verify contents of All cannabis product export data|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005200bc-008b-00b0-0069-004800a30092.png",
        "timestamp": 1571225240635,
        "duration": 0
    },
    {
        "description": "Verify contents of All cannabis product add new product|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a500fd-0071-0085-005f-008100c40095.png",
        "timestamp": 1571225240657,
        "duration": 0
    },
    {
        "description": "Verify contents of Regular product and product edit button|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000e00a0-0005-00d4-000b-0090002d00d3.png",
        "timestamp": 1571225240688,
        "duration": 0
    },
    {
        "description": "Verify contents of Regular product and delete product button|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a800ea-0000-0035-00fa-00fa000400a1.png",
        "timestamp": 1571225240718,
        "duration": 0
    },
    {
        "description": "Verify UI of Customergroup page|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002100a8-006a-00ad-000d-00b9007f0020.png",
        "timestamp": 1571225240740,
        "duration": 0
    },
    {
        "description": "Verify the UI of define new customer group|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00790075-00ee-008a-009b-003b00a00074.png",
        "timestamp": 1571225240761,
        "duration": 0
    },
    {
        "description": "Verify user can enter customer group name and description in the define new customer group pop up|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002b00b3-0005-0037-002d-008f009300d0.png",
        "timestamp": 1571225240784,
        "duration": 0
    },
    {
        "description": "Verify new customer group name can be created|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000700ec-00cd-007b-00f1-00e300fd00e8.png",
        "timestamp": 1571225240807,
        "duration": 0
    },
    {
        "description": "Verify clicking Cancel button close pop up of define new customer group|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a20050-00b6-00b9-00e0-00f500a10028.png",
        "timestamp": 1571225240828,
        "duration": 0
    },
    {
        "description": "Verify pop up open when click edit icon|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00560024-0063-009a-0029-006b00d500c1.png",
        "timestamp": 1571225240853,
        "duration": 0
    },
    {
        "description": "Verify customer group name and description can be edited and submit|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004e00de-0008-00b4-00f1-009f00030093.png",
        "timestamp": 1571225240877,
        "duration": 0
    },
    {
        "description": "Verify clicking cancel close the pop up from delete icon|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002000f9-0055-00dd-002c-00e6000b0049.png",
        "timestamp": 1571225240904,
        "duration": 0
    },
    {
        "description": "Verify clicking OK button delete the customer group|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00bb0094-0038-005e-0016-00d20079001a.png",
        "timestamp": 1571225240931,
        "duration": 0
    },
    {
        "description": "Verify dropdown appears when click customer from side-nav|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00370079-00dc-00c0-0010-00f7009e0075.png",
        "timestamp": 1571225240965,
        "duration": 0
    },
    {
        "description": "Verify UI of customers page|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d000dd-00d0-001d-0098-00140033000d.png",
        "timestamp": 1571225240993,
        "duration": 0
    },
    {
        "description": "Verify the Export data|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b0003f-008d-002f-00b2-00be003900e1.png",
        "timestamp": 1571225241020,
        "duration": 0
    },
    {
        "description": "Verify the contents of import customers|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0054004a-0090-003d-00f3-00f4008000aa.png",
        "timestamp": 1571225241046,
        "duration": 0
    },
    {
        "description": "Verify the download CSV template|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005c0057-0056-0044-0045-008b004e0080.png",
        "timestamp": 1571225241073,
        "duration": 0
    },
    {
        "description": "Verify the contents of import customer guide|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d5004d-00d5-0068-002b-0058005c00e5.png",
        "timestamp": 1571225241090,
        "duration": 0
    },
    {
        "description": "Verify cancel button for new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fc00c6-00ba-0002-0057-00f2006f00f0.png",
        "timestamp": 1571225241113,
        "duration": 1
    },
    {
        "description": "Verify the search for customers|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00cb00ef-001e-002d-0039-000900b3009b.png",
        "timestamp": 1571225241132,
        "duration": 0
    },
    {
        "description": "Verify Customers are displayed as per required no of rows in show dropdown|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f300da-0050-0064-00d1-0027009e0088.png",
        "timestamp": 1571225241152,
        "duration": 0
    },
    {
        "description": "Verify the components of delete of customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00060070-00a7-00c1-00ca-0084006200b5.png",
        "timestamp": 1571225241174,
        "duration": 0
    },
    {
        "description": "Verify the cancel for delete of customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003b00ac-0099-0026-00ea-000d00a80083.png",
        "timestamp": 1571225241195,
        "duration": 0
    },
    {
        "description": "Verify user can delete existing customer from customers table|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00890076-004f-0060-006b-0083004500af.png",
        "timestamp": 1571225241206,
        "duration": 0
    },
    {
        "description": "Verify the first pop up components of new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b800aa-00ea-00df-005c-006700a700d9.png",
        "timestamp": 1571225241221,
        "duration": 0
    },
    {
        "description": "Verify the second pop up components of new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c00012-000d-00e0-0046-008300c700ea.png",
        "timestamp": 1571225241254,
        "duration": 0
    },
    {
        "description": "Verify the third pop up components of new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00bf00ed-006d-007c-0040-0054005300a9.png",
        "timestamp": 1571225241280,
        "duration": 0
    },
    {
        "description": "Verify the fourth pop up components of new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008100cc-00e2-0044-0062-005100b30060.png",
        "timestamp": 1571225241304,
        "duration": 0
    },
    {
        "description": "Verify UI of waiting list page|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fc0083-0090-0040-009c-00b8008d005f.png",
        "timestamp": 1571225241338,
        "duration": 0
    },
    {
        "description": "Verify UI of check in a customer button|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c800a9-00de-00a9-00c2-00550006008d.png",
        "timestamp": 1571225241366,
        "duration": 0
    },
    {
        "description": "Verify check in a customer pop up close when clicked on close icon as well as close button|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000900bb-0045-0092-009e-001c00bb00e6.png",
        "timestamp": 1571225241392,
        "duration": 0
    },
    {
        "description": "Verify New Customers can be check in|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00500098-00f8-0025-0013-00b600970045.png",
        "timestamp": 1571225241415,
        "duration": 0
    },
    {
        "description": "Verify customers name can be select in search bar and checked in|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00700020-0055-0015-00ea-002400a30067.png",
        "timestamp": 1571225241438,
        "duration": 0
    },
    {
        "description": "Verify customer can be checked out|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009e0054-005b-00dc-00a4-009c00ce0066.png",
        "timestamp": 1571225241467,
        "duration": 0
    },
    {
        "description": "Verify clicking on start order leads to POS page|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d50057-0099-00ab-009a-003400a20070.png",
        "timestamp": 1571225241489,
        "duration": 0
    },
    {
        "description": "Verify UI of checked out tab|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002b0031-00f0-009a-00ee-00be00a90055.png",
        "timestamp": 1571225241512,
        "duration": 0
    },
    {
        "description": "Only navigates|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006600ff-003e-0033-0020-0012006a00aa.png",
        "timestamp": 1571225241531,
        "duration": 0
    },
    {
        "description": "Verify contents of dashboard page|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008b00f6-00bf-001f-008c-006f00f400bd.png",
        "timestamp": 1571225241549,
        "duration": 0
    },
    {
        "description": "Verify contents of todays stats|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0067008f-00a8-002b-00a7-00c600e500ab.png",
        "timestamp": 1571225241567,
        "duration": 0
    },
    {
        "description": "Verify contents of tabs|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c80001-009a-00b5-0058-00200085001e.png",
        "timestamp": 1571225241593,
        "duration": 0
    },
    {
        "description": "Verify Most recent orders|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008a009e-0033-00f5-00d1-007300110062.png",
        "timestamp": 1571225241607,
        "duration": 0
    },
    {
        "description": "On clicking inventory dropdown|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006d00b7-00a3-0075-0067-006700910034.png",
        "timestamp": 1571225241632,
        "duration": 0
    },
    {
        "description": "Verify contents of Inventory Page|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000e0005-0020-0030-00d0-004300d200b7.png",
        "timestamp": 1571225241647,
        "duration": 0
    },
    {
        "description": "Verify import sheet button|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004500de-00b4-009d-0097-003200fd0027.png",
        "timestamp": 1571225241670,
        "duration": 0
    },
    {
        "description": "Verify download csv button|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004c00c1-00c3-009a-0015-00540075009f.png",
        "timestamp": 1571225241693,
        "duration": 0
    },
    {
        "description": "verify add add new inventory items|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a80094-00a0-0068-00c8-0051003f006c.png",
        "timestamp": 1571225241715,
        "duration": 0
    },
    {
        "description": "Verify update inventory|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d1002c-0040-00fa-00a4-00db00c80016.png",
        "timestamp": 1571225241737,
        "duration": 0
    },
    {
        "description": "Verify delete inventory item|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00730030-0062-003b-00ba-0074004f0040.png",
        "timestamp": 1571225241760,
        "duration": 0
    },
    {
        "description": "Verify location page|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c800e0-00c6-00e8-00f7-00fb0006003c.png",
        "timestamp": 1571225241775,
        "duration": 0
    },
    {
        "description": "Verify delete location|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004100cb-0046-0081-0093-000a004c009d.png",
        "timestamp": 1571225241796,
        "duration": 0
    },
    {
        "description": "Verify edit location |Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00740014-0017-009d-0020-00e800fe00ae.png",
        "timestamp": 1571225241819,
        "duration": 0
    },
    {
        "description": "Verify Warehouse page |Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00af0033-00f7-0098-0005-00ba00bf000e.png",
        "timestamp": 1571225241841,
        "duration": 1
    },
    {
        "description": "should be able to login and should be logged out |Logout Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a00092-00c0-0092-0081-0093008e00c5.png",
        "timestamp": 1571225241863,
        "duration": 0
    },
    {
        "description": "Verify the UI of loyalty page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00130080-0088-000f-009d-006600d00053.png",
        "timestamp": 1571225241880,
        "duration": 0
    },
    {
        "description": "Verify toggle options works for earn points conversion rate|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b90021-002b-0005-005b-006a007400e1.png",
        "timestamp": 1571225241905,
        "duration": 0
    },
    {
        "description": "Verify toggle options works for redemption conversion rate|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003f0061-000c-0016-0073-003600b700bf.png",
        "timestamp": 1571225241928,
        "duration": 0
    },
    {
        "description": "Verify toggle options works for maximum points discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006d008c-0030-0037-0098-006100b50057.png",
        "timestamp": 1571225241943,
        "duration": 0
    },
    {
        "description": "Verify the UI of Discounts page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ff00a6-001b-00d8-00df-003700330040.png",
        "timestamp": 1571225241966,
        "duration": 0
    },
    {
        "description": "Verify search bar works for respective discount code|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0030009a-00b3-005c-00a6-00a200b20003.png",
        "timestamp": 1571225241983,
        "duration": 0
    },
    {
        "description": "Verify clicking on InActive leads to inactive list for General discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008a00f9-0025-00db-007c-00ff006c00bc.png",
        "timestamp": 1571225242006,
        "duration": 0
    },
    {
        "description": "Verify the UI of Volume Discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c0000c-0025-00ad-00c8-00be002a00ee.png",
        "timestamp": 1571225242032,
        "duration": 1
    },
    {
        "description": "Verify clicking on InActive leads to inactive list for Volume Discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0042003d-00e0-00cf-004c-00f4002f006d.png",
        "timestamp": 1571225242056,
        "duration": 0
    },
    {
        "description": "Verify clicking on Create new volume discount leads to create discount by volume page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000400d1-00e1-0068-0070-00b200ee00c4.png",
        "timestamp": 1571225242070,
        "duration": 0
    },
    {
        "description": "Verify clicking on Create a new discount leads to create discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007d0069-0049-00c2-0058-001900a20031.png",
        "timestamp": 1571225242093,
        "duration": 0
    },
    {
        "description": "Verify new discount can be created from create a new discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00330056-00cb-00f3-00a2-00ac00620078.png",
        "timestamp": 1571225242118,
        "duration": 0
    },
    {
        "description": "Verify pop up open when click view button for specific row|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009300aa-00f9-006f-0039-00fb00560085.png",
        "timestamp": 1571225242146,
        "duration": 0
    },
    {
        "description": "Verify View pop can be close using close icon and close button|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005f00bc-007b-00de-0064-00f20024005c.png",
        "timestamp": 1571225242169,
        "duration": 0
    },
    {
        "description": "Verify new volume discount can be created from create a new volume discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00140008-009f-0087-0027-004e008600ce.png",
        "timestamp": 1571225242192,
        "duration": 0
    },
    {
        "description": "Verify click on edit for pop up view of general discount leads to Edit discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a9006f-00bf-00d2-00a6-00d000910027.png",
        "timestamp": 1571225242216,
        "duration": 1
    },
    {
        "description": "Verify click on delete for pop up view of general discount deletes the discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0070008a-00ec-002c-00b7-0028008e0033.png",
        "timestamp": 1571225242236,
        "duration": 0
    },
    {
        "description": "Verify paginater works for discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00210034-00fc-003c-007c-0096000b0027.png",
        "timestamp": 1571225242261,
        "duration": 0
    },
    {
        "description": "should able to click POS on sidenav|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00dd0001-0018-00bd-00a6-002c00640043.png",
        "timestamp": 1571225242287,
        "duration": 0
    },
    {
        "description": "verify pop up close when click (X) icon|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00eb0095-00f0-00e4-0074-00e5004400d0.png",
        "timestamp": 1571225242311,
        "duration": 0
    },
    {
        "description": "Verify Customer should be selected to purchase product|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00120004-00f1-00d7-0009-00b900c700e1.png",
        "timestamp": 1571225242333,
        "duration": 1
    },
    {
        "description": "Verify POS page top bar item is clickable and show its specific information|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009e00f1-00c0-00bf-00e8-004a009f0074.png",
        "timestamp": 1571225242360,
        "duration": 0
    },
    {
        "description": "Verify notification appears for adding cannabis product without assigning customer|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004600a5-005d-007f-003d-0021005a00b8.png",
        "timestamp": 1571225242385,
        "duration": 0
    },
    {
        "description": "Verify pop up open when click discount|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000b0018-00c9-0007-0084-009f003a00e3.png",
        "timestamp": 1571225242408,
        "duration": 1
    },
    {
        "description": "Verify discount pop up close|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002800b8-00ff-00a1-0014-00b500e400b4.png",
        "timestamp": 1571225242432,
        "duration": 0
    },
    {
        "description": "Verify the UI of close out terminal|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a30024-00f1-0073-005c-001e00d000a5.png",
        "timestamp": 1571225242466,
        "duration": 0
    },
    {
        "description": "Verify date can be selected and it loads the respective reports|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007d006d-0068-00ac-00dc-006a002500a7.png",
        "timestamp": 1571225242493,
        "duration": 0
    },
    {
        "description": "Verify reports can be export in CSV format|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00840058-0030-0088-00c1-00d70090006b.png",
        "timestamp": 1571225242512,
        "duration": 0
    },
    {
        "description": "Verify reports can be viewed base on location|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c900d2-00aa-00bd-001c-009300d00044.png",
        "timestamp": 1571225242520,
        "duration": 0
    },
    {
        "description": "Verify respective terminal report can be view when clicked view icon|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00960046-000c-004e-008a-005900d800fa.png",
        "timestamp": 1571225242527,
        "duration": 0
    },
    {
        "description": "Verify the UI of metrc report|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002e00c8-00de-00dd-00da-001b001400fd.png",
        "timestamp": 1571225242533,
        "duration": 0
    },
    {
        "description": "Verify reports can be run with new date|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0021000f-0047-0001-0073-00ee0059003c.png",
        "timestamp": 1571225242540,
        "duration": 0
    },
    {
        "description": "Verify new reports can be generated from export report|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e500c6-006d-00d0-0014-00d5001f0000.png",
        "timestamp": 1571225242566,
        "duration": 0
    },
    {
        "description": "Verify contents of Sales|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e0007e-00ad-000a-00ab-004700630015.png",
        "timestamp": 1571225242575,
        "duration": 0
    },
    {
        "description": "Verify contents of Sales|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0085008b-00b6-0096-00db-00f0005500fb.png",
        "timestamp": 1571225242585,
        "duration": 0
    },
    {
        "description": "Verify contents of Sales|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004600dc-00d5-00c2-00be-00d900a90056.png",
        "timestamp": 1571225242594,
        "duration": 0
    },
    {
        "description": "Verify export data btn|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004d00ef-002a-003e-00d5-00bc0012008e.png",
        "timestamp": 1571225242603,
        "duration": 0
    },
    {
        "description": "Verify New order btn close operation|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b70034-005b-001f-00b0-00b3003200d1.png",
        "timestamp": 1571225242613,
        "duration": 0
    },
    {
        "description": "Verify New order btn continue operation|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00870065-0046-005e-00f6-002200080099.png",
        "timestamp": 1571225242622,
        "duration": 0
    },
    {
        "description": "Verify contents of Return page|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d00013-0006-00d0-0046-00a400e400cf.png",
        "timestamp": 1571225242631,
        "duration": 0
    },
    {
        "description": "Verify contents of Return page|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c600e0-0046-00a0-0080-000c00700026.png",
        "timestamp": 1571225242640,
        "duration": 0
    },
    {
        "description": "Verify New order btn close operation|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c7003c-00cb-001a-00e9-004b00ce0046.png",
        "timestamp": 1571225242649,
        "duration": 0
    },
    {
        "description": "Verify New order btn continue operation|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00710063-007d-0054-0065-00d200f90010.png",
        "timestamp": 1571225242657,
        "duration": 0
    },
    {
        "description": "Verify contents of General Return page|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00bf0080-000e-005f-004f-008200870057.png",
        "timestamp": 1571225242663,
        "duration": 0
    },
    {
        "description": "Verify the UI of CompanyInfo|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004b0073-00b6-00ba-009e-005d00cc00fe.png",
        "timestamp": 1571225242670,
        "duration": 0
    },
    {
        "description": "Verify companyProfile can be updated|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e600e1-002f-003b-0056-0090000d009b.png",
        "timestamp": 1571225242678,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard leads to dashboard page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00470086-005c-0017-000f-00150089005e.png",
        "timestamp": 1571225242685,
        "duration": 0
    },
    {
        "description": "Verify state info can be update|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b60080-00e6-00e3-00ed-0078006e0048.png",
        "timestamp": 1571225242692,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard page from state Info tab|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d30053-00f9-00ff-00ac-0027006b0065.png",
        "timestamp": 1571225242699,
        "duration": 0
    },
    {
        "description": "Verify POS Settings can be updated|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f500c3-00e2-002a-0042-00bb008d00f5.png",
        "timestamp": 1571225242706,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard leads to dashboard page from POS settings|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00de00d7-0069-00ba-0008-005c00ae00c2.png",
        "timestamp": 1571225242712,
        "duration": 0
    },
    {
        "description": "Verify quick books info can be update|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002300fa-00c7-0017-00ce-001c00f60089.png",
        "timestamp": 1571225242720,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard leads to dashboard page from quick info tab|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0083002f-00e2-0015-0020-003a00ea00ad.png",
        "timestamp": 1571225242727,
        "duration": 0
    },
    {
        "description": "Verify the UI of display lists|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e100c3-00d1-00cb-0015-001c005b00da.png",
        "timestamp": 1571225242734,
        "duration": 0
    },
    {
        "description": "Verify clicking on edit icon leads to custom display settings|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00640015-0045-0018-0084-005700dc000b.png",
        "timestamp": 1571225242740,
        "duration": 0
    },
    {
        "description": "Verify display name can be edit and save|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007b00e2-0050-00f0-0080-002f00840093.png",
        "timestamp": 1571225242747,
        "duration": 0
    },
    {
        "description": "Verify new display can be created|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007500e4-001a-0077-0084-0043001200c7.png",
        "timestamp": 1571225242754,
        "duration": 0
    },
    {
        "description": "Verify available product page open when clicked run display button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00760009-00ac-00fd-0017-00f6002d0080.png",
        "timestamp": 1571225242768,
        "duration": 0
    },
    {
        "description": "Verify UI of patient label page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ee00ed-0065-0055-0067-00d50016008b.png",
        "timestamp": 1571225242775,
        "duration": 0
    },
    {
        "description": "Verify patient label reflect the labels checked and unchecked|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00480092-0051-0086-00c4-009700a2000e.png",
        "timestamp": 1571225242781,
        "duration": 0
    },
    {
        "description": "Verify new label settings can be saved|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004600a2-0065-0005-0066-0024002000dd.png",
        "timestamp": 1571225242788,
        "duration": 0
    },
    {
        "description": "Verify UI of printer settings page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0012003c-00c6-0050-0097-00be00290082.png",
        "timestamp": 1571225242794,
        "duration": 0
    },
    {
        "description": "Verify printer settings can be saved|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006c00d5-0008-00c5-0088-0053008f001a.png",
        "timestamp": 1571225242801,
        "duration": 0
    },
    {
        "description": "Verify printnode username and password can not be edited|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00aa00f4-0009-0067-0013-0054003800df.png",
        "timestamp": 1571225242807,
        "duration": 1
    },
    {
        "description": "Verify default receipt printer can used to test print|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00bd00d9-00fd-006a-0059-006a00770019.png",
        "timestamp": 1571225242814,
        "duration": 0
    },
    {
        "description": "Verify UI of Sales limit page|Saleslimit Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005100a2-0044-00c1-0014-00d9002500bc.png",
        "timestamp": 1571225242821,
        "duration": 0
    },
    {
        "description": "Verify recreational product can be change and save|Saleslimit Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00590067-0012-0020-008a-008b00d500b8.png",
        "timestamp": 1571225242828,
        "duration": 0
    },
    {
        "description": "Verify clicking show will convert ounce to grams for product|Saleslimit Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005b00e0-00b7-0001-005d-003c000700a7.png",
        "timestamp": 1571225242835,
        "duration": 0
    },
    {
        "description": "Verify the UI of taxes|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b70020-000a-0092-000e-00f700d500fb.png",
        "timestamp": 1571225242843,
        "duration": 0
    },
    {
        "description": "Verify taxes can be added|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005f00f5-00ba-0020-00ab-0029005c00fa.png",
        "timestamp": 1571225242850,
        "duration": 0
    },
    {
        "description": "Verify taxes can be deleted|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00830043-00aa-007c-001e-000a008600a1.png",
        "timestamp": 1571225242858,
        "duration": 0
    },
    {
        "description": "Verify taxes can be listed based on location|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002900d1-0096-000e-004a-007700a2001a.png",
        "timestamp": 1571225242867,
        "duration": 0
    },
    {
        "description": "Verify the UI of terminal|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a400e5-00e6-00d4-004d-009500ec0008.png",
        "timestamp": 1571225242873,
        "duration": 0
    },
    {
        "description": "Verify the UI of terminal settings|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f9001c-0081-00ed-009a-008f004800d0.png",
        "timestamp": 1571225242880,
        "duration": 0
    },
    {
        "description": "Save the new terminal api key from the terminal settings tab|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00170027-00c6-0000-0087-004d001300da.png",
        "timestamp": 1571225242887,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard page leads to dashboard page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009c00ae-003b-00e4-0047-008400f6009e.png",
        "timestamp": 1571225242894,
        "duration": 0
    },
    {
        "description": "Verify clicking on specific location shows terminal list of that location|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009d00cb-001c-0094-0035-009500950056.png",
        "timestamp": 1571225242900,
        "duration": 1
    },
    {
        "description": "Verify terminal can be edit and save|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d60049-0041-00ee-0041-0091000400e2.png",
        "timestamp": 1571225242907,
        "duration": 0
    },
    {
        "description": "Verify the contents of terminal details|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e50085-002b-000a-007c-00010033009d.png",
        "timestamp": 1571225242914,
        "duration": 0
    },
    {
        "description": "Verify terminals can be deleted|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d600ac-000c-0043-00f6-0056009d005e.png",
        "timestamp": 1571225242921,
        "duration": 0
    },
    {
        "description": "Verify new terminal can be created|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009e009d-00b2-0063-0074-00cf001d0006.png",
        "timestamp": 1571225242928,
        "duration": 0
    },
    {
        "description": "Visit Users page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001c006e-0078-006a-006b-007b00c30016.png",
        "timestamp": 1571225242935,
        "duration": 0
    },
    {
        "description": "Verify search bar works for Users|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008f007a-000b-006b-00bb-001f001f00fc.png",
        "timestamp": 1571225242942,
        "duration": 0
    },
    {
        "description": "Validate Export Data button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0044001c-00a0-0070-00d7-008e0038009d.png",
        "timestamp": 1571225242950,
        "duration": 0
    },
    {
        "description": "Validate show options works|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001c0043-0019-0062-004b-0041003600bc.png",
        "timestamp": 1571225242957,
        "duration": 0
    },
    {
        "description": "Validate New user button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00bd00af-0099-007d-0050-0081003200bd.png",
        "timestamp": 1571225242965,
        "duration": 0
    },
    {
        "description": "Validate new user pop up open and close|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f4002f-000c-00fa-00ff-00b300850094.png",
        "timestamp": 1571225242972,
        "duration": 0
    },
    {
        "description": "Validate new user can be added successfully|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004900c4-00b2-007e-0094-00d700f60059.png",
        "timestamp": 1571225242979,
        "duration": 0
    },
    {
        "description": "Verify pop up open with editable user information when clicked on Edit button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f5004d-0095-00b3-0030-00160006000a.png",
        "timestamp": 1571225242986,
        "duration": 0
    },
    {
        "description": "Verify pop up open and close for edit button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d60010-00b0-007a-005f-001f002a009e.png",
        "timestamp": 1571225242993,
        "duration": 0
    },
    {
        "description": "Verify users information can be changed and save|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c4008a-001b-00a6-00a0-00cf007100ca.png",
        "timestamp": 1571225243000,
        "duration": 0
    },
    {
        "description": "Verify users deleted from delete icon|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0008002f-00ea-0004-00fb-00e2003400e8.png",
        "timestamp": 1571225243011,
        "duration": 0
    },
    {
        "description": "Verify pagination works for users page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00790056-0072-007e-00db-005300c20076.png",
        "timestamp": 1571225243022,
        "duration": 0
    },
    {
        "description": "Verify queue pop up open and close|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ab005c-004c-005e-00bf-00be005c006b.png",
        "timestamp": 1571225243032,
        "duration": 0
    },
    {
        "description": "Verify clicking on Orders icon leads to Sales-> orders page |On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005b00f9-0046-0050-00bf-00fd00ae00a4.png",
        "timestamp": 1571225243040,
        "duration": 0
    },
    {
        "description": "Verify clicking on Orders icon leads to Sales-> orders page |On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c900b4-00c3-00e7-00c6-0079009f0011.png",
        "timestamp": 1571225243048,
        "duration": 0
    },
    {
        "description": "Verify clicking on cashier icon open pop up|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005500f8-0025-0020-0034-00e400c3008c.png",
        "timestamp": 1571225243055,
        "duration": 0
    },
    {
        "description": "Verify pop up icon close when clicked close icon for cashier|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00cb0023-0058-0073-0091-001b00ee0097.png",
        "timestamp": 1571225243063,
        "duration": 0
    },
    {
        "description": "Verify clicking on kebab menu open kebab menu item|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00500002-0032-0093-0080-00bb00b6006e.png",
        "timestamp": 1571225243070,
        "duration": 0
    },
    {
        "description": "Verify the contents of the kebab menu|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00130039-00b8-0009-0007-00c2009b00d3.png",
        "timestamp": 1571225243077,
        "duration": 0
    },
    {
        "description": "Verify the contents of the kebab menu|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000200f1-001c-003b-0031-003c00570029.png",
        "timestamp": 1571225243085,
        "duration": 0
    },
    {
        "description": "Verify search bar works|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006400fd-00f8-005b-0082-006a001500b6.png",
        "timestamp": 1571225243092,
        "duration": 0
    },
    {
        "description": "Verify clicking on item after searching will leads to respective page|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 10751,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001c00b2-00ba-0087-000f-001d00db007e.png",
        "timestamp": 1571225243100,
        "duration": 0
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});

    };

    this.setTitle = function () {
        var title = $('.report-title').text();
        titleService.setTitle(title);
    };

    // is run after all test data has been prepared/loaded
    this.afterLoadingJobs = function () {
        this.sortSpecs();
        this.setTitle();
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    } else {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.afterLoadingJobs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.afterLoadingJobs();
    }

}]);

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

//formats millseconds to h m s
app.filter('timeFormat', function () {
    return function (tr, fmt) {
        if(tr == null){
            return "NaN";
        }

        switch (fmt) {
            case 'h':
                var h = tr / 1000 / 60 / 60;
                return "".concat(h.toFixed(2)).concat("h");
            case 'm':
                var m = tr / 1000 / 60;
                return "".concat(m.toFixed(2)).concat("min");
            case 's' :
                var s = tr / 1000;
                return "".concat(s.toFixed(2)).concat("s");
            case 'hm':
            case 'h:m':
                var hmMt = tr / 1000 / 60;
                var hmHr = Math.trunc(hmMt / 60);
                var hmMr = hmMt - (hmHr * 60);
                if (fmt === 'h:m') {
                    return "".concat(hmHr).concat(":").concat(hmMr < 10 ? "0" : "").concat(Math.round(hmMr));
                }
                return "".concat(hmHr).concat("h ").concat(hmMr.toFixed(2)).concat("min");
            case 'hms':
            case 'h:m:s':
                var hmsS = tr / 1000;
                var hmsHr = Math.trunc(hmsS / 60 / 60);
                var hmsM = hmsS / 60;
                var hmsMr = Math.trunc(hmsM - hmsHr * 60);
                var hmsSo = hmsS - (hmsHr * 60 * 60) - (hmsMr*60);
                if (fmt === 'h:m:s') {
                    return "".concat(hmsHr).concat(":").concat(hmsMr < 10 ? "0" : "").concat(hmsMr).concat(":").concat(hmsSo < 10 ? "0" : "").concat(Math.round(hmsSo));
                }
                return "".concat(hmsHr).concat("h ").concat(hmsMr).concat("min ").concat(hmsSo.toFixed(2)).concat("s");
            case 'ms':
                var msS = tr / 1000;
                var msMr = Math.trunc(msS / 60);
                var msMs = msS - (msMr * 60);
                return "".concat(msMr).concat("min ").concat(msMs.toFixed(2)).concat("s");
        }

        return tr;
    };
});


function PbrStackModalController($scope, $rootScope) {
    var ctrl = this;
    ctrl.rootScope = $rootScope;
    ctrl.getParent = getParent;
    ctrl.getShortDescription = getShortDescription;
    ctrl.convertTimestamp = convertTimestamp;
    ctrl.isValueAnArray = isValueAnArray;
    ctrl.toggleSmartStackTraceHighlight = function () {
        var inv = !ctrl.rootScope.showSmartStackTraceHighlight;
        ctrl.rootScope.showSmartStackTraceHighlight = inv;
    };
    ctrl.applySmartHighlight = function (line) {
        if ($rootScope.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return '';
    };
}


app.component('pbrStackModal', {
    templateUrl: "pbr-stack-modal.html",
    bindings: {
        index: '=',
        data: '='
    },
    controller: PbrStackModalController
});

function PbrScreenshotModalController($scope, $rootScope) {
    var ctrl = this;
    ctrl.rootScope = $rootScope;
    ctrl.getParent = getParent;
    ctrl.getShortDescription = getShortDescription;

    /**
     * Updates which modal is selected.
     */
    this.updateSelectedModal = function (event, index) {
        var key = event.key; //try to use non-deprecated key first https://developer.mozilla.org/de/docs/Web/API/KeyboardEvent/keyCode
        if (key == null) {
            var keyMap = {
                37: 'ArrowLeft',
                39: 'ArrowRight'
            };
            key = keyMap[event.keyCode]; //fallback to keycode
        }
        if (key === "ArrowLeft" && this.hasPrevious) {
            this.showHideModal(index, this.previous);
        } else if (key === "ArrowRight" && this.hasNext) {
            this.showHideModal(index, this.next);
        }
    };

    /**
     * Hides the modal with the #oldIndex and shows the modal with the #newIndex.
     */
    this.showHideModal = function (oldIndex, newIndex) {
        const modalName = '#imageModal';
        $(modalName + oldIndex).modal("hide");
        $(modalName + newIndex).modal("show");
    };

}

app.component('pbrScreenshotModal', {
    templateUrl: "pbr-screenshot-modal.html",
    bindings: {
        index: '=',
        data: '=',
        next: '=',
        previous: '=',
        hasNext: '=',
        hasPrevious: '='
    },
    controller: PbrScreenshotModalController
});

app.factory('TitleService', ['$document', function ($document) {
    return {
        setTitle: function (title) {
            $document[0].title = title;
        }
    };
}]);


app.run(
    function ($rootScope, $templateCache) {
        //make sure this option is on by default
        $rootScope.showSmartStackTraceHighlight = true;
        
  $templateCache.put('pbr-screenshot-modal.html',
    '<div class="modal" id="imageModal{{$ctrl.index}}" tabindex="-1" role="dialog"\n' +
    '     aria-labelledby="imageModalLabel{{$ctrl.index}}" ng-keydown="$ctrl.updateSelectedModal($event,$ctrl.index)">\n' +
    '    <div class="modal-dialog modal-lg m-screenhot-modal" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h6 class="modal-title" id="imageModalLabelP{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getParent($ctrl.data.description)}}</h6>\n' +
    '                <h5 class="modal-title" id="imageModalLabel{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getShortDescription($ctrl.data.description)}}</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <img class="screenshotImage" ng-src="{{$ctrl.data.screenShotFile}}">\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <div class="pull-left">\n' +
    '                    <button ng-disabled="!$ctrl.hasPrevious" class="btn btn-default btn-previous" data-dismiss="modal"\n' +
    '                            data-toggle="modal" data-target="#imageModal{{$ctrl.previous}}">\n' +
    '                        Prev\n' +
    '                    </button>\n' +
    '                    <button ng-disabled="!$ctrl.hasNext" class="btn btn-default btn-next"\n' +
    '                            data-dismiss="modal" data-toggle="modal"\n' +
    '                            data-target="#imageModal{{$ctrl.next}}">\n' +
    '                        Next\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <a class="btn btn-primary" href="{{$ctrl.data.screenShotFile}}" target="_blank">\n' +
    '                    Open Image in New Tab\n' +
    '                    <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>\n' +
    '                </a>\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
     ''
  );

  $templateCache.put('pbr-stack-modal.html',
    '<div class="modal" id="modal{{$ctrl.index}}" tabindex="-1" role="dialog"\n' +
    '     aria-labelledby="stackModalLabel{{$ctrl.index}}">\n' +
    '    <div class="modal-dialog modal-lg m-stack-modal" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h6 class="modal-title" id="stackModalLabelP{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getParent($ctrl.data.description)}}</h6>\n' +
    '                <h5 class="modal-title" id="stackModalLabel{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getShortDescription($ctrl.data.description)}}</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <div ng-if="$ctrl.data.trace.length > 0">\n' +
    '                    <div ng-if="$ctrl.isValueAnArray($ctrl.data.trace)">\n' +
    '                        <pre class="logContainer" ng-repeat="trace in $ctrl.data.trace track by $index"><div ng-class="$ctrl.applySmartHighlight(line)" ng-repeat="line in trace.split(\'\\n\') track by $index">{{line}}</div></pre>\n' +
    '                    </div>\n' +
    '                    <div ng-if="!$ctrl.isValueAnArray($ctrl.data.trace)">\n' +
    '                        <pre class="logContainer"><div ng-class="$ctrl.applySmartHighlight(line)" ng-repeat="line in $ctrl.data.trace.split(\'\\n\') track by $index">{{line}}</div></pre>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div ng-if="$ctrl.data.browserLogs.length > 0">\n' +
    '                    <h5 class="modal-title">\n' +
    '                        Browser logs:\n' +
    '                    </h5>\n' +
    '                    <pre class="logContainer"><div class="browserLogItem"\n' +
    '                                                   ng-repeat="logError in $ctrl.data.browserLogs track by $index"><div><span class="label browserLogLabel label-default"\n' +
    '                                                                                                                             ng-class="{\'label-danger\': logError.level===\'SEVERE\', \'label-warning\': logError.level===\'WARNING\'}">{{logError.level}}</span><span class="label label-default">{{$ctrl.convertTimestamp(logError.timestamp)}}</span><div ng-repeat="messageLine in logError.message.split(\'\\\\n\') track by $index">{{ messageLine }}</div></div></div></pre>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <button class="btn btn-default"\n' +
    '                        ng-class="{active: $ctrl.rootScope.showSmartStackTraceHighlight}"\n' +
    '                        ng-click="$ctrl.toggleSmartStackTraceHighlight()">\n' +
    '                    <span class="glyphicon glyphicon-education black"></span> Smart Stack Trace\n' +
    '                </button>\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
     ''
  );

    });
