# spaceship


## what is this?

spaceship is a reference design for interaction patterns in decentralised
cryptographically secure network spaces (cypherspaces).

the goal is to produce a design (and reference interface) that any cypherspace
should be able to provide for, and be measured against.

## contents

- motivation
- [spaceship-schema](./spaceship-schema.md): a document describing the basic
  building blocks of the design and how they relate.
- [spaceship-engines](./spaceship-engines.md): a document describing the basic
  "API-like" functions needed to realise the schema.
- [ ] TODO: reference engine implementations in:
    - [ ] scuttlebot
    - [ ] swarmbot
    - [ ] tor
    - [ ] hydra
    - [ ] ipfs
    - ??

## motivation

### the ghost of cyberspace

the existing internet's not really space. it's not really a place you can
travel.

"the" internet, the one ruled by ICANN, a host of peering and consumer-facing ISPs  who play
resource games with each other, certificate 

this internet that is talked about these days is a small sliver of all of the
other things the initial decentralised network project is and was, even at that
time. that sliver used to be called the "world wide web". it is no longer
worldwide--it is balkanised and corporatised, it is regulated and stratified,
and its hierarchy is incredibly firm. you know that some things will be hidden
and some will be visible when you v

and that's just it--"the" internet, as it is now, is a collection of
financialised behemoths (not even metaphorically, this is the age of the server
farm) who package up code and content to serve to consumers. sometimes they're
"content creators", but they don't benefit the way an actual "creator"
might. this line was written in 2016 CE and we're still digital sharecropping.

even if you're not a marxist (or a telekommunist ;), you would probably like to
own what you create, right? this is literally a world where people work for
scraps (or sometimes for nothing at all) doing things like complete menial
videogame tasks, write articles mainly designed to steal attention (often
instead of actually informing),

this kind of network is not much of a space, and certainly not a safe space to
be. if it's any sort of space at all, it's like the railsea of china mieville's
novel: it approximates an ocean, but all you can do is switch rails (and
companies and governments are out to put a price tag and patrol on every inch of
it).

with the advent of increasingly decentralised, private, independent (in the
sense of capacity) communications, we've been given a chance to revisit the
conception of 'cyberspace' as a separate performative domain.

actually, you know what? scratch the 'authoritative' passive voice. here is what
happened: a bunch of really thoughtful people did an unbelievable amount of work
for free and gave it away honestly. that continuing work, in the form of
protocol designs, code, tests, server time, commentary, conversation, and jokes,
creates new spaces the way the internet did before existing social/economic
empires and edifices colonised it.

we've taken it calling it 'cypherspace', since cryptography is one of the
pillars on which it rests.

cypherspace is a place whose entryways and underpinnings lie outside of
monolithic server farms, name authorities, global singletons, or any other
hierarchy dwarfing any of the people who visit or inhabit it. its limits are
defined solely by the choices of those who work within it, and the consent of
those around them.

while all of this is great news, decentralisation, and the independence that
lies beyond it, can't be a purely network layer movement--it needs to happen at
the application layer also. it needs to put people at its center.


in order to do this, we need to re-evaluate some old architectural assumptions.


### old assumptions

what the "server" has to offer in the client-server model is meaningless in a
decentralised space. basically, a server only gets you a few things:

- uptime
- processing power
- packaged data (in other words, an API)
- a location (in some field or geography of reputation, throughput, legal
  regulation)

decentralised systems typically provide these to every person within them. the
actual requirements behind uptime (availability, eventual consistency) are
provided by asynchronous and aggressively egalitarian propagation protocols,
like gossip or torrent. processing power is provided by inexpensive
general-purpose hardware (notably, driven by open standards). typically, a
person who has guaranteed access to a computer has more computing power than
they can use.

the place of APIs, data packaging, and location in a decentralised space is the
exactly what the spaceship design aims to address.

in a spaceship, the components of the imbalanced client-server model that are
kept out of your control are transformed into components that sit inside your
spaceship.

- engines instead of APIs
- galaxies instead of application stacks, server clusters, and other large-scale
  structure
- spacecraft instead of browsers

#### engines v. APIs

recall an API is basically a public commitment by a service provider to do a
certain set of things if you give it the right request. usually this is "package
data", but since the results can range from "update record" to "audit this
human's state of mind" to "kill somebody", the whole "data" thing has gotten
loose from the purely informative conception. (and anyway, physicists recognise
this as a purely conventional distinction.)

but there's no provider in a decentralised space! there's just information in a
space, and you can either see it, or you can't. (and with an async request, you
can just plan to do whatever is needed in the eventuality.) moreover, what you
do with the information that's been shared with is honestly up to you.

in that case, what you need is some programming that moves you through data (or
moves data thru you ;). that's what an engine is. you may say "get me another
page of this", or you may say "warp 8 to the happening jams"; it's all about the
mechanisms you want to build in.

saying that, you can expect a fair number of common types and mechanisms to suit
a lot of needs, so, just like other vehicle engines, there will be mostly a
collection of standard configurations (themselves constructed of software
modules as usual), with a host of tweaks to get what you want out of them.


#### galaxies v. conventional resource space

as i mentioned in the motivation section, the network stack that runs "the
internet" is one of many sets of conventions and transmission media, and it is a
centralised one, with very little actual choice, just a collection of mostly
profit-oriented [dividuations](link here).

twitter architecture being contentious


in most of the above cases, basically the only recourse you have is to be a
complaining consumer. you're not even a customer, because you don't have a
paying arrangement (a condition for enfranchisement in a market-controlled
system). and anyway, making a lot of noise in the same chamber controlled by the
authority you're attempting to sway, or making insignificant consumption choices
at the mercy of whatever "app" is trendy at the moment does nothing to actually
increase your agency in any way.

it's not about "network effects". most of the hand-wringing over the implied
market capture is a neurosis created by capitalist winner-take-all
systems. you+your real friends is a good enough "market share" for anybody. the
options just haven't been good or flexible enough yet.


#### spacecraft v. browsers

to be honest, these days a browser is a cross between a television and a cold
war european border. its default use case is "consume content", and getting data
out of it for your own use (as opposed to sending it to another consumer outlet)
is a complex process of organising scripts to avoid falling afoul of CSP,
exfiltrating data through a URI, and parsing it once delivered to you. even
though you can see it and hear it through the browser window, you're not allowed
to make it yours (for your own protection).




a spacecraft has privacy and safety on the inside. yes, outside of it is an
environment hostile to nearly all carbon-based life, with crazy radiations going
everywhere. and yes, if you spring a leak, the privacy goes right out. but all
of that is true already.

and in a spaceship, you can go **anywhere**.

## prototypes and examples

- [git-ssb](https://github.com/clehner/git-ssb)

in fact this is a very interesting example, because git itself is a tool for
producing different subjective views of a decentralised network of data!

- [tor browser]() (thru hidden services only)

### why all this space junk?

space junk is [a real problem](https://en.wikipedia.org/wiki/Space_debris).

ok really, it's because deep space is a domain you imagine as drastically
different from where you are (at least at the time of this commit). space is a
new place, with new rules, which is good motivation to rethink things.

in other words, this is about **engineering safe communication spaces**, as free
from prior context as possible.

it's easier to imagine such things if you can travel through space. you can
imagine new technologies and modes of interaction compeltely independent from
earthbound structure.

fiction and fact about space are full of old and new ideas about technologies
and mechanisms. basic communication and interaction over astronomical distances,
without a governing central authority, are also imaginable as the lifeblood of
space-based society.

it's also a simple metaphor for judging approaches in the long-term. a
centralised communication system that finds ways of locking you and your data in
forever is like a black hole. on the other hand, an endless succession of
non-interoperable alternative networks and secure messaging systems resembles,
in the extreme,
[an expanding universe that eventually renders communication impossible](https://en.wikipedia.org/wiki/Big_Rip).

and anyway, space is really cool.

### the design is abstract and confusing...

the goal is to design and build something extremely minimal and generic,
independent of underlying network structure. naturally this means something more
abstract than most assumptions brought in from some the everyday life of some
particular set of people.

saying that, it should be useful--spaceship's design should lead you toward
relatable interactions and experiences. please feel welcome to submit an issue
or pull request if you think something is missing or needs changing.
