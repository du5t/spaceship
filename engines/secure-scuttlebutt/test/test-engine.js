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

// tape('listIdentifiers finds the local keypairs', function(t) {
//   t.plan(3)
//   engine.createIdentifier(true, function(err, newKey) {    
//     t.ok(newKey)
//     t.ok(newKey.hasOwnProperty('private'))
//     t.ok(newKey.hasOwnProperty('public'))
//   })
// })