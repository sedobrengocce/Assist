// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// require('../../../../bin/www');

module.exports = {
  'Log In': (browser) => {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .pause(1000);

    browser.expect.element('body').to.be.present.before(1000);
    browser.expect.element('.MainContainer').to.be.present.before(5000);
    browser.expect.element('.Backdrop').to.have.attribute('class').which.not.contains('in');
    browser.expect.element('.Modal').to.have.attribute('class').which.not.contains('in');
    // eslint-disable-next-line
    browser.expect.element('.TopBar').to.be.present;
    browser.expect.element('.Title').text.to.contain('Assist 2');
    // eslint-disable-next-line
    browser.expect.element('.BodyWrapper').to.be.present;
    // eslint-disable-next-line
    browser.expect.element('.HomeContainer').to.be.present;
    browser.click('.SignInButton');
    browser.expect.element('.Backdrop').to.have.attribute('class').which.contains('in');
    browser.expect.element('.Modal').to.have.attribute('class').which.contains('in');
    browser.pause(1000);
    browser.setValue('input[type=text]', 'testuser');
    browser.setValue('input[type=password]', 'testBBcode');
    browser.click('.Button:first-of-type');
    browser.pause(3000);
    // eslint-disable-next-line
    // browser.expect.element('.HomeContainer').not.to.be.present;
    // eslint-disable-next-line
    // browser.expect.element('.PageContainer').to.be.present;
    browser.end();
  },
};
