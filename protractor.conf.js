// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    "e2e/src/Login/loginPage.e2e-specs.ts",
    "e2e/src/Dashboard/dashboardPage.e2e-specs.ts"

  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'https://nbs-qa.azurewebsites.net',
  // ignoreSynchronization: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function() {}
  },
  onPrepare() {
    // browser.waitForAngularEnabled(false)
    require('ts-node').register({
      project: require('path').join(__dirname, 'e2e/tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};