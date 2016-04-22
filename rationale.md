# rationale

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
scraps (or sometimes for nothing at all) doing things like
[complete menial videogame tasks](), write
[articles mainly designed to steal attention](http://www.theguardian.com/media/2016/apr/10/twitter-ev-williams-medium-content-fast-food)
(often instead of actually informing),

this kind of network is not much of a space, and certainly not a safe space to
be. if it's any sort of space at all, it's like the railsea of
[china mieville's novel](https://en.wikipedia.org/wiki/Railsea): it approximates
an ocean, but all you can do is switch rails (and companies and governments are
out to put a price tag and patrol on every inch of it).

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

while all of this is great news, decentralisation, and the egalitarian agency
that lies beyond it, can't be a purely network layer movement--it needs to
happen at the application layer also. it needs to put people at its center.


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
- spacecraft instead of browsers or "apps"

#### engines v. APIs

recall an API is basically a public commitment by a service provider to do a
certain set of things if you give it the right request. usually this is "package
data", but since the results can range from "update record" to "audit this
human's state of mind" to "kill somebody", the whole "data" thing has gotten
loose from a purely informative conception. (and anyway, physicists recognise
this sort of distinction as purely conventional.)

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
profit-oriented [dividuations](http://p2pfoundation.net/Dividuation).

here are some examples:

- twitter architecture changes such as
  ["verified" profiles](http://anildash.com/2013/03/what-its-like-being-verified-on-twitter.html)
  and
  [algorithmic suggestions](http://www.forbes.com/sites/theopriestley/2016/02/06/twitters-algorithmic-timeline-switch-is-all-your-own-fault/#796e152331b6)
- facebook UI being used for
  [large-scale emotion manipulation experiments](https://www.theguardian.com/technology/2014/jun/30/facebook-emotion-study-breached-ethical-guidelines-researchers-say)
- snapchat failing to live up to
  [the privacy feature that constituted its sole offering](http://www.networkworld.com/article/2999980/security/snapchat-now-has-the-rights-to-store-and-share-selfies-taken-via-the-app.html)
- CDNs ghettoising requestors by
  [forcing them to perform repeated labor to view content if they come from a suspected VPN or Tor exit IP](https://trac.torproject.org/projects/tor/ticket/18361)
- an overall trend of
  "[bullshit minimalism](http://idlewords.com/talks/website_obesity.htm)"
  obscuring a swath of throwaway "single page" javascript, written for the
  primary purpose of providing data to markup

in most of the above cases, basically the only recourse you have is to be a
complaining consumer. you're not even a customer, because you don't have a
paying arrangement (a condition for enfranchisement in a market-controlled
system). and anyway, making a lot of noise in the same chamber controlled by the
authority you're attempting to sway, or making insignificant consumption choices
at the mercy of whatever "app" is trendy at the moment does nothing to actually
increase your agency in any way. worst of all, it reinforces a frame where
attention, oration, rhetoric, and other tactical expressions are the main tools
of change, where "social capital" is yet another resource to be accumulated.

it's worth it to mention that "network effects", a supposed driver of monolithic
centralised services, are meaningless at the scale of lived experience. (almost
by definition.) most of the hand-wringing over the market capture implied by
that concept is mostly a neurosis created by capital-dependent, winner-take-all
systems. "[you and yours](https://en.wikipedia.org/wiki/Friend_of_a_friend)" is
a good enough "market share" for a fully-lived experience. the options just
haven't been flexible or satisfying enough yet.


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
