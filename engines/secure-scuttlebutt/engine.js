/*
 * 
 * sbot engine. allows a spaceship to travel the secure-scuttlebutt galaxy.
 * 
 */

var utils         = require('./some-utils')
const subdirName  = 'spaceship/ssb'
var fs            = require('fs')
var jsonfile      = require('jsonfile')
var VerEx         = require('verbal-expressions')
var parallel      = require('run-parallel')

var ssbClient     = require('ssb-client')
var ssbkeys       = require('ssb-keys')
var ssbMsgLib     = require('ssb-msgs')
var ssbref        = require('ssb-ref')

/* 
 * pilot/spaceship functions
 * 
*/
export function createIdentifierSync(ephemeral = false) {
// don't depend on sync fallbacks, i might just scrap them
  try {
    const newKey = ssbkeys.generate()
    if (!ephemeral) {
      const path = utils.resolveConfigPath(null, subdirName)
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
      const path = utils.resolveConfigPath(null, subdirName)
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
  // callback to do something with them
  const path = utils.resolveConfigPath(configPath, subdirName)
  const jsonEx = VerEx().find('.json').endOfLine()
  fs.readdir(path, function(err, files) {
    if (err) callback(err)
    const idFileNames = files
            .filter(function(fname) { return jsonEx.test(fname) })
            .map(function(jsonFile) { 
              return function(callback) {
                return jsonfile.readFile(jsonFile, callback)
              }
            })

    parallel(idFileNames, function(err, keys) {
      if (err) callback(err)
      else callback(null, keys)
    })
  })
}

export function destroyIdentifier(configPath, id, errCallback) {
  // be careful testing this one! backup your IDs
  const path   = utils.resolveConfigPath(configPath)
  const jsonEx = VerEx().find(id.concat('.json')).endOfLine()
  fs.readdir(path, function(err, files) {
    if (err) errCallback(err)
    const idFile = files.find(function(fname) { return jsonEx.test(fname) })
    fs.unlink(idFile, errCallback)
  }
}

export function entombData() {
  
}

export function importData() {
  
}

/*
 * record functions
 * 
 * essentially the job of record functions is to map spaceship schema to galaxy
 * schema. see below for what that looks like
 * 
 */
export function createRecord(orbital, type, links, content, callback) {
  var ssbRecord = {}
  ssbRecord.type    = type
  ssbRecord.links   = { links }
  ssbRecord.channel = orbital.id
  ssbRecord.recps   = orbital.residents
  ssbRecord.content = content

  ssbClient(function (err, sbot) {
    if (err) callback(err)
    
    // publish a message
    sbot.publish(ssbRecord, callback)
      // msg.key           == hash(msg.value)
      // msg.value.author  == your id
      // msg.value.content == { type: 'post', text: 'My First Post!' }
      // ...
    
  })
}

export function editRecord(links, origMsg, revision, callback) {
  var ssbRecord = {}
  ssbRecord.type     = 'post-edit'
  ssbRecord.links    = { links }
  ssbRecord.revision = utils.ssbLink(origMsg.key)
  ssbRecord.channel  = origMsg.value.channel
  ssbRecord.recps    = origMsg.value.recps
  ssbRecord.content  = origMsg.value.content

  ssbClient(function (err, sbot) {
    if (err) callback(err)
    
    else sbot.publish(ssbRecord, callback)
      // msg.key           == hash(msg.value)
      // msg.value.author  == your id
      // msg.value.content == { type: 'post', text: 'My First Post!' }
      // ...
    
  })
}

/*
 * orbital functions
 * 
 */
export function createOrbital(name, invitees, policy, callback) {
  const { announce, openResidency, governmentType, dictator } = policy
  var ssbOrbital = {}
  if (announce === undefined || announce === true) {
    // publicly discoverable case--leave a replicable record
    ssbOrbital.type        = 'orbital'
    ssbOrbital.channel     = name
    ssbOrbital.residents   = invitees
    ssbOrbital.policy      = policy
    ssbOrbital.content     =
      'Orbital '.concat(name)
                .concat(' has been constructed! You are now a resident, which')
                .concat(' means you can view its records.')
    
    ssbClient(function (err, sbot) {
      if (err) callback(err)
      
      // publish a message
      sbot.publish(ssbOrbital, callback)
    })    
  } else {
    // manifest the orbital as a mere list of recipients
    ssbOrbital.type    = 'post'
    ssbOrbital.channel = name
    ssbOrbital.recps   = invitees
    ssbOrbital.policy  = policy
    ssbOrbital.content =
      'Orbital '.concat(name)
                .concat(' has been constructed! You are now a resident, which')
                .concat(' means you can view its records.')
    
    ssbClient(function (err, sbot) {
      if (err) callback(err)
      
      else sbot.publish(ssbOrbital, callback)
    })
  }
}

export function viewOrbital(orbitalID, callback) {
  /* 
   * fetches all of the record heads in an orbital for easy viewing
   * 
   */

  
}

export function hailOrbital(orbital, intro, callback) {
  /* in ssb's case, it seems good enough to hit everyone with a hail message
   * 
   * only works on discoverable orbitals (for good reason)
   */
  var hail     = {}
  hail.type    = 'hail'
  hail.recps   = orbital.residents
  hail.content = intro
  
  ssbClient(function (err, sbot) {
    if (err) callback(err)
    
    else sbot.publish(hail, callback)
  })
}

export function inviteTraveller(traveller, orbital, intro, callback) {
  var invite     = {}
  invite.type    = 'invite'
  invite.recps   = orbital.residents
  invite.content = intro

  ssbClient(function (err, sbot) {
    if (err) callback(err)
    
    else sbot.publish(invite, callback)
  })
}

export function emigrateOrbital(orbital, outro, callback) {
  /* leave a message letting all the other ships in the orbital know you're
   * leaving, so they can strip your ID from traffic
   * 
   */
  var farewell     = {}
  farewell.type    = 'emigration'
  farewell.recps   = orbital.residents
  farewell.content = outro
  
  ssbClient(function (err, sbot) {
    if (err) callback(err)
    
    else sbot.publish(farewell, callback)
  })
}

export function deportResident(traveller, orbital, justification, callback) {
  var rejection     = {}
  rejection.type    = 'rejection'
  rejection.recps   = orbital.residents
  rejection.content = justification

  ssbClient(function (err, sbot) {
    if (err) callback(err)
    
    else sbot.publish(rejection, callback)
  })
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
