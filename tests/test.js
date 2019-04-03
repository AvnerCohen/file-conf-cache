const fs = require('fs');
const fileConfCache = require('../');
const assert = require('assert');


var filePath = `${__dirname}/temp-data.json`;
var conf = fileConfCache(filePath, {})
var old_id = conf._id;

function readerMethod (_, key){
  return _[key];
}

assert.ok(conf._id, "Verify cache has a fingerprint version")
assert.equal(conf.getValue(readerMethod, 'number'), 123, "Make sure can read value from file")
assert.equal(conf._id, old_id, "Verify fingerprint is consistent")

// Setup change: touch file, reread data
fs.utimesSync(filePath, new Date(), new Date())
assert.equal(conf.getValue(readerMethod, 'text'), "a string", "Make sure can read string value from file")
// Done setup change
assert.notEqual(conf._id, old_id, "Verify fingerprint changes after file change")


// Test reader method with default variable
function readerMethod (_, key, defaultValue){
  return _[key] || defaultValue;
}

assert.equal(conf.getValue(readerMethod, 'non-existing', 'marak'), "marak", "Make sure reader function support defaults")
