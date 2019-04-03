# File Conf Cache
A simple node js module that allows treating a local file as a configuration database.

This is done by making sure that every property read will efficiently check if the file is updated, if it is, the repository will be updated.


#### Usage:

````js
var fileConfCache = require('file-conf-cache');

// Init configuration:
const conf = fileConfCache('configuration.json')
//
Define a reader method:

function readerMethod(_, key){
    return _[key];
}

//read data
conf.getValue(readerMethod, 'somevalue')

````

##### Reader method

Reader method is left for the client to implment to allow functionalities such as default value:
````js
function readerMethod (_, key, defaultValue){
  return _[key] || defaultValue;
}

conf.getValue(readerMethod, 'non-existing', 'marak') == 'marak'

````

Or various other more complicated logic

