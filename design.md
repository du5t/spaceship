# design overview

## prior art comparison

continuing from the [rationale](./rationale.md)...

> cypherspace is a place whose entryways and underpinnings lie outside of
> monolithic server farms, name authorities, global singletons, or any other
> hierarchy dwarfing any of the people who visit or inhabit it. its limits are
> defined solely by the choices of those who work within it, and the consent of
> those around them.
 
> while all of this is great news, decentralisation, and the egalitarian agency
> that lies beyond it, can't be a purely network layer movement--it needs to
> happen at the application layer also. it needs to put people at its center.
 
in order to do this, we need to re-evaluate some old architectural assumptions.

### old assumptions: the "client-server" model

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

- *engines* instead of APIs
- *galaxies* instead of application stacks, server clusters, and other
  large-scale structure to provide data
- [*spaceships*](http://theartofanimation.tumblr.com/image/5781428741) (and
  their [bridges](https://images4.alphacoders.com/846/84604.jpg) and
  [cockpits](http://www.vehiclehi.com/Other_Vehicles/cockpit/black_prophecy_pc_dvd_rom_rkm_screenshot_03_tyi_cockpit_2560x1024_wallpaper_4142/download_1920x1200))
  instead of browsers or stack-bound "apps"

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
centralised one, with very little actual choice or agency, just a collection of
mostly profit-oriented
[dividuations](http://p2pfoundation.net/Dividuation). despite the apparent
quantity of services, the same sorts of betrayals and other abrupt changes occur
from platform to platform:

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
- tumblr
  [removing LGBT-related material](http://www.gaystarnews.com/article/tumblr-censors-gay-lesbian-and-bisexual-search-tags230713/)
  from search indexing
- an overall trend of
  "[bullshit minimalism](http://idlewords.com/talks/website_obesity.htm)"
  obscuring a swath of heavyweight, throwaway, "single page" javascript, written
  for the primary purpose of providing data to markup

in most of the above cases, basically the only recourse you have is to be a
complaining consumer. you're not even a customer, because you don't have a
paying arrangement (a condition for enfranchisement in a market-controlled
system). and anyway, making a lot of noise in the same chamber controlled by the
authority you're attempting to sway, or making insignificant consumption choices
at the mercy of whatever "app" is trendy at the moment, does nothing to actually
increase your agency in any way. worst of all, it reinforces a frame where
attention, oration, rhetoric, and other tactical expressions are the main tools
of change, where "social capital" is yet another resource to be accumulated.

it's worth it to mention that "network effects", a supposed driver of monolithic
centralised services, are meaningless at the scale of lived experience. (almost
by definition!) most of the hand-wringing over the market capture implied by
that concept is mostly a neurosis created by capital-dependent, winner-take-all
systems. "[you and yours](https://en.wikipedia.org/wiki/Friend_of_a_friend)" is
a good enough "market share" for a fully-lived experience. the options just
haven't been flexible or satisfying enough yet.

a healthy variety of interdependent but autonomous and discoverable networks of
communication that decouple global hierarchy and authority from capacity and
structure offers not only this flexibility, but also the recognition and agency
not afforded by centralised networks.


#### spacecraft v. browsers

to be honest, these days a browser is a cross between a
[television](https://thedissolve.com/features/movie-of-the-week/561-kill-your-television-before-it-kills-you/)
and a cold war european border. its default use-case is "consume content", and
getting data out of it for your own purposes (as opposed to transferring it to
another consumer outlet) is
[a complex process of organising scripts to avoid falling afoul of CSP, exfiltrating data through a URI, and parsing it once delivered to you](https://github.com/du5t/capsule). even
though you can see it and hear it through the browser window, you're not allowed
to make it yours (for your own protection).

sadly, this trend is continuing, with this conception of "browser" informing and
being informed by mobile phone operating systems, which are notoriously
difficult to actually create anything with. the two things they are best at are:

- spending your money
- feeding you poorly-directed and portioned streams of market-driven content

this trend leads all the way to "browser OS", most notably exemplified by
[chrome OS](https://en.wikipedia.org/wiki/Chrome_OS), where "local" data is
completely absent: the source of truth and matters of record is all located out
of your grasp. considering that under the current state of governance
[you are at the mercy of your remotely located identifying data](https://medium.com/phase-change/on-being-a-data-puppet-560e095373d5),
this is no way to live.

the other extreme is to abandon mediation altogether, and just use short,
transparent programs that handle data streams from the minimal interface of a
terminal located in a free operating system, as in the
[unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) and its
contemporary form, [suckless](https://www.suckless.org). this is actually less
intimidating than it appears: with tools like
[fish](https://fishshell.com/docs/current/tutorial.html), the "friendly
interactive shell", this kind of interaction is arguably already a
[conversational UI](https://medium.com/@tomazstolfa/the-future-of-conversational-ui-belongs-to-hybrid-interfaces-8a228de0bdb5),
marketing slogans aside.

but that extreme's just not going to work for everybody. not everyone wants to
[use emacs](http://www.emacsrocks.com), or
[assemble a plane from a kit](http://www.kitplanes.com/), or
[explore life as they would the parts of a motorcycle](https://en.wikipedia.org/wiki/Zen_and_the_Art_of_Motorcycle_Maintenance).

if data exists in a space, and it can be made navigable and free, then people
need a vehicle to do that safely with. they need a **spaceship**.

a **spaceship** is a coherent and unified collection of personal affordances
with you as its subject. your ship is code that you control. your ship is an
interface you can understand. your ship travels through a space that doesn't set
you up to win, lose, or control others.

a **spaceship** has privacy and safety on the inside. yes, outside of it is an
environment hostile to nearly all carbon-based life, with hazardous radiation
permeating it. and yes, if you spring a leak, the privacy goes right out. but
all of that is true already, and we're floating naked at the moment.

and in a spaceship, you can go *anywhere*.
