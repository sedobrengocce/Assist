require('babel-register');
const config = require('../../config');
const serverPath = require('selenium-server').path;
const webDriverChromeDriver = require('chromedriver').path;

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['frontend/test/e2e/specs'],
  output_folder: 'frontend/test/e2e/reports',
  custom_assertions_path: ['frontend/test/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: serverPath,
    host: '127.0.0.1',
    port: 4445,
    cli_args: {
      'webdriver.chrome.driver': webDriverChromeDriver,
    },
  },

  test_settings: {
    default: {
      selenium_port: 4445,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: `http://localhost:${process.env.PORT || config.dev.port}`,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
