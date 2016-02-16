# spaceship

## schema of spaces

### travelers, residents

travelers and residents pilot spaceships. they transmit sigils that identify
their crafts uniquely whenever they visit orbitals in different galaxies--but
they choose what to send and where to send it.

### records

a record is a semantically unified, sequenced data set that is useful to
spaceship pilots. it might be a message thread, a folder of data, or other
binary collection (like a music album).

key characteristics:

- created by orbital resident
- weakly unified ordering
- separation from other records in orbitals for ease of ordering/digestion

### orbitals

**orbitals** are space colonies.

**key characteristics:**

- they are protocol agnostic--any decentralised galaxy can support orbitals, as
  long as it allows travelers to travel, participate, and communicate in the
  above decentralised manner.
- any traveler can establish an orbital

**design concepts:**

- orbitals as space to be visited/accessed from
  [analogue: a hate story](http://ahatestory.com/)
- orbitals as existentially independent but communicatively collaborative space
  colonies, a la
  [iain banks' Culture novels](https://en.wikipedia.org/wiki/Orbital_(The_Culture))
  ([image 1](http://r.duckduckgo.com/l/?kh=-1&uddg=http%3A%2F%2Fwww.nss.org%2Fsettlement%2Fcalendar%2F2009%2FGoetzScheuermann-oneillcylinder-650.jpg))
  ([image 2](http://settlement.arc.nasa.gov/Kalpana/Kalpana-43-Aa2-1920.jpg))

### galaxies

galaxies are the main sources of mass (things that are interacted with by
spaceships) in the decentralised universe.

galaxies are maintained by decentralised electronic infrastructure (at least
when this draft was produced). if your infrastructure packs users into
centralised accounts, centralised activity, or prevents them from controlling
what spaces they inhabit and establish, it's not a galaxy--it's just a locked
chamber.

**key characteristics:**

- independence from centralised, terrestrial-bound and mapped networks
- cryptographic protections against out-of-galaxy actors
- no space-like borders: free entry to any spaceship

### spaceships

a spaceship is any networked device capable of galactic communication.

## communication models

### orbital

orbitals are made up of a specific set of recipients. they have many residents,
and each orbital can establish rules about how residency is granted.

communication on orbitals consists of messages that are threaded into records,
but other models and content-types can always be realised.

records are encrypted with either the public keys of (or record-specific keys
generated for) each resident.

#### orbital residency

the residents of an orbital can read any record posted to an orbital. they have
input to orbital policy, appearance, and can create logs.

#### "inviting-in"

drawing from
[CE 2010s western queer terminology]l(http://www.musedmagonline.com/2015/04/coming-semantics-reinforce-heterosexism-queer-people-color/),
a traveller (see below) may be invited in into the context or participatory
space of an orbital. in other words, they may be invited to some or all of the
records of an orbital. this involves one or more residents re-encrypting a
record (up to some quota) with the key of an invited traveller.

this matches the human practice of appending-only to memory, but not making past
records visible to new residents without affirmative consent and contextual
appropriateness.

an orbital may be set to invite any traveller in automatically; in this case
end-to-end encryption can be established, but the orbital is then simply
socially private, not technologically so.

### galaxy

spaceships may only be travelling one galaxy at a time, or otherwise limit the
amount of replication they do for each galaxy. in general, terrestrial topology
should not privilege galactic topology--every orbital's traffic should be
replicated by every other orbital if possible. in other words, discoverability
and replication should be coupled, even if messages are private to each orbital.

saying that, discoverability should also be manageable. orbitals may be
hyperlocal in some space; a spaceship should be able to travel from such
orbitals to others without replicating orbital-local traffic, if the orbital's
policy works that way.

examples of galaxies:

- ssb networks
- swarmlog rafts
- twister blockchains
