# spaceship


## what is this?

spaceship is a reference design for interaction patterns in decentralised
cryptographically secure network spaces (cypherspaces).

the goal is to produce a schematic (and reference interface) that yields
affordances that any cypherspace should be able to provide.

## contents

1. [rationale and motivation](./rationale.md)
2. [design overview](./design.md)
2. [spaceship-schema](./spaceship-schema.md): a document describing the basic
  building blocks of the design and how they relate.
3. [spaceship-engines](./spaceship-engines.md): a document describing the basic
  "API-like" functions needed to realise the schema.
4. [prototypical examples](#prototypicals)
5. roadmap: [engines+bridge](#roadmap)
6. [answers to questions](./faq.md)


## prototypicals

- [git-ssb](https://github.com/clehner/git-ssb)

in fact this is a very interesting example, because git itself is a tool for
producing different subjective views of a decentralised network of data!

- [tor browser]() (thru hidden services only)

for a complete prototype, see [the prototype doc (TODO)](#roadmap).

## roadmap

- [ ] reference engine implementations in:
    - [ ] scuttlebot
    - [ ] hyperdrive/swarmbot
    - [ ] onionspace/tor
    - [ ] hydra
    - [ ] orbit-db/ipfs
    - ??
- [ ] a reference visual interface:
  [spaceship-bridge](https://github.com/du5t/spaceship-bridge)
- [ ] a complete prototype doc
