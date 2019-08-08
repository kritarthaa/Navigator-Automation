// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  restartBrowserBetweenTests: true,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
        args: ["disable-infobars", "--start-maximized", "--window-size=1630,963"]
    }
  },
  directConnect: true,
  port: null,
  baseUrl: 'https://nbs-qa.azurewebsites.net/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 250000,
    print: () => {}
  },
  beforeLaunch: () => {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    browser.waitForAngularEnabled(false)
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    // Run setup tests first
    require("./e2e/setup.e2e-spec")
  }
};
