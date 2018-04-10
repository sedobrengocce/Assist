const readFile = require('fs').readFileSync;
const resolvePath = require('path').resolve;

const credential = JSON.parse(readFile(resolvePath('frontend', 'test', 'e2e', 'credential.env'), 'utf8'));

module.exports = credential;
