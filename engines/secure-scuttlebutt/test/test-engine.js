var tape      = require('tape')
var engine    = require('../engine')

function pluck(prop, arr) {
  return arr.map(item => item[prop])
}

tape.onFinish(function() { 
  process.exit(0)
})

tape('createIdentifier creates an ssb keypair', function(t) {
  t.plan(3)
  engine.createIdentifier(true, function(err, newKey) {    
    t.ok(newKey)
    t.ok(newKey.hasOwnProperty('private'))
    t.ok(newKey.hasOwnProperty('public'))
  })
})

tape('createIdentifier creates and saves ssb keypairs', function(t) {
  t.plan(3)
  engine.createIdentifier(false, '/tmp/', function(err, newKey) {
    t.ok(newKey)
    t.ok(newKey.hasOwnProperty('private'))
    t.ok(newKey.hasOwnProperty('public'))
  })
})

tape('listIdentifiers finds the local keypairs', function(t) {
  engine.createIdentifier(false, '/tmp/', function(err, newKey) {
    engine.listIdentifiers('/tmp/', function(err, keys) {
      t.ok(keys instanceof Array)
      keys.map(key => {
        t.ok(key.hasOwnProperty('public'))
        t.ok(key.hasOwnProperty('private'))
        t.ok(key.hasOwnProperty('id'))
      })
      t.end()
    })
  })
})

tape('destroyIdentifier destroys a key when its ID is passed', function(t) {
  t.plan(2)
  engine.createIdentifier(false, '/tmp/', function(err, newKey) {
      engine.destroyIdentifier(newKey.localPath, newKey.id, function(err) {
        t.notOk(err)
        engine.listIdentifiers('/tmp/', function(err, keys) {
          t.notOk(keys.find(key => key.id === newKey.id))
        })
      })
  })
})

tape('createRecord creates a record and brings it into the tree', function(t) {
  t.plan(2)
  engine.createRecord(null, 'post', null, { text:'test post' },
                      function(err, record) {
                        t.notOk(err)
                        t.ok(record)
                        t.end()
                      })
})



tape('viewRecord finds a record', function(t) {
  t.plan(3)
  engine.createRecord(null, 'post', null, 'test post', function(err, record) {
    engine.viewRecord(record.key, function(err, foundRecord) {
      t.notOk(err)
      t.ok(foundRecord)
      t.equal(foundRecord.id, record.id)
    })
  })
})

tape('editRecord takes a recordID and new content, submits a linked rev', function(t) {
  t.plan(3)
  engine.createRecord(null, 'post', null, 'test post', function(err, record) {
    engine.editRecord(record.value.links, record, null, 'test post edit', function(err, editedRecord) {
      // TODO: test against schema
      t.notOk(err)
      t.ok(editedRecord)
      t.equal(editedRecord.value.content.content, 'test post edit')
    })
  })
})

tape('createOrbital creates a new orbital record, publishes it openly when public', function(t) {
  t.plan(5)
  engine.createOrbital('test-orbital', [], null, true, function(err, record) {
    t.notOk(err)
    t.ok(record)    
    t.equal(record.value.content.type, 'orbital')
    t.ok(record.value.content.residents instanceof Array)
    // FIXME: this will fail i18n
    t.equal(record.value.content.content, 'Orbital test-orbital constructed!')
  })
})

tape('createOrbital produces an orbital record encrypted to self + invitees when private', function (t) {
  engine.createIdentifier(true, function(err, aliceKeys) {
    engine.createIdentifier(true, function(err, bobKeys) {
      engine.createIdentifier(true, function(err, cristaKeys) {
        const invitees = pluck('public', [aliceKeys, bobKeys, cristaKeys])
        
        engine.createOrbital('test-orbital2', invitees, null, false, function(err, record) {
          t.notOk(err)
          t.ok(record)
          // if encrypted, content will be cyphertext
          t.equal(typeof record.value.content, 'string')
          t.end()
        })
      })
    })
  })
})

tape('decryptRecord decrypts a record known to be addressed to self', function (t) {
  engine.createIdentifier(true, function(err, aliceKeys) {
    engine.createIdentifier(true, function(err, bobKeys) {
      engine.createIdentifier(true, function(err, cristaKeys) {
        const invitees = pluck('public', [aliceKeys, bobKeys, cristaKeys])
        
        engine.createOrbital('test-orbital2', invitees, null, false, function(err, record) {
          t.notOk(err)
          t.ok(record)
          // if encrypted, content will be cyphertext
          t.equal(typeof record.value.content, 'string')

          engine.decryptRecord(record, function(err, plaintextRecord) {
            t.notOk(err)

            t.ok(plaintextRecord)
            t.equal(plaintextRecord.type, 'orbital')
            t.ok(plaintextRecord.residents instanceof Array)
            // FIXME: this will fail i18n
            t.equal(plaintextRecord.content, 
                    'Orbital test-orbital2 constructed!')
            t.end()            
          })
        })
      })
    })
  })
})

tape('createRecord with orbital creates a privately addressed record', function(t) {  
  engine.createIdentifier(true, function(err, aliceKeys) {
    t.notOk(err)
    engine.createOrbital('test-orbital2', [aliceKeys.public],  null, true, function(err, orbitalRecord) {
      t.notOk(err)
      engine.createRecord(orbitalRecord, 'post', null, { text:'test post' }, function(err, record) {
        t.notOk(err)
        t.ok(record)
        // if encrypted, content will be cyphertext
        t.equal(typeof record.value.content, 'string')
        t.end()
      })
    })      
  })
})
 
tape('viewOrbital produces a list of messageRoots', function(t) {
  engine.createOrbital('test-orbital3', [], null, true, function(err, orbitalRecord) {
    t.notOk(err)
    engine.createRecord(orbitalRecord, 'post', null, { text:'test post' }, function(err, postRecord) {
      t.notOk(err)

      engine.viewOrbital(orbitalRecord.key, true, function(err, orbitalRecords) {
        t.notOk(err)
        t.ok(orbitalRecords)
        
        engine.decryptRecord(orbitalRecords[0], function(err, plaintextRecord) {
          t.notOk(err)
          var rec = orbitalRecord
          t.ok(plaintextRecord.links.map(link => link.link).includes(rec.key))
          t.end()
        })

      })
    })
  })
})

tape('hailOrbital sends a private message to its residents', function(t) {
  engine.createIdentifier(true, function(err, aliceKeys) {
    t.notOk(err)
    engine.createOrbital('test-orbital4', [aliceKeys.public],  null, true, function(err, orbitalRecord) {
      t.notOk(err)
      engine.hailOrbital(orbitalRecord, { text: 'hello' }, function(err, record) {
        t.notOk(err)
        t.ok(record)
        // if encrypted, content will be cyphertext
        t.equal(typeof record.value.content, 'string')
        engine.decryptRecord(record, function(err, plaintextRecord) {
          t.notOk(err)
          var rec = orbitalRecord

          t.deepEqual(plaintextRecord.recps, rec.value.content.residents)
          t.end()
        })
      })
    })      
  })
})

tape('inviteTraveller sends a private message to the inviting orbital\'s residents', function(t) {
  engine.createIdentifier(true, function(err, aliceKeys) {
    t.notOk(err)
    engine.createIdentifier(true, function(err, bobKeys) {
      t.notOk(err)
      engine.createOrbital('test-orbital4', [aliceKeys.public],  null, true, function(err, orbitalRecord) {
        t.notOk(err)
        engine.inviteTraveller(bobKeys.public, orbitalRecord, { text: 'introducing bob' }, function(err, record) {
          t.notOk(err)
          t.ok(record)
          // if encrypted, content will be cyphertext
          t.equal(typeof record.value.content, 'string')
          engine.decryptRecord(record, function(err, plaintextRecord) {
            t.notOk(err)
            var rec = orbitalRecord

            t.deepEqual(plaintextRecord.recps, rec.value.content.residents)
            t.end()
          })
        })
      })
    })
  })
})
 
tape('emigrateOrbital sends a private message to the leaving orbital\'s residents', function(t) {
  engine.createIdentifier(true, function(err, aliceKeys) {
    t.notOk(err)
    engine.createOrbital('test-orbital4', [aliceKeys.public],  null, true, function(err, orbitalRecord) {
      t.notOk(err)
      engine.hailOrbital(orbitalRecord, { text: 'bye' }, function(err, record) {
        t.notOk(err)
        t.ok(record)
        // if encrypted, content will be cyphertext
        t.equal(typeof record.value.content, 'string')
        engine.decryptRecord(record, function(err, plaintextRecord) {
          t.notOk(err)
          var rec = orbitalRecord

          t.deepEqual(plaintextRecord.recps, rec.value.content.residents)
          t.end()
        })
      })
    })
  })
})

tape('deportResident sends a private message to the leaving orbital\'s residents excepting the deportee', function(t) {
  engine.createIdentifier(true, function(err, aliceKeys) {
    t.notOk(err)

    engine.createIdentifier(true, function(err, bobKeys) {
      t.notOk(err)

      engine.createOrbital('test-orbital4', [aliceKeys.public, bobKeys.public],  null, true, function(err, orbitalRecord) {
        t.notOk(err)
        var residentsWithoutBob = orbitalRecord.value.content.residents.slice()
        residentsWithoutBob
          .splice(residentsWithoutBob.findIndex(recp => recp === bobKeys.public), 1)

        engine.deportResident(bobKeys.public, orbitalRecord, { text: 'bob is mean' }, function(err, record) {
          t.notOk(err)
          t.ok(record)
          // if encrypted, content will be cyphertext
          t.equal(typeof record.value.content, 'string')

          engine.decryptRecord(record, function(err, plaintextRecord) {
            t.notOk(err)
            t.deepEqual(plaintextRecord.recps, residentsWithoutBob)
            t.end()
          })
        })
      })
    })
  })
})
