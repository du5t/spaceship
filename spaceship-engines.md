# spaceship engine spec

following the [schema](./spaceship-schema.md), a spaceship needs an engine to
travel a cypherspace galaxy. an engine is constructed from a set of functions
that realise the spaceship schema. this resembles an API. unlike an API though,
these requirements are not set out by a central server and presented to
clients--spaceships own their engines and builders may customise them as they
like.

what we present here is a limited set of functions a codebase should provide to
properly function as a spaceship engine. not all of these functions need
implementing on their own--many of them are easily realised as
compositions.

## engine spec

### pilot/spaceship internal functions

- createIdentifier
- destroyIdentifier
- exportData/entombData

### record functions

- createRecord
- editRecord

### orbital functions

- createOrbital
- viewOrbital
- sendIdentifier/hailOrbital
- inviteTraveler
- abandonResidency/emigrateOrbital
- deportResident

#### notes

- a non-conforming engine build that does not obey `deportResident` calls is
  easily imagined. it is best not to rely on these types of functions.
- speaking generally, inviting a traveler to an orbital is implicitly allowing
  them to bring stowaways, by virtue of the fact that any spaceship can pass on
  messages. trust is, as it has always been, up to the people involved, not the
  machines they operate.

### galaxy functions

- enterGalaxy
- leaveGalaxy/disconnectGalaxy
