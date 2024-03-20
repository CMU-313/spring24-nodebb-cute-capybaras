const translator = require('../../src/translator');
const utils = require('../../src/utils');
const winston = require('winston');
const shim = require('../../src/translator');

const { Translator } = require('../../src/translator');


describe('Translator', function() {
  it('should throw an error if not passed a language', function() {
    expect(() => new Translator()).toThrow();
  });
});

describe('Translator shim', () => {
  it('should translate empty string correctly', (done) => {
    shim.translate("", 'en-GB', (translated) => {
      expect(translated).toBe("");
      done();
    });
  });
});
