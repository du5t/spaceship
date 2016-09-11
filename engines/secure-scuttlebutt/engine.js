/*
 * sbot function  allows spaceship to travel the secure-scuttlebutt galaxy.
 * 
 */
'use strict'
var utils              = require('../some-utils')
const subdirName       = 'spaceship/ssb/'
var fs                 = require('fs')
var path               = require('path')
var jsonfile           = require('jsonfile')
var VerEx              = require('verbal-expressions')
var parallel           = require('run-parallel')
var uuid               = require('uuid')

var ssbClient          = require('ssb-client')
var ssbkeys            = require('ssb-keys')
var ssbMsgLib          = require('ssb-msgs')
var ssbref             = require('ssb-ref')
var patchworkThreadLib = require('patchwork-threads')


// set up ssb client so that the main thread doesn't get hit all the time
var appName = process.env.ssb_appname || 'spaceship_test'
var appKeys = ssbkeys.loadOrCreateSync(path.join(process.env.HOME, `.${appName}/secret`))
var appHost = process.env.ssb_host || 'localhost'
var appPort = process.env[`${appName}_port`] || 8009
var appManifest = JSON.parse(fs.readFileSync(path.join(process.env.HOME, `.${appName}/manifest.json`)))
var ssbOpts = { host: appHost, port: appPort, key: appKeys.id, manifest: appManifest }

/**
 * @namespace engine 
 * @prop {function} clientCall - internal access to sbot
 * @prop {function} createIdentifier - creates ship ID
 * @prop {function} listIdentifiers - lists available ship IDs
 * @prop {function} destroyIdentifier - permanently destroys ship ID
 * @prop {function} entombData - NOT IMPLEMENTED
 * @prop {function} importData - NOT IMPLEMENTED
 * @prop {function} createRecord - creates record
 * @prop {function} viewRecord - retrieves record
 * @prop {function} editRecord - revises record
 * @prop {function} createOrbital - creates **orbital** record
 * @prop {function} viewOrbital - retrieves **orbital** record
 * @prop {function} hailOrbital - sends greeting message to orbital
 * @prop {function} inviteTraveller - invites traveller into orbital subspace
 * @prop {function} emigrateOrbital - removes self from orbital subspace
 * @prop {function} deportResident - removes other from orbital subspace
 * @prop {function} enterGalaxy - NOT IMPLEMENTED
 * @prop {function} leaveGalaxy - NOT IMPLEMENTED
*/
var engine = {}

/**
 * weird function to call ssbClient more comfortably.
 *
 * should never be called directly, at least, i don't. here is what i do:
 * ```js
 * var ssbClientArgs = []
 * if (keypair) { ssbClientArgs.push(keypair) }
 * ssbClientArgs.push(publish)
 *
 * engine.clientCall.apply(this, ssbClientArgs)
 * ```
 * 
 * i know, weird. but it sort of makes me happy. and isn't that what javascript
 * is *really* about? (i joke.)
 *
 * @param {function} sbotCall - a function with the signature `(Error: err,
 * sbot: sbot)` that contains a procedure/call for the sbot client to execute,
 * and a callback reference to handle its result.
 * @returns {function} - sort of a closure with config params etc. as demanded
 * by `ssbClient`.
 * @memberof engine
*/
engine.clientCall = function(sbotCall) {
  return ssbClient(appKeys, ssbOpts, sbotCall)
}

/* 
 * pilot/spaceship functions
 * 
*/

/**
 * function creating a spaceship identifier (keypair).
 * @param {boolean} ephemeral - should the ID be ephemeral, or should it be
 * saved in the app config dir?
 * @param {string} path - path to the config directory where the key will be
 * located.
 * @param {function} callback - err-back called when the creation is done.
 * @memberof engine
*/
engine.createIdentifier = function(ephemeral, path, callback) {
  let basepath = ''
  if (typeof ephemeral === 'function') {
    callback = ephemeral
    ephemeral = false
  }
  if (typeof path === 'function') {
    callback = path
  } else if (typeof path === 'string') {
    basepath = path.concat(subdirName)
  } else {
    basepath = utils.resolveConfigPath(null, subdirName)
  }
  
  if (ephemeral) {
    callback(null, ssbkeys.generate('ed25519'))
  } else {
    const someUser = uuid.v4().concat('.json')
    const localPath = basepath.concat(someUser)
    ssbkeys.create(
      localPath, 'ed25519', function(err, newKey) {
        if (err) callback (err)
        else {
          callback(null, Object.assign(
            {}, newKey, { localPath }
          ))
        }
      })
  }
}

/**
 * function that lists the available local ship IDs.
 * @param {string} configPath - path to the application config.
 * @param {function} callback - err-back called with the IO result.
 * @memberof engine
*/
engine.listIdentifiers = function(configPath, callback) {
  // callback to do something with them
  const path = utils.resolveConfigPath(configPath, subdirName)
  const jsonEx = VerEx().find('.json').endOfLine()

  fs.readdir(path, function(err, files) {
    if (err) callback(err)
    else {
      const idFileNames = files
              .filter(function(fname) { return jsonEx.test(fname) })
              .map(function(jsonFile) {
                return function(callback) {
                  const localPath = path.concat(jsonFile)
                  return ssbkeys.load(localPath, function(err, newKey) {
                    if (err) callback (err)
                    else {
                      callback(null, Object.assign(
                        {}, newKey, { localPath }
                      ))
                    }
                  })
                }
              })
      parallel(idFileNames, function(err, keys) {
        if (err) callback(err)
        else callback(null, keys)
      })
    }
  })
}

/**
 * function for permanently destroying an ID.
 * @param {string} pathToKey - the path to the key itself
 * @param {number} id - the key's ID.
 * @param {function} errCallback - function to call if an IO error occurs
 * @throws {Error} - one of two non-IO errors: no key ID, or ID/keyfile
 * mismatch.
 * @memberof engine
*/
engine.destroyIdentifier = function(pathToKey, id, errCallback) {
  // be careful testing this one! backup your IDs
  // safety function that matches keypath to ID before deleting
  
  if (!id) throw new Error('no key ID passed.')
  ssbkeys.load(pathToKey, function(err, key) {
    if (err) errCallback(err)
    else if (key.id !== id) {
      throw new Error(
        'The keyfile you are trying to delete does not match the ID you gave.'
      )
    } else {
      fs.unlink(pathToKey, errCallback)
     }
  })
}

/**
 * function for freezing data (i.e., cryptographically). would probably involve
 * compression->encryption. **not implemented**
 * @memberof engine
*/
engine.entombData = function() {
  return null
}

/**
 * function for importing frozen data. reverse of `entombData()`.  **not
 * implemented**
 * @memberof engine
*/
engine.importData = function() {
  return null
}

/*
 * record functions
 * 
 * essentially the job of record functions is to map spaceship schema to galaxy
 * schema. see below for what that looks like
 * 
*/

/**
 * function for creating a record in the galaxy.
 * @param {string} orbital - The orbital the record belongs to.
 * @param {string} type - metadata describing the record type, i.e. "post",
 * "vote", etc.
 * @param {Array} links - array of ID strings, indicating other records this one
 * connects to in some way.
 * @param {string} content - the (serialised) content of the record.
 * @param {string} keypair - the ID keypair to use as the author of the record.
 * @param {function} callback - err-back to call when the record is created.
 * @memberof engine
*/
engine.createRecord = function(orbital, type, links, content, keypair, callback) {
  if (typeof keypair === 'function') {
    callback = keypair
    keypair = undefined
  }
  
  var ssbRecord = {}
  ssbRecord.type    = type
  ssbRecord.links   = links ? links : null
  ssbRecord.channel = orbital ? orbital.id : undefined
  ssbRecord.recps   = [appKeys.public]

  if (orbital) {
    if (orbital.value && orbital.value.content && orbital.value.content.residents) {
      ssbRecord.recps = ssbRecord.recps.concat(orbital.value.content.residents)
    } else {
      callback(
        new Error(
          `createRecord was passed a malformed orbital record: ${orbital}`))
    }
  }

  ssbRecord.content = content

  var publish = function (err, sbot) {
    if (err) callback(err)
    
    else if (orbital) {
      if (ssbRecord.recps.length === 1) {
        console.warn("warning: this orbital has no residents other than you, according to your records.")
      }
      // publish a message
      sbot.private.publish(ssbRecord, ssbRecord.recps, callback)
      // msg.key           == hash(msg.value)
      // msg.value.author  == your id
      // msg.value.content == { type: 'post', text: 'My First Post!' }
      // ...
    } else {
      sbot.publish(ssbRecord, callback)
    }
  }
  var ssbClientArgs = []
  if (keypair) { ssbClientArgs.push(keypair) }
  ssbClientArgs.push(publish)

  engine.clientCall.apply(this, ssbClientArgs)
}

/**
 * function to retrieve a record.
 * @param {string} recordID - ID of the record to retrieve.
 * @param {function} callback - err-back to be called with the result.
 * @memberof engine
*/
engine.viewRecord = function(recordID, callback) {
  // TODO: refactor this
  var view = function (err, sbot) {
    if (err) callback(err)    
    else {
      sbot.get(recordID, function(err, record) {
        if (err) callback(err)
        else if (typeof record.content === 'string') {
          // private msg case
          engine.decryptRecord(record, callback)  
        } else {
          callback(null, record)
        }      
      })       
    }
  }
  var ssbClientArgs = []
  ssbClientArgs.push(view)

  engine.clientCall.apply(this, ssbClientArgs)
}

/**
 * function to decrypt a record if encrypted.
 * @param {object} record - a well-formed scuttlebot record.
 * @param {function} callback - err-back to be called with the result.
 * @memberof engine
 */
engine.decryptRecord = function(record, callback) {
  var decrypt = function (err, sbot) {
    if (err) callback(err)
    else if (record && record.value && record.value.content) { 
      sbot.private.unbox(record.value.content, callback)
    } else {
      callback(
        new Error(
          `decryptRecord was passed a malformed record: ${JSON.stringify(record)}`))
    }
  }
  var ssbClientArgs = []
  ssbClientArgs.push(decrypt)
  
  engine.clientCall.apply(this, ssbClientArgs)
}

/**
 * function to edit a record. produces a new record linking back to the record
 * it revises, according to ssb schema.
 *
 * for the record, here is that schema:
 *
 * `{ type: 'post-edit', text: String, root: MsgLink, revisionRoot: MsgLink, revisionBranch: MsgLink, mentions: Links }`
 *
 * @param {array} links - an array of record IDs this record links to, as in a
 * usual record.
 * @param {object} origMsg - the original record to revise.
 * @param {string} revisionID - the ID of the record to revise. can be null.
 * @param {string} revisionContent - the revised content
 * @param {function} callback - err-back to call with the resulting record.
 * @memberof engine
*/
engine.editRecord = function(links, origMsg, revisionID, revisionContent, callback) {
  var ssbRecord = {}
  ssbRecord.type            = 'post-edit'
  ssbRecord.links           = { links }
  ssbRecord.revisionBranch |= utils.ssbLink(origMsg.key)
  ssbRecord.channel         = origMsg.value.channel
  ssbRecord.recps           = origMsg.value.recps
  ssbRecord.content         = revisionContent

  if (origMsg.value.content.type === 'post-edit') {
    ssbRecord.revisionRoot = origMsg.value.content.revisionRoot
  } else {
    ssbRecord.revisionRoot = utils.ssbLink(origMsg.key)
  }

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

/**
 * function to create an orbital record.
 * @param {string} name - the name of the orbital.
 * @param {Array} invitees - an array of invitee ID strings.
 * @param {object} agreement - currently unused. points at a policy record which
 * indicates what agreements the orbital residents follow.
 * @param {boolean} announce - whether to publicly announce orbital creation. if
 * false, invitees will receive private messages from the orbital creator only.
 * @param {function} callback - err-back to handle the resulting orbital.
 * @memberof engine
*/
engine.createOrbital = function(name, invitees, agreement, announce, callback) {
//  const { announce, openResidency, governmentType, dictator } = agreement
  var ssbOrbital = {}
  ssbOrbital.content     = 'Orbital '.concat(name).concat(' constructed!')
  ssbOrbital.channel     = name
  ssbOrbital.residents   = invitees.includes(appKeys.public) ? 
    invitees : invitees.concat(appKeys.public)

  ssbOrbital.type        = 'orbital'
  ssbOrbital.agreement   = agreement

  if (announce === undefined || announce === true) {
    // publicly discoverable case--leave a replicable record
    ssbClient(function (err, sbot) {
      if (err) callback(err)
      
      // publish a message
      sbot.publish(ssbOrbital, callback)
    })    
  } else {
    // manifest the orbital as a mere list of recipients
    ssbOrbital.agreement  = agreement

    ssbClient(function (err, sbot) {
      if (err) callback(err)

      else sbot.private.publish(ssbOrbital, ssbOrbital.residents, callback)
    })
  }
}

/**
 * function to collect a digest of records rooted in an orbital.
 * @param {string} orbitalID - ID of the orbital record.
 * @param {boolean} fetchActual - whether or not to insist on the actual record,
 * not just the ID
 * @param {function} callback - err-back to handle the result.
 * @memberof engine
*/
engine.viewOrbital = function(orbitalID, fetchActual, callback) {
  /* 
   * fetches all of the record heads in an orbital for easy viewing
   * 
   */
  if (typeof fetchActual === 'function') {
    callback = fetchActual
    fetchActual = false
  }
  
  function makeGetter(fetchActual, callback) {
    return function(err, orbitalWithRelated) {
      if (err) { callback(err) }
      else if (!Object.hasOwnProperty(orbitalWithRelated)) {
        callback(
          new Error(`relatedMessages didn't get anything for this orbital.`))
      } else {
        var recordIDGetters = orbitalWithRelated.related
              .filter(function (relatedMsg) {
                return relatedMsg.content.value.type === 'record'
              })
              .map(function(relatedRecord) {
                return function(callback) {
                  ssbClient(function(err, sbot) {
                    if (err) { callback(err) }
                    else { patchworkThreadLib.fetchThreadRootID(sbot, relatedRecord, callback) }
                  })
                }
              })
        
        parallel(recordIDGetters, function(err, rootIDs) {
          if (err) callback(err)
          else {
            const uniqIDs = new Set(rootIDs.slice())
            // get message for each
            
            if (fetchActual) {
              const recordRootGetters = uniqIDs.map(function(recordID) {
                return function(callback) {
                  ssbClient(function(err, sbot) {
                    sbot.get(recordID, callback)
                  })
                }
              })
              
              parallel(recordRootGetters, function(err, roots) {
                if (err) callback(err)
                else { 
                  callback(null, roots.sort(function(msg1, msg2) {
                    // sort ascending by date
                    return msg1.value.timestamp < msg2.value.timestamp
                  }))
                }
              })
            } else {
              callback(null, uniqIDs)
            }
          }
        })
      }    
    }
  }
  
  const getRelatedIDs = makeGetter(fetchActual, callback)

  ssbClient(function(err, sbot) {
    sbot.relatedMessages(
      {id: orbitalID, count: true}, getRelatedIDs)
  })
}

/**
 * function to contact the orbital 'from the outside'. allows interactions like
 * asking for an invite.
 * @param {object} orbital - the (ideally) latest record describing the orbital.
 * @param {string} intro - the body of the hail.
 * @param {function} callback - err-back for the result.
 * @memberof engine
*/
engine.hailOrbital = function(orbital, intro, callback) {
  /* in ssb's case, it seems good enough to hit everyone in the orbital with a
   * hail message
   * 
   * only works on discoverable orbitals (for good reason), or orbitals whose id
   * you know
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

/**
 * function to invite a traveller to an orbital.
 * @param {string} traveller - the ID of the traveller.
 * @param {string} orbital - the (ideally) latest record describing the orbital.
 * @param {string} intro - a message introducing the traveller.
 * @param {function} callback - err-back containing the resulting record or
 * error.
 * @memberof engine
*/
engine.inviteTraveller = function(traveller, orbital, intro, callback) {
  var invite     = {}
  invite.type    = 'invite'
  invite.recps   = orbital.residents
  invite.content = intro

  ssbClient(function (err, sbot) {
    if (err) callback(err)
    
    else sbot.publish(invite, callback)
  })
}

/**
 * function announcing permanent exit from an orbital. works like a hail.
 * @param {string} orbital - the (ideally) latest record describing the orbital.
 * @param {string} outro - body containing a farewell message or such.
 * @param {function} callback - err-back called on the resulting record or
 * error.
 * @memberof engine
*/
engine.emigrateOrbital = function(orbital, outro, callback) {
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

/**
 * function [r]ejecting an orbital member from an orbital.
 * @param {string} traveller - an ID pointing at a traveller.
 * @param {object} orbital - the (ideally) latest record describing the orbital.
 * @param {string} justification - body of the [r]ejection record.
 * @param {function} callback - err-back called with the resulting record or
 * error.
 * @memberof engine
*/
engine.deportResident = function(traveller, orbital, justification, callback) {
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

/**
 * **not implemented yet**
 *
 * ssb-client expects to have a scuttlebot running someplace it can reach. all
 * interaction with it is through callbacks.
 *
 * this function in sbot's case is just for spinning up that child process, if
 * there isn't one already.
 *
 * so we have three cases:
 *
 * 1) bot not running -> start with with above key location and return process
 * ref
 *
 * 2) bot running, key location is different from running bot -> new identifier,
 * so return a partial application (curry) of ssbClient that includes botInfo
 *
 * 3) bot running, key location is empty -> default identifier; return ok
 *
 * for type/interface sanity this means we should return an object that
 * describes which of these things happened, containing the return of above.
 *
 * TODO replace all of this with something like RPC on scuttlebot-views
 * @param {string} keyLocation - path to spaceship identifier.
 * @param {object} botInfo - object containing appropriate info to run sbot.
 * @memberof engine
*/
engine.enterGalaxy = function(keyLocation, botInfo) {

//  if (botInfo )

}

/**
 * **not implemented yet**
 *
 * following after above cases:
 *
 * 1) bot was started in spaceship -> halt process, return ok
 * 
 * 2) bot running, plural keys -> ?? how does sbot treat this case?
 *
 * 3) bot running independently, default key -> do nothing, spaceship never had
 * control
 *
 * TODO replace as above with RPC on scuttlebot-views 
 *
 * @param {object} childProc - reference pointing to the child process that
 * connects to ssb galaxy.
 * @param {string} shipID - ID of the connected ship ID, if there is more than
 * one (i.e., multiplexing case)
 * @memberof engine
*/
engine.leaveGalaxy = function(childProc, shipID) {
  if (typeof childProc !== undefined) {
    
  } else if (typeof shipID !== undefined) {

  } else {
    
  }
}

module.exports = engine;
