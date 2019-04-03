const fs = require('fs');
const fileConfCache = require('../');
const assert = require('assert');


var filePath = `${__dirname}/temp-data.json`;
var conf = fileConfCache(filePath, {})
var old_id = conf._id;

function readerMethod (_, key){
  return _[key];
}


test('Verify cache has a fingerprint version', () => {
  expect(conf._id).not.toBe(null);
});

test('Can read value from file', () => {
  expect(conf.getValue(readerMethod, 'number')).toBe(123);
});

test('fingerprint is consistent', () => {
  expect(conf._id).toBe(old_id);
});

test('Change in file to change fingerprint', () => {
  fs.utimesSync(filePath, new Date(), new Date())
  expect(conf.getValue(readerMethod, 'text')).toBe("a string");
  expect(conf._id).not.toBe(old_id);
});

test('Reader with default value', () => {
  function readerMethod (_, key, defaultValue) {
    return _[key] || defaultValue[0];
  }
  expect(conf.getValue(readerMethod, 'non-existing', 'marak')).toBe('marak');
});

