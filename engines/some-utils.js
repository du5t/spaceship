/*
 * 
 * misc utils
 * 
 */

var xdgBasedir    = require('xdg-basedir')
var ssbref        = require('ssb-ref')

exports.resolveConfigPath = function(configPath, subdirName) {
  // configPath is optional
  if (arguments.length === 1) {
    subdirName = configPath;
    configPath = undefined;
  }
  // subdirName is required
  if (typeof subdirName !== 'string') {
    throw new Error("app/engine subdirectory is required.")
  }

  var path
  if (typeof configPath === 'string') path = configPath
  else path = xdgBasedir.config.concat('/').concat(subdirName)
  return path
}

exports.resolveDataPath = function(dataPath, subdirName) {
  // configPath is optional
  if (arguments.length === 1) {
    subdirName = dataPath;
    dataPath = undefined;
  }
  // subdirName is required
  if (typeof subdirName !== 'string') {
    throw new Error("app/engine subdirectory is required.")
  }

  var path
  if (typeof dataPath === 'string') path = dataPath
  else path = xdgBasedir.data.concat('/').concat(subdirName)
  return path
}

// taken from ssb-msg-schemas
exports.ssbLink = function(l) {
  if (typeof l == 'string') {
    if (ssbref.isLink(l))
      return l
  }
  if (l && typeof l == 'object') {
    if (Object.keys(l).length === 1 && l.link && ssbref.isLink(l))
      return l
    return mlib.link(l)
  }
}