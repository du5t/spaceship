# spaceship engine spec

following the [schema](./spaceship-schema.md), a spaceship needs an engine to
travel a cypherspace galaxy. an engine is constructed from a set of functions
that realise the spaceship schema. this resembles an API. unlike an API though,
these requirements are not set out by a central server and presented to
clients--spaceships own their engines and builders may customise them as they
like.

what we present here is a limited set of functions a codebase should provide to
properly function as a spaceship engine. not all of these functions need
implementing on their own--many of them are easily realised as compositions.

remarks: all spaceship identifiers (public keys) must be signed with the
appropriate private key or similar attestation, for every request.

## engine spec

### pilot/spaceship internal functions

- createIdentifier
- listIdentifiers
- destroyIdentifier
- entombData
- importData

#### createIdentifier

- input: null
- output: a struct or hash of `private` and `public` keys

generates a keypair that can be used to identify the pilot to others.

#### destroyIdentifier

- input: a keypair id
- output: null

permanently destroys a keypair. Naturally, only the private key can actually be
destroyed, if the public key has seen any replication.

#### listIdentifiers

- input: null
- output: an enumerable of identifiers

lists the identifiers available to a spaceship for use.

#### entombData

- input: a pointer (or location string) addressing stored identifiers
- output: an encrypted block of data

encrypts a set of stored identifiers for out-of-universe export, deleting them
from storage.

#### importData

- input: a pointer (or location string) addressing an encrypted block of
  identifier data
- output: null

decrypts a set of stored identifiers and places them into the underlying
filesystem, and makes them available to `listIdentifiers()`.

#### notes

- assuming the hardware substrate is running something like windows/posix,
identifying data should be stored in
[XDG standard directories](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html).
- asymmetric-key cryptography is expected to be the most reliable form of
  identifier for the foreseeable future, but any implementation that combines a
  pilot's secret knowledge (i.e., a passphrase) with a robust stored secret (a
  private key) and a reusable public sigil (a public key) meets this spec.

### record functions

- createRecord
- editRecord

#### createRecord

- input: an enumerable of recipient keys, a record type, an array of record
  links, and serialised content.
- output: null

#### editRecord

- input: a link to a record to be edited, and serialised content.
- output: null

submits a record linked to an already-existing one.

throws an error if the existing record is not known to the spaceship.

#### notes

- a record link is just the key of a record, namely, a reference.
- by convention, an edit of zero-length can be interpreted as a record's
  deletion.
- any ship may submit record edits. how they are viewed and processed is up to
  interface convention--an orbital may establish itself as a wiki, and instruct
  spaceships to accept edits from any pilot. a spaceship may also unilaterally
  view different edits according to its own policies.

### orbital functions

- createOrbital
- hailOrbital
- viewOrbital
- inviteTraveller
- emigrateOrbital
- deportResident

#### createOrbital

- input: an informal name string, and a security policy descriptor. optionally,
  a list of invitees.
- output: an orbital record to be replicated

creates an orbital, with a unique key, name, and a description of its security
policy.

security policy descriptors may vary from galaxy to galaxy, but here is a
example set of keys:

- `announce`: boolean. controls whether or not a galaxywide broadcast of the new
  orbital is sent on creation or in response to hails. if this is false,
  spaceships will have to infer the existence of the orbital from traffic.
- `openResidency`: boolean. controls whether or not visitors are immediately added
  to the list of recipients upon hailing the orbital, or if they must be
  invited.
- `governmentType`: one of `"dictatorship"`, `"majority rule"`, or `"anarchy"`.
- `dictator`: keystring or null. if `governmentType` is `dictatorship`, this
  identifies the resident who sets policy.

#### viewOrbital

- input: an orbital identifier
- output: an enumerable of record keys

#### hailOrbital

- input: a signed spaceship identifier
- output: one of `"welcome"` or `"invitation required"`.

#### inviteTraveller

- input: a spaceship identifier signed with the key of a resident.
- output: null

#### emigrateOrbital

- input: a spaceship identifier signed with its own key.
- output: null

#### deportResident

- input: a resident identifier signed with the key(s) of the policy deciders of
  the orbital (see above)
- output: null

#### notes

- orbitals are just implicit collections of records, established by
  (cryptographically secured) recipient lists or just a single reference to an
  orbital.
- on the other hand, an orbital, like any other part of this schema, could be
  backed by (dedicated) replicators with their own policies. we hope that the
  space remains as flat as possible, but these structural effects should be
  recognised.
- a non-conforming engine build that does not obey `deportResident` calls is
  easily imagined. it is best not to rely on these types of functions.
- speaking generally, inviting a traveler to an orbital is implicitly allowing
  them to bring stowaways, by virtue of the fact that any spaceship can pass on
  messages, disobeying the security policy of the orbital. trust is, as it has
  always been, up to the people involved, not the machines they operate.
- orbitals, like IRC channels, rely on their residents to function as a space,
  regardless of structural circumstances. we expect communitarian anarchy to be
  the most stable form of orbital management.

### galaxy functions

#### enterGalaxy

- input: galaxy connection information, as a structure
- output: a stateful connection object

#### leaveGalaxy

- input: a connection object
- output: null

dereferences a galaxy connection object and halts replication activity.

#### notes

since cypherspace galaxies are nearly or totally topologically independent from
terrestrial space, a terrestrial connection is never needed to see a galaxy's
"past", that is, the store of galaxy data that has already been replicated onto
the local spaceship's hardware. likewise, galaxy data is not expected to be
deleted (at least, not consistently). both the concepts of "entering" and
"leaving" become dubious in this case, but we think they are schematically
useful.
