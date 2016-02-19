/*
 * 
 * sbot engine. allows a spaceship to travel the secure-scuttlebutt galaxy.
 * 
 */
var xdgBasedir    = require('xdg-basedir')
const subdirName  = 'spaceship/ssb'
var jsonfile      = require('jsonfile')
var VerEx         = require('verbal-expressions');
var parallel      = require('run-parallel')

var ssbClient     = require('ssb-client')
var ssbkeys       = require('ssb-keys')

/* 
 * pilot/spaceship functions 
 * 
*/
export function createIdentifierSync(ephemeral = false) {
  try {
    const newKey = ssbkeys.generate()
    if (!ephemeral) {
      const path = xdgBasedir.config
              .concat(subdirName)
              .concat(newKey.id)
              .concat('json')
      jsonfile.writeFileSync(path, newKey, {mode: '660'})
    }
    return newKey    
  } catch(err) {
    throw err
  }
}

export function createIdentifier(ephemeral = false, callback) {
  ssbkeys.create(function(err, newKey) {
    if (err) callback (err)
    else if (!ephemeral) {
      const path = xdgBasedir.config
              .concat(subdirName)
              .concat(newKey.id)
              .concat('.json')
      jsonfile.writeFile(path, newKey, {mode: '660'}, function(err) {
        if (err) callback(err)
        else callback(null, newKey)
      })
    }
    else callback(null, newKey)
  })
}

export function listIdentifiers(configPath, callback) {
  var path
  if (typeof configPath === string) path = configPath
  else path = xdgBasedir.config.concat(subdirName)
  const jsonEx = VerEx().find('.json').endOfLine()
  fs.readdir(path, function(err, files) {
    if (err) callback(err)
    const IDReaders = files
            .filter(function(fname) { return jsonEx.test(fname) })
            .map(function(jsonFile) { 
              return function(callback) {
                return jsonfile.readFile(jsonFile, callback)
              }
            })

    parallel(IDReaders, function(err, keys) {
      if (err) callback(err)
      else callback(null, keys)
    })
  })
}

export function destroyIdentifier() {
  // be careful testing this one! backup your IDs
}

export function entombData() {

}

export function importData() {

}

/*
 * record functions
 * 
 */
export function createRecord() {

}

export function editRecord() {

}

/*
 * orbital functions
 * 
 */
export function createOrbital() {

}

export function hailOrbital() {

}

export function viewOrbital() {

}

export function inviteTraveller() {

}

export function emigrateOrbital() {

}

export function deportResident() {

}

/*
 * galaxy functions
 * 
 */

export function enterGalaxy(keyLocation, botInfo) {
  /* ssb-client expects to have a scuttlebot running someplace it can reach. all
   interaction with it is through callbacks.

   this function in sbot's case is just for spinning up that child process, if
   there isn't one already.

   so we have three cases:

   1) bot not running -> start with with above key location and return process
   ref

   2) bot running, key location is different from running bot -> new identifier,
   so return a partial application (curry) of ssbClient that includes botInfo

   3) bot running, key location is empty -> default identifier; return ok

   for type/interface sanity this means we should return an object that
   describes which of these things happened, containing the return of above.

   TODO replace all of this with something like RPC on scuttlebot-views
   
   */
}

export function leaveGalaxy() {
  /* 
   following after above cases:

   1) bot was started in spaceship -> halt process, return ok

   2) bot running, plural keys -> ?? how does sbot treat this case?

   3) bot running independently, default key -> do nothing, spaceship never had
   control

   TODO replace as above with RPC on scuttlebot-views
   
   */

}
