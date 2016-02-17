# spaceship


## what is this?

spaceship is a reference design for interaction patterns in decentralised
cryptographically secure network spaces (cypherspaces).

the goal is to produce a design (and reference interface) that any cypherspace
should be able to provide for, and be measured against.

### why all this space junk?

space junk is [a real problem](https://en.wikipedia.org/wiki/Space_debris).

ok really, it's because deep space is a domain you imagine as drastically
different from where you are (at least at the time of this commit). space is a
new place, with new rules, which is good motivation to rethink things.

it's easier to imagine that if you can travel through space, you can imagine new
technologies and modes of interaction independent from earthbound
structure. fiction and fact about space are full of old and new ideas about
mechanisms and machinery. basic communication and interaction over astronomical
distances, without a governing central authority, are also imaginable as the
lifeblood of space-based society.

it's also a simple metaphor for judging approaches in the long-term. a
centralised communication system that finds ways of locking you and your data in
forever is like a black hole. an endless succession of non-interoperable
alternative networks and secure messaging systems resembles, in the extreme,
[an over-expanded universe where no one can talk to anyone else](https://en.wikipedia.org/wiki/Big_Rip)

and anyway, space is really cool.

### the design is abstract and confusing...

the goal is to design and build something extremely minimal and generic,
independent of underlying network structure. naturally this means something more
abstract than most assumptions brought in from every day life.

saying that, it should be useful--spaceship's design should lead you toward
relatable interactions and experiences. please feel welcome to submit an issue
or pull request if you think something is missing or needs changing.

## contents

- [spaceship-schema](./spaceship-schema.md): a document describing the basic
  building blocks of the design and how they relate.
- [spaceship-engines](./spaceship-engines.md): a document describing the basic
  "API-like" functions needed to realise the schema.
- [ ] TODO: a reference implementation of the above
