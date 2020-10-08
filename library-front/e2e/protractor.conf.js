const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './src/**/*.e2e-spec.ts',
    // './src/author/author-edit.component.e2e-spec.ts',
    // './src/book/book-edit.component.e2e-spec.ts',
    // './src/author/author-list.component.e2e-spec.ts',
    // './src/book/book-list.component.e2e-spec.ts',
    // './src/book/book-master-detail.component.e2e.ts',
    './src/author-book/author-book.component.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      'args': ['--start-maximized']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    let globals = require('protractor');
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    globals.by.addLocator('formControlName', function (formName, optParentElement, optRootSelector) {
      let using = optParentElement || document.querySelector(optRootSelector) || document;
      return using.querySelector(`[formControlName=${formName}]`);
    });
  }
};
