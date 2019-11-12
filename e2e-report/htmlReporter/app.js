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
        "description": "Verify the contents of UI of Returns Report|Reports Page",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1573528234454,
        "duration": 42266
    },
    {
        "description": "Verify for the sales of return|Reports Page",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1573528276768,
        "duration": 47879
    },
    {
        "description": "Verify new reports can be generated from export report|Reports Page",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "timestamp": 1573528324671,
        "duration": 44670
    },
    {
        "description": "should send error when user does not exist|Login Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f50010-0041-0055-00fc-00b2006700c5.png",
        "timestamp": 1573528369371,
        "duration": 41
    },
    {
        "description": "should show error when password is invalid|Login Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a60069-0055-0049-0058-001a00fa0068.png",
        "timestamp": 1573528369435,
        "duration": 0
    },
    {
        "description": "should log the user in when the user exists|Login Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00cc00d6-0022-0032-00aa-008f00f70092.png",
        "timestamp": 1573528369462,
        "duration": 0
    },
    {
        "description": "Navigates to catalog and click|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00770029-001e-008d-00ab-008d003b0076.png",
        "timestamp": 1573528369505,
        "duration": 0
    },
    {
        "description": "Verify contents of available cannabis page|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007e0096-0035-0038-00ed-0094007000bd.png",
        "timestamp": 1573528369544,
        "duration": 1
    },
    {
        "description": "Verify contents of Cannabis product details|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e8006e-00c3-00ca-0081-0068004d00e8.png",
        "timestamp": 1573528369577,
        "duration": 0
    },
    {
        "description": "Verify contents of All cannabis product|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009d0047-00ac-004e-00c3-003300f000dd.png",
        "timestamp": 1573528369611,
        "duration": 0
    },
    {
        "description": "Verify contents of All cannabis product export data|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000e008d-00a4-00a8-00aa-009200f5004d.png",
        "timestamp": 1573528369642,
        "duration": 1
    },
    {
        "description": "Verify contents of All cannabis product add new product|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004e0038-000f-00d2-0001-00f100300075.png",
        "timestamp": 1573528369680,
        "duration": 0
    },
    {
        "description": "Verify contents of Regular product and product edit button|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e000f3-006b-0015-0065-009b00a40075.png",
        "timestamp": 1573528369707,
        "duration": 0
    },
    {
        "description": "Verify contents of Regular product and delete product button|Catalog Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f00026-00a9-000d-009b-004f000d0058.png",
        "timestamp": 1573528369735,
        "duration": 0
    },
    {
        "description": "Verify UI of Customergroup page|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009a00bf-000b-00b5-0079-002f0004006d.png",
        "timestamp": 1573528369753,
        "duration": 0
    },
    {
        "description": "Verify the UI of define new customer group|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00dc00b8-0030-0043-0018-00ae00f30086.png",
        "timestamp": 1573528369785,
        "duration": 0
    },
    {
        "description": "Verify user can enter customer group name and description in the define new customer group pop up|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003b00ca-005d-004e-00cf-0038006d00c7.png",
        "timestamp": 1573528369815,
        "duration": 0
    },
    {
        "description": "Verify new customer group name can be created|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000c0006-00b6-0035-00d7-003800490078.png",
        "timestamp": 1573528369845,
        "duration": 0
    },
    {
        "description": "Verify clicking Cancel button close pop up of define new customer group|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b40007-00bf-0043-0085-00d800b30076.png",
        "timestamp": 1573528369875,
        "duration": 0
    },
    {
        "description": "Verify pop up open when click edit icon|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000e00eb-006f-002b-0078-002e00e1004e.png",
        "timestamp": 1573528369904,
        "duration": 1
    },
    {
        "description": "Verify customer group name and description can be edited and submit|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003b00d0-008b-00a1-00c8-002800680017.png",
        "timestamp": 1573528369937,
        "duration": 0
    },
    {
        "description": "Verify clicking cancel close the pop up from delete icon|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002f0045-0000-0015-00b8-00b300480021.png",
        "timestamp": 1573528369966,
        "duration": 0
    },
    {
        "description": "Verify clicking OK button delete the customer group|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fc00f9-00bd-0075-0052-006100bc00a4.png",
        "timestamp": 1573528369994,
        "duration": 0
    },
    {
        "description": "Verify dropdown appears when click customer from side-nav|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ea007c-00a5-0096-0070-004000a500b0.png",
        "timestamp": 1573528370023,
        "duration": 0
    },
    {
        "description": "Verify UI of customers page|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00580013-0067-00cd-0090-00e6003a00aa.png",
        "timestamp": 1573528370051,
        "duration": 0
    },
    {
        "description": "Verify the Export data|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b10098-0087-001b-0046-0091004300cf.png",
        "timestamp": 1573528370079,
        "duration": 0
    },
    {
        "description": "Verify the contents of import customers|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f4000f-00ca-00fa-00b1-008c00dc0007.png",
        "timestamp": 1573528370109,
        "duration": 0
    },
    {
        "description": "Verify the download CSV template|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c30013-0036-00c8-004a-00cd00ef0043.png",
        "timestamp": 1573528370142,
        "duration": 0
    },
    {
        "description": "Verify the contents of import customer guide|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f6000d-0035-0055-001d-005c001e0039.png",
        "timestamp": 1573528370179,
        "duration": 0
    },
    {
        "description": "Verify cancel button for new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0045002a-0071-006f-004d-00b20008008f.png",
        "timestamp": 1573528370202,
        "duration": 0
    },
    {
        "description": "Verify the search for customers|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009b009a-0035-0012-00a4-00af009c009d.png",
        "timestamp": 1573528370236,
        "duration": 0
    },
    {
        "description": "Verify Customers are displayed as per required no of rows in show dropdown|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c2009f-0049-00bc-00d2-0025005f00f8.png",
        "timestamp": 1573528370268,
        "duration": 0
    },
    {
        "description": "Verify the components of delete of customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004000ec-00d4-00bd-00cd-0057005b00b1.png",
        "timestamp": 1573528370298,
        "duration": 0
    },
    {
        "description": "Verify the cancel for delete of customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002e0068-00ea-007a-005c-0076003300b0.png",
        "timestamp": 1573528370323,
        "duration": 0
    },
    {
        "description": "Verify user can delete existing customer from customers table|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e2005f-006e-00f1-00f9-00f800a600ce.png",
        "timestamp": 1573528370355,
        "duration": 0
    },
    {
        "description": "Verify the first pop up components of new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007f004a-0055-00fd-0067-0027004a00d0.png",
        "timestamp": 1573528370373,
        "duration": 0
    },
    {
        "description": "Verify the second pop up components of new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00590020-008b-005f-0053-0044005b005d.png",
        "timestamp": 1573528370398,
        "duration": 0
    },
    {
        "description": "Verify the third pop up components of new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fe0074-004f-00b6-00f5-0067005500a9.png",
        "timestamp": 1573528370431,
        "duration": 0
    },
    {
        "description": "Verify the fourth pop up components of new customer|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00050082-004b-000b-0007-00b0008e0020.png",
        "timestamp": 1573528370464,
        "duration": 0
    },
    {
        "description": "Verify UI of waiting list page|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d5002b-000f-0080-00ad-00f10021007c.png",
        "timestamp": 1573528370502,
        "duration": 0
    },
    {
        "description": "Verify UI of check in a customer button|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00db00fe-0078-00ad-0066-008b009e00fb.png",
        "timestamp": 1573528370538,
        "duration": 0
    },
    {
        "description": "Verify check in a customer pop up close when clicked on close icon as well as close button|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009300bf-0027-005d-00a8-00a700460058.png",
        "timestamp": 1573528370575,
        "duration": 0
    },
    {
        "description": "Verify New Customers can be check in|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006a0093-0063-00ac-0048-006b000e00ec.png",
        "timestamp": 1573528370609,
        "duration": 0
    },
    {
        "description": "Verify customers name can be select in search bar and checked in|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0084001a-00fd-0058-0025-000600b900d7.png",
        "timestamp": 1573528370640,
        "duration": 0
    },
    {
        "description": "Verify customer can be checked out|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00690007-008d-00e9-0090-005400650055.png",
        "timestamp": 1573528370681,
        "duration": 0
    },
    {
        "description": "Verify clicking on start order leads to POS page|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005e00d0-0098-006d-000d-00a8002e0056.png",
        "timestamp": 1573528370705,
        "duration": 0
    },
    {
        "description": "Verify UI of checked out tab|Customers Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b600eb-00bf-0077-002d-00e3007200ac.png",
        "timestamp": 1573528370736,
        "duration": 0
    },
    {
        "description": "Only navigates|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d60084-0031-0070-00d4-005c00aa0069.png",
        "timestamp": 1573528370766,
        "duration": 0
    },
    {
        "description": "Verify contents of dashboard page|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00350010-0047-00f0-0050-007e00910015.png",
        "timestamp": 1573528370805,
        "duration": 0
    },
    {
        "description": "Verify contents of todays stats|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0006003b-0072-00cc-002a-00d9004700e8.png",
        "timestamp": 1573528370834,
        "duration": 0
    },
    {
        "description": "Verify contents of tabs|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00cc003c-0060-00c1-00f0-0001008b00b8.png",
        "timestamp": 1573528370866,
        "duration": 0
    },
    {
        "description": "Verify Most recent orders|Dashboard Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b900f3-00bc-0079-0049-004b00710038.png",
        "timestamp": 1573528370899,
        "duration": 0
    },
    {
        "description": "On clicking inventory dropdown|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003b004f-001a-00a6-0028-00c4005400d0.png",
        "timestamp": 1573528370923,
        "duration": 0
    },
    {
        "description": "Verify contents of Inventory Page|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00410054-002a-0048-008d-008d00ef00c5.png",
        "timestamp": 1573528370959,
        "duration": 0
    },
    {
        "description": "Verify import sheet button|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00380029-00a1-009b-0097-004e00430054.png",
        "timestamp": 1573528370984,
        "duration": 0
    },
    {
        "description": "Verify download csv button|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0022008a-008b-002d-008d-001c0095009c.png",
        "timestamp": 1573528371018,
        "duration": 0
    },
    {
        "description": "verify add add new inventory items|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e50084-00d9-0063-00de-002e00840063.png",
        "timestamp": 1573528371049,
        "duration": 0
    },
    {
        "description": "Verify update inventory|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007300a2-0060-008b-00ee-0002006d0060.png",
        "timestamp": 1573528371079,
        "duration": 1
    },
    {
        "description": "Verify delete inventory item|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0092007b-0027-00e8-007f-005500050032.png",
        "timestamp": 1573528371115,
        "duration": 0
    },
    {
        "description": "Verify location page|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ca0033-000d-00cf-00cd-00e90073004a.png",
        "timestamp": 1573528371145,
        "duration": 0
    },
    {
        "description": "Verify delete location|Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004600c5-000c-00e6-003a-002f003c0013.png",
        "timestamp": 1573528371169,
        "duration": 0
    },
    {
        "description": "Verify edit location |Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fe0067-00bd-009d-004e-003d0084007c.png",
        "timestamp": 1573528371201,
        "duration": 0
    },
    {
        "description": "Verify Warehouse page |Inventory Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fd00d0-0076-006a-001e-0033006e001a.png",
        "timestamp": 1573528371232,
        "duration": 0
    },
    {
        "description": "should be able to login and should be logged out |Logout Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00150058-005c-00a4-0073-00be007000c9.png",
        "timestamp": 1573528371255,
        "duration": 1
    },
    {
        "description": "Verify the UI of loyalty page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003e0099-0010-0046-0039-00fc00b400e7.png",
        "timestamp": 1573528371288,
        "duration": 0
    },
    {
        "description": "Verify toggle options works for earn points conversion rate|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0022001b-00e5-00e2-0088-008500e800ed.png",
        "timestamp": 1573528371321,
        "duration": 1
    },
    {
        "description": "Verify toggle options works for redemption conversion rate|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001d00cb-00d9-00c1-00a8-0051006b0052.png",
        "timestamp": 1573528371356,
        "duration": 1
    },
    {
        "description": "Verify toggle options works for maximum points discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0045006e-0052-003e-003f-008800f90081.png",
        "timestamp": 1573528371395,
        "duration": 0
    },
    {
        "description": "Verify the UI of Discounts page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b70007-006f-006e-00ce-008000cf007f.png",
        "timestamp": 1573528371413,
        "duration": 0
    },
    {
        "description": "Verify search bar works for respective discount code|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008900d1-0084-00d8-00db-00cf0017006c.png",
        "timestamp": 1573528371447,
        "duration": 0
    },
    {
        "description": "Verify clicking on InActive leads to inactive list for General discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00920042-00d0-00b8-000a-00fa00f10094.png",
        "timestamp": 1573528371482,
        "duration": 0
    },
    {
        "description": "Verify the UI of Volume Discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002b0014-001f-0035-00da-0005008f0042.png",
        "timestamp": 1573528371524,
        "duration": 0
    },
    {
        "description": "Verify clicking on InActive leads to inactive list for Volume Discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005c0029-009a-0088-00cd-00e300fe0005.png",
        "timestamp": 1573528371562,
        "duration": 0
    },
    {
        "description": "Verify clicking on Create new volume discount leads to create discount by volume page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0099000c-00c3-0039-004d-000c0002002e.png",
        "timestamp": 1573528371597,
        "duration": 0
    },
    {
        "description": "Verify clicking on Create a new discount leads to create discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004700e4-0028-000d-0054-00d300fd003f.png",
        "timestamp": 1573528371623,
        "duration": 0
    },
    {
        "description": "Verify new discount can be created from create a new discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003c00e7-00be-00c3-0072-002a004400f8.png",
        "timestamp": 1573528371663,
        "duration": 0
    },
    {
        "description": "Verify pop up open when click view button for specific row|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00af00c8-0085-00e9-00fe-002600730098.png",
        "timestamp": 1573528371714,
        "duration": 0
    },
    {
        "description": "Verify View pop can be close using close icon and close button|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ef0098-0055-0046-008c-007300070058.png",
        "timestamp": 1573528371749,
        "duration": 0
    },
    {
        "description": "Verify new volume discount can be created from create a new volume discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b80080-0080-00c2-0061-00d600610077.png",
        "timestamp": 1573528371783,
        "duration": 0
    },
    {
        "description": "Verify click on edit for pop up view of general discount leads to Edit discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00650086-00c6-003c-0081-00e800580043.png",
        "timestamp": 1573528371818,
        "duration": 0
    },
    {
        "description": "Verify click on delete for pop up view of general discount deletes the discount|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d4004f-00a0-0044-00be-005700210013.png",
        "timestamp": 1573528371848,
        "duration": 0
    },
    {
        "description": "Verify paginater works for discount page|Marketing Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008800b5-00eb-002a-0025-0003004a00a4.png",
        "timestamp": 1573528371882,
        "duration": 1
    },
    {
        "description": "should able to click POS on sidenav|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005e00f1-0018-00d8-0096-008000e7002e.png",
        "timestamp": 1573528371922,
        "duration": 0
    },
    {
        "description": "verify pop up close when click (X) icon|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005600dc-006f-0056-002d-00c4003c0032.png",
        "timestamp": 1573528371956,
        "duration": 0
    },
    {
        "description": "Verify Customer should be selected to purchase product|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c100bf-00cc-007e-0078-007100a800de.png",
        "timestamp": 1573528371992,
        "duration": 0
    },
    {
        "description": "Verify POS page top bar item is clickable and show its specific information|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00330098-00cb-0088-0046-002000bf00fe.png",
        "timestamp": 1573528372036,
        "duration": 0
    },
    {
        "description": "Verify notification appears for adding cannabis product without assigning customer|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001a0074-007a-00d4-00a0-00d7000d0031.png",
        "timestamp": 1573528372062,
        "duration": 0
    },
    {
        "description": "Verify pop up open when click discount|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005e0024-004c-001d-0091-00ff0083008b.png",
        "timestamp": 1573528372098,
        "duration": 0
    },
    {
        "description": "Verify discount pop up close|After Clicking POS",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005f0067-00a9-0024-00bd-0048008900c4.png",
        "timestamp": 1573528372134,
        "duration": 0
    },
    {
        "description": "Verify the UI of close out terminal|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004300b9-00f0-0054-0078-0000000c00bd.png",
        "timestamp": 1573528372209,
        "duration": 1
    },
    {
        "description": "Verify date can be selected and it loads the respective reports|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001700bd-001a-006d-0012-00a9003900a1.png",
        "timestamp": 1573528372244,
        "duration": 0
    },
    {
        "description": "Verify reports can be export in CSV format|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000b00fd-0002-0086-0057-008a0071008d.png",
        "timestamp": 1573528372277,
        "duration": 0
    },
    {
        "description": "Verify reports can be viewed base on location|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00190055-009d-0044-0045-006b00420018.png",
        "timestamp": 1573528372288,
        "duration": 0
    },
    {
        "description": "Verify respective terminal report can be view when clicked view icon|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c20081-0065-0015-00ff-00f6005a001f.png",
        "timestamp": 1573528372299,
        "duration": 0
    },
    {
        "description": "Verify the UI of metrc report|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e200c7-0079-0032-00fc-0045002800de.png",
        "timestamp": 1573528372312,
        "duration": 0
    },
    {
        "description": "Verify reports can be run with new date|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0027005f-0037-00d2-0069-001d00300089.png",
        "timestamp": 1573528372321,
        "duration": 0
    },
    {
        "description": "Verify new reports can be generated from export report|Reports Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007000d0-009c-0040-00bc-0076001e006e.png",
        "timestamp": 1573528372335,
        "duration": 0
    },
    {
        "description": "Verify contents of Sales|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0028009c-00f4-0045-006c-00e900e700aa.png",
        "timestamp": 1573528372344,
        "duration": 0
    },
    {
        "description": "Verify contents of Sales|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ec0018-0084-0025-0002-005b008500ae.png",
        "timestamp": 1573528372356,
        "duration": 0
    },
    {
        "description": "Verify contents of Sales|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007b003b-009f-0059-0032-006d00840015.png",
        "timestamp": 1573528372365,
        "duration": 0
    },
    {
        "description": "Verify export data btn|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f90030-00fd-00ae-001b-00b900c90099.png",
        "timestamp": 1573528372371,
        "duration": 0
    },
    {
        "description": "Verify New order btn close operation|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007800bf-005d-001a-0035-00fe003300f1.png",
        "timestamp": 1573528372377,
        "duration": 0
    },
    {
        "description": "Verify New order btn continue operation|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008f0063-0047-00c4-0090-000900e50051.png",
        "timestamp": 1573528372387,
        "duration": 0
    },
    {
        "description": "Verify contents of Return page|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00530087-0083-00e5-0042-0004000f000f.png",
        "timestamp": 1573528372399,
        "duration": 1
    },
    {
        "description": "Verify contents of Return page|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a900ce-009e-0066-0062-007200a4003b.png",
        "timestamp": 1573528372409,
        "duration": 0
    },
    {
        "description": "Verify New order btn close operation|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006d0038-0043-0067-00a6-002b003f00a8.png",
        "timestamp": 1573528372415,
        "duration": 0
    },
    {
        "description": "Verify New order btn continue operation|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00bb006f-003f-0078-0094-005d003a00ba.png",
        "timestamp": 1573528372424,
        "duration": 0
    },
    {
        "description": "Verify contents of General Return page|Sales Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ef0015-00de-0055-0083-008c007d00a3.png",
        "timestamp": 1573528372432,
        "duration": 0
    },
    {
        "description": "Verify the UI of CompanyInfo|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00300002-008d-00bf-00f2-00fb00e50087.png",
        "timestamp": 1573528372440,
        "duration": 0
    },
    {
        "description": "Verify companyProfile can be updated|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f100c4-002f-0015-0089-008c00d900f0.png",
        "timestamp": 1573528372448,
        "duration": 1
    },
    {
        "description": "Verify clicking on back to dashboard leads to dashboard page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003200bb-00f9-00ee-0069-006c009c00ee.png",
        "timestamp": 1573528372456,
        "duration": 0
    },
    {
        "description": "Verify state info can be update|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00800075-00c2-002e-0018-00e100a50003.png",
        "timestamp": 1573528372464,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard page from state Info tab|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d80020-0097-006e-00fc-00cd00d50069.png",
        "timestamp": 1573528372470,
        "duration": 0
    },
    {
        "description": "Verify POS Settings can be updated|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009300cd-00c0-009d-00e2-0003006900b9.png",
        "timestamp": 1573528372475,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard leads to dashboard page from POS settings|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00740006-0010-005d-007a-004f00160073.png",
        "timestamp": 1573528372481,
        "duration": 0
    },
    {
        "description": "Verify quick books info can be update|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0074007e-009f-0097-0056-004b00d10025.png",
        "timestamp": 1573528372487,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard leads to dashboard page from quick info tab|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000b00c3-001b-00c0-00fc-0096006f003c.png",
        "timestamp": 1573528372494,
        "duration": 0
    },
    {
        "description": "Verify the UI of display lists|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00600095-0068-006c-0060-0053004a005f.png",
        "timestamp": 1573528372502,
        "duration": 0
    },
    {
        "description": "Verify clicking on edit icon leads to custom display settings|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c50066-0059-0002-0095-00dc00f80091.png",
        "timestamp": 1573528372510,
        "duration": 0
    },
    {
        "description": "Verify display name can be edit and save|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d40030-0057-0035-00f5-00ef008200c2.png",
        "timestamp": 1573528372516,
        "duration": 0
    },
    {
        "description": "Verify new display can be created|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fd006c-0035-00bc-0010-0076007f00a1.png",
        "timestamp": 1573528372523,
        "duration": 0
    },
    {
        "description": "Verify available product page open when clicked run display button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009400d9-00aa-0066-00e2-000300c8009b.png",
        "timestamp": 1573528372531,
        "duration": 0
    },
    {
        "description": "Verify UI of patient label page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f200cc-0066-00ce-00e2-001400010057.png",
        "timestamp": 1573528372538,
        "duration": 0
    },
    {
        "description": "Verify patient label reflect the labels checked and unchecked|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005d0060-009c-0021-0094-004600b20072.png",
        "timestamp": 1573528372544,
        "duration": 0
    },
    {
        "description": "Verify new label settings can be saved|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007200c6-0061-006f-00d7-00dd00ea006d.png",
        "timestamp": 1573528372550,
        "duration": 0
    },
    {
        "description": "Verify UI of printer settings page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0076007d-000f-005b-004e-00c1003b00d4.png",
        "timestamp": 1573528372556,
        "duration": 0
    },
    {
        "description": "Verify printer settings can be saved|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00660049-00ee-0008-004e-00e100af005e.png",
        "timestamp": 1573528372562,
        "duration": 0
    },
    {
        "description": "Verify printnode username and password can not be edited|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ac00ad-00bd-0084-0093-00f10065007a.png",
        "timestamp": 1573528372569,
        "duration": 0
    },
    {
        "description": "Verify default receipt printer can used to test print|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004f001f-00d3-0048-006f-003f001d0063.png",
        "timestamp": 1573528372577,
        "duration": 0
    },
    {
        "description": "Verify UI of Sales limit page|Saleslimit Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00800030-00df-0021-006e-004c0066002d.png",
        "timestamp": 1573528372650,
        "duration": 0
    },
    {
        "description": "Verify recreational product can be change and save|Saleslimit Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001400bc-00bc-00d8-0083-00ce0098009b.png",
        "timestamp": 1573528372660,
        "duration": 0
    },
    {
        "description": "Verify clicking show will convert ounce to grams for product|Saleslimit Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001f0010-00a1-00fc-003b-009d00610000.png",
        "timestamp": 1573528372670,
        "duration": 0
    },
    {
        "description": "Verify the UI of taxes|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fb00d5-009a-0057-00e8-00ea006c00d5.png",
        "timestamp": 1573528372678,
        "duration": 0
    },
    {
        "description": "Verify taxes can be added|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009b0061-0049-00d5-00be-0062002000b4.png",
        "timestamp": 1573528372689,
        "duration": 0
    },
    {
        "description": "Verify taxes can be deleted|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00060015-00e3-002f-0035-007a00bd001f.png",
        "timestamp": 1573528372701,
        "duration": 0
    },
    {
        "description": "Verify taxes can be listed based on location|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000500a3-0075-0036-002b-00cd001b007c.png",
        "timestamp": 1573528372711,
        "duration": 0
    },
    {
        "description": "Verify the UI of terminal|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00400083-0018-0049-002b-00c900f500d6.png",
        "timestamp": 1573528372723,
        "duration": 0
    },
    {
        "description": "Verify the UI of terminal settings|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004b0043-00ee-0031-004d-002d00a300b7.png",
        "timestamp": 1573528372734,
        "duration": 0
    },
    {
        "description": "Save the new terminal api key from the terminal settings tab|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e1009d-0026-0080-0076-005d007400d2.png",
        "timestamp": 1573528372742,
        "duration": 0
    },
    {
        "description": "Verify clicking on back to dashboard page leads to dashboard page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fe00a1-005b-004d-00f5-00cd007f00e4.png",
        "timestamp": 1573528372751,
        "duration": 0
    },
    {
        "description": "Verify clicking on specific location shows terminal list of that location|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00820037-0021-00d0-00fc-005600d200f4.png",
        "timestamp": 1573528372759,
        "duration": 0
    },
    {
        "description": "Verify terminal can be edit and save|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c900e8-0006-00b9-0066-000d00140033.png",
        "timestamp": 1573528372766,
        "duration": 0
    },
    {
        "description": "Verify the contents of terminal details|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008600b4-00ca-00e3-009a-00af00e40014.png",
        "timestamp": 1573528372774,
        "duration": 0
    },
    {
        "description": "Verify terminals can be deleted|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0074002b-0055-0040-00bc-0090004500ab.png",
        "timestamp": 1573528372781,
        "duration": 0
    },
    {
        "description": "Verify new terminal can be created|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ab008d-00a2-00e7-00c6-00c5000d0055.png",
        "timestamp": 1573528372787,
        "duration": 0
    },
    {
        "description": "Visit Users page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00cf00bd-0080-00a8-00e1-008f00f600c6.png",
        "timestamp": 1573528372793,
        "duration": 0
    },
    {
        "description": "Verify search bar works for Users|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001900b9-00ac-002e-00ed-00b700ff00ce.png",
        "timestamp": 1573528372800,
        "duration": 0
    },
    {
        "description": "Validate Export Data button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0081001d-0074-006b-00e8-00e100da000b.png",
        "timestamp": 1573528372807,
        "duration": 0
    },
    {
        "description": "Validate show options works|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b90028-00c5-005e-009a-00020019002b.png",
        "timestamp": 1573528372813,
        "duration": 0
    },
    {
        "description": "Validate New user button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0060008c-00a5-00ee-00eb-00ee006500ae.png",
        "timestamp": 1573528372821,
        "duration": 0
    },
    {
        "description": "Validate new user pop up open and close|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002300f2-0057-00a1-004b-005000c800d7.png",
        "timestamp": 1573528372827,
        "duration": 0
    },
    {
        "description": "Validate new user can be added successfully|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004f00c7-0032-0052-00dc-00b4009a0033.png",
        "timestamp": 1573528372835,
        "duration": 0
    },
    {
        "description": "Verify pop up open with editable user information when clicked on Edit button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b00016-008b-002f-0038-000900550047.png",
        "timestamp": 1573528372841,
        "duration": 0
    },
    {
        "description": "Verify pop up open and close for edit button|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d1007c-0041-0015-00ef-006500e300e4.png",
        "timestamp": 1573528372849,
        "duration": 0
    },
    {
        "description": "Verify users information can be changed and save|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ab00ec-00be-00b6-000f-0055007c00b1.png",
        "timestamp": 1573528372859,
        "duration": 0
    },
    {
        "description": "Verify users deleted from delete icon|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0069001e-00df-0031-0008-0013009a0039.png",
        "timestamp": 1573528372869,
        "duration": 0
    },
    {
        "description": "Verify pagination works for users page|Settings Page",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004200b9-00e5-0046-00fa-00ac00b7003c.png",
        "timestamp": 1573528372877,
        "duration": 0
    },
    {
        "description": "Verify queue pop up open and close|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00580024-0019-00ab-0070-004c002b00b5.png",
        "timestamp": 1573528372887,
        "duration": 0
    },
    {
        "description": "Verify clicking on Orders icon leads to Sales-> orders page |On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000e00c7-001b-00f0-001d-00db00a6005e.png",
        "timestamp": 1573528372896,
        "duration": 0
    },
    {
        "description": "Verify clicking on Orders icon leads to Sales-> orders page |On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e700c4-005c-00b2-00bc-006e00b400c5.png",
        "timestamp": 1573528372903,
        "duration": 0
    },
    {
        "description": "Verify clicking on cashier icon open pop up|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "009c007a-00df-0060-00ba-005d0090002b.png",
        "timestamp": 1573528372910,
        "duration": 0
    },
    {
        "description": "Verify pop up icon close when clicked close icon for cashier|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004000d3-0086-00a4-00ca-0018002100fa.png",
        "timestamp": 1573528372920,
        "duration": 0
    },
    {
        "description": "Verify clicking on kebab menu open kebab menu item|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004b0083-00e2-006d-0069-007b00ef0016.png",
        "timestamp": 1573528372929,
        "duration": 0
    },
    {
        "description": "Verify the contents of the kebab menu|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00400022-00e3-00ed-00c5-00c700b90089.png",
        "timestamp": 1573528372939,
        "duration": 0
    },
    {
        "description": "Verify the contents of the kebab menu|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00fb005a-0083-00da-00d2-00c100260038.png",
        "timestamp": 1573528372948,
        "duration": 0
    },
    {
        "description": "Verify search bar works|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00420022-0087-007c-00cc-004f00d200fe.png",
        "timestamp": 1573528372955,
        "duration": 0
    },
    {
        "description": "Verify clicking on item after searching will leads to respective page|On Top nav bar",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 9995,
        "browser": {
            "name": "chrome",
            "version": "78.0.3904.97"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0086002e-0074-002b-0033-0035007a00f0.png",
        "timestamp": 1573528372962,
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
