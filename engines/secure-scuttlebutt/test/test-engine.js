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
  engine.createIdentifier(false, '/tmp/', function(err, newKey) {
      engine.destroyIdentifier(newKey.localPath, newKey.id, function(err) {
        t.notOk(err)
        engine.listIdentifiers('/tmp/', function(err, keys) {
          
          t.notOk(keys.find(key => key.id === newKey.id))
          t.end()
        })
      })
  })
})

