// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
// var HtmlReporter = require('protractor-beautiful-reporter');
// var VideoReporter = require('protractor-video-reporter');
// var Path = require('path');

exports.config = {
  allScriptsTimeout: 11000,
  restartBrowserBetweenTests: true,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
        // args: ["disable-infobars", "--start-maximized", "--window-size=1630,963"]
        args: ["--headless"]

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
    // jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    // jasmine.getEnv().addReporter(new HtmlReporter({
    //   baseDirectory: 'e2e-report/htmlReporter',
    //   takeScreenShotsOnlyForFailedSpecs: true,
    //   preserveDirectory: false,
    //   jsonsSubfolder: 'jsons'

    // }).getJasmine2Reporter());
    // jasmine.getEnv().addReporter(new VideoReporter({
    //   baseDirectory: Path.join(__dirname, 'e2e-report/videoReporter/videos/'),
    //   singleVideo: false,
    //   singleVideoPath: (result) => {
    //     const fileName = result.fullName.trim().split(' ').join('-')
    //     return fileName + '.mov';
    //   }
    // }));

    // Run setup tests first
    require("./e2e/setup.e2e-spec")
  }
};
