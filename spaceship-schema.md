# spaceship

## schema

### travellers, pilots, residents

travellers are the people of cypherspace--its performative atoms.

**key characteristics:**

- travellers are people (agnostic to their particular embodiment)
- travellers operate spaceships
- travellers are identified by transmitted IDs (e.g. public keys) whose
  transmission they control through spaceships

travellers and residents pilot spaceships. they transmit messages that identify
their crafts uniquely whenever they visit orbitals in different galaxies--but
they choose what to send and where to send it.

### spaceships

a spaceship is any networked device capable of galactic communication.

**key characteristics:**

- spaceships are the method by which travellers interact with cypherspace. they
  are the embodiment of a traveler.
- spaceships have an obligation to relay or mirror records they receive to other
  parts of the galaxy.

**design concepts:**

- spaceships as vehicles of thought, as in
  [the fountain](http://wallpoper.com/images/00/39/23/82/the-fountain_00392382.jpg).
- spaceship as a traveller's creative personal space, as in
  [starbound](http://vignette2.wikia.nocookie.net/starboundgame/images/6/6f/Customizedship.png/revision/latest)
  (and many others).

### records, logs

a record is a semantically linked, sequenced data set that is useful to
spaceship pilots. it might be a message thread, a folder of data, or media
collection (such as a music album).

**key characteristics:**

- created by an orbital resident
- unified by weak ordering
- weak separation from other records in orbitals for ease of ordering/digestion

**design concepts:**

- rosters of orbital residents
- votes on orbital policy
- playlists (mixtapes, albums)
- message threads (conversations, diaries, notes)
- stores of treasure (curated files, libraries, source code repositories,
  databases in general)
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
communication. in other words, they are implicit stores of records.

an orbital's boundaries are established through cryptographic measures. by
default, records are encrypted with the public keys of, or keys generated from
the public keys of an orbital's residents.

these boundaries are under the control of residents--an orbital's creator
establishes the initial policies of an orbital, but may open them to change by
the residents themselves.

orbitals are protocol agnostic--any decentralised galaxy can support orbitals,
as long as it allows travellers to travel them, participate, and communicate in
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
- structural protections against out-of-galaxy (or universe) attacks, such as
  denial-of-service, attacks on protocols
- no essential topographic borders: free entry to any spaceship

galaxies are the main sources of mass (things that are interacted with by
spaceships) in the decentralised universe.

galaxies are maintained by decentralised electronic infrastructure (at least
when this draft was produced). it's worth stating clearly what they are not: if
your infrastructure packs users into centralised accounts, centralised activity,
or prevents them from controlling what spaces they inhabit and establish, it's
not a galaxy--it's just a locked chamber.

**design concepts:**

- the interlaced cities of
  [the city and city](https://en.wikipedia.org/wiki/The_City_%26_the_City)
- the asynchronous interstellar civilisations of
  [lockstep](http://boingboing.net/2014/03/27/lockstep-karl-schroeders-fi.html)

examples of galaxies:

- ssb networks
- swarmlog rafts
- twister blockchains
- freenet networks

### cypherspace

cypherspace is the observable universe of galaxies that can be traversed by
spaceships.

**design concepts:**

- the kriptosfear of iain banks'
  [feersum endjinn](https://en.wikipedia.org/wiki/Feersum_Endjinn)
- the posthuman editable universe of
  [transistor](https://en.wikipedia.org/wiki/Transistor_(video_game))

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
input to orbital policy, appearance, and can create records.

##### "inviting-in"

drawing from
[CE 2010s western queer terminology](http://www.musedmagonline.com/2015/04/coming-semantics-reinforce-heterosexism-queer-people-color/),
a traveller (see below) may be **invited in** to the context or performative
space of an orbital. in other words, they may be invited to some or all of the
past records of an orbital, and those occurring thereafter. this involves one or
more residents re-encrypting a record (up to some quota) with the key of an
invited traveller.

this matches the human practice of appending-only to memory, keeping past
records invisible to new residents without affirmative consent and contextual
fit.

an orbital may be set to invite any traveller in automatically; in this case
end-to-end encryption can be established, but the orbital is then simply
socially private, not technologically so.

### galaxy

depending on use, spaceships might only travel one galaxy at a time, or
otherwise limit the amount of traffic they replicate for each galaxy. as a
general rule, terrestrial topology should not be privileged above galactic
topology--every orbital's traffic should be replicated by every other orbital
and spaceship if possible, regardless of stake, interest, or engagement with the
content. in other words, discoverability and replication are coupled, even if
messages are private to (many or all) orbitals.

saying that, discoverability should also be manageable. orbitals may be
hyperlocal in some space (e.g., a city orbital); a spaceship should be able to
travel from such orbitals to others without committing to replicate all
orbital-local traffic.

galaxywide broadcasts are of course also possible, but unreliable at
best. experiments in the centralised internet outside of cypherspace have shown
them to be deeply problematic also.
