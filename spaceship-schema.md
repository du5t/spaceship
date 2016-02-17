# spaceship

## schema

### travelers, pilots, residents

**key characteristics:**

- travelers are people (agnostic to embodiment)
- travelers operate spaceships
- travelers are identified by transmitted IDs (e.g. public keys) whose
  transmission they control

travelers and residents pilot spaceships. they transmit messages that identify
their crafts uniquely whenever they visit orbitals in different galaxies--but
they choose what to send and where to send it.

### spaceships

a spaceship is any networked device capable of galactic communication.

**key characteristics:**

- spaceships are the method by which travelers interact with cypherspace. they
  are the embodiment of a traveler
- spaceships have an obligation to relay or mirror records they receive to other
  parts of the galaxy.

**design concepts:**

- spaceships as vehicles of thought, as in
  [The Fountain](http://wallpoper.com/images/00/39/23/82/the-fountain_00392382.jpg)

### records

a record is a semantically linked, sequenced data set that is useful to
spaceship pilots. it might be a message thread, a folder of data, or media
collection (such as a music album).

**key characteristics:**

- created by an orbital resident
- unified by weak ordering
- weak separation from other records in orbitals for ease of ordering/digestion

**design concepts:**

- playlists (mixtapes, albums)
- message threads (conversations, diaries, notes)
- stores of treasure (curated files, libraries)
- acts of theater (monologues, dialogues, and so on)
- serialised and one-off productions (webcomics, video dramas, zines)

### orbitals

**key characteristics:**

- bounded, autonomous spaces of communication
- boundaries established through cryptographic measures
- policies available to modification by residents, if desired
- protocol agnostic
- no barrier to creation by any traveler

**orbitals** are space colonies. from an social standpoint, they serve as
bounded, autonomous territories. From an engineering standpoint, this simply
means that they are a set of autonomously determined recipients and policies for
communication.

an orbital's boundaries are established through cryptographic measures. by
default, records are encrypted with the public keys of, or keys generated from
the public keys of an orbital's residents.

these boundaries are under the control of residents--an orbital's creator
establishes the initial policies of an orbital, but may make them open to change
by the residents themselves.

orbitals are protocol agnostic--any decentralised galaxy can support orbitals,
as long as it allows travelers to travel them, participate, and communicate in
the above self-determined manner.

any traveler can establish an orbital, simply by propagating an identifier and
communicating a roster of invitees or residents. there is no barrier to
creation.

**design concepts:**

- orbitals as space of recorded communication to be visited/accessed, from
  [analogue: a hate story](http://ahatestory.com/)
- orbitals as nominally independent but communicatively collaborative space
  colonies, a la
  [iain banks' Culture novels](https://en.wikipedia.org/wiki/Orbital_(The_Culture))
  ([image 1](http://r.duckduckgo.com/l/?kh=-1&uddg=http%3A%2F%2Fwww.nss.org%2Fsettlement%2Fcalendar%2F2009%2FGoetzScheuermann-oneillcylinder-650.jpg))
  ([image 2](http://settlement.arc.nasa.gov/Kalpana/Kalpana-43-Aa2-1920.jpg))

### galaxies

**key characteristics:**

- independence from centralised, terrestrial-bound and mapped networks
- structural protections against out-of-galaxy actors, such as
  denial-of-service, attacks on protocols
- no essential topographic borders: free entry to any spaceship

galaxies are the main sources of mass (things that are interacted with by
spaceships) in the decentralised universe.

galaxies are maintained by decentralised electronic infrastructure (at least
when this draft was produced). it's worth clarifying what they are not: if your
infrastructure packs users into centralised accounts, centralised activity, or
prevents them from controlling what spaces they inhabit and establish, it's not
a galaxy--it's just a locked chamber.


## narratives of communication

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
a traveller (see below) may be **invited in** to the context or participatory
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

depending on use, spaceships might only travel one galaxy at a time, or
otherwise limit the amount of traffic they replicate for each galaxy. as a
general rule, terrestrial topology should not be privileged above galactic
topology--every orbital's traffic should be replicated by every other orbital
and spaceship if possible, regardless of stake, interest, or engagement with the
content. in other words, discoverability and replication should be coupled, even
if messages are private to each orbital.

saying that, discoverability should also be manageable. orbitals may be
hyperlocal in some space; a spaceship should be able to travel from such
orbitals to others without replicating orbital-local traffic, if the orbital's
policy works that way.

examples of galaxies:

- ssb networks
- swarmlog rafts
- twister blockchains
