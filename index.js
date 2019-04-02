const fs = require('fs');

module.exports = function fileConfCache(path, options) {
  const fileConfCacheObj = new FileConfCacher(path, options)
  fileConfCacheObj.reloader()
  return fileConfCacheObj;
}


function FileConfCacher(path, options) {
  this.path = path;
  this.options = options

  this._id = null;
  this.dataSet = null;

  this.reloader = function reloader(){
    this.dataSet =  JSON.parse(fs.readFileSync(this.path, 'utf8')),
    this._id = fs.statSync(this.path).mtimeMs
  }

  this.getValue = function getValue(readerMethod, value, ...theArgs){
    var current_id  = fs.statSync(path).mtimeMs;
    if (current_id != this._id){
      initData = this.reloader();
    }
    return readerMethod(this.dataSet, value, theArgs)
  }
}