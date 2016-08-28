var tape      = require('tape')

var engine    = require('../engine')

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
                      })
})

// tape('createRecord with recipients creates a privately addressed record', function(t) {
//   t.plan(2)
//   engine.createRecord(null, 'post', null, { text:'test post' },
//                       function(err, record) {
//                         t.notOk(err)
//                         t.ok(record)
//                       })
// })


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

tape('createOrbital produces an encrypted orbital record sent only to invitees when private', function (t) {
  engine.createIdentifier(true, function(err, aliceKeys) {
    engine.createIdentifier(true, function(err, bobKeys) {
      engine.createIdentifier(true, function(err, cristaKeys) {
        const invitees = pluck('public', [aliceKeys, bobKeys, cristaKeys])
        
        engine.createOrbital('test-orbital2',
                             invitees, 
                             null, 
                             false, 
                             function(err, record) {
                               // FIXME: this is not coming up secret yet
                               t.notOk(err)
                               t.ok(record)
                               record.value.content.recps.map(recp => {
                                 t.ok(invitees.includes(recp))
                               })
                               t.equal(record.value.content.recps.length, 3)
                               t.equal(record.value.content.type, 'orbital')
                               // FIXME: this will fail i18n
                               t.equal(record.value.content.content, 
                                       'Orbital test-orbital2 constructed!')
                               t.end()
                             })

      })
    })
  })
})

tape('viewOrbital produces a list of messageRoots', function(t) {
  engine.createOrbital('test-orbital3', [], null, true, function(err, orbitalRecord) {
    engine.createRecord(orbitalRecord.key, 'post', null, { text:'test post' }, function(err, postRecord) {
      // NOTE: is there no way to make this better?
      engine.viewRecord(orbitalRecord.key, function(err, updatedOrbital) {
        t.notOk(err)
        var rec = orbitalRecord
        var post = postRecord
        debugger
        engine.viewOrbital(updatedOrbital.key, function(err, orbitalRecords) {
          t.notOk(err)
          t.ok(orbitalRecords)
        })
      })
    })
  })
})
