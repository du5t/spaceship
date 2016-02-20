/*
 * 
 * misc utils
 * 
 */

var xdgBasedir    = require('xdg-basedir')
var ssbref        = require('ssb-ref')

export function resolveConfigPath(configPath, subdirName) {
  var path
  if (typeof configPath === 'string') path = configPath
  else path = xdgBasedir.config.concat(subdirName)
  return path
}

export function resolveDataPath(dataPath, subdirName) {
  var path
  if (typeof dataPath === 'string') path = dataPath
  else path = xdgBasedir.data.concat(subdirName)
  return path
}

// taken from ssb-msg-schemas
export function ssbLink (l) {
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