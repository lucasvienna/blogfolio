---
title: Empire - Part 2
description: Axum and REST APIs, backed by Diesel
date: "2025-11-08"
categories:
  - rust
  - empire
  - api
published: false
---

It's been a while since I last wrote in this blog. Empire has grown massively since then; the server
now supports constructing and upgrading buildings, and resource generation, accumulation and
collection—all backed by a powerful modifier system. I also decided to roll out my own auth. Yes,
"never roll out your own auth", I've heard it before. But how else to learn, other than to
experiment and get my hands dirty? Same reason I tried writing a binary protocol, really.

When I started the project, most of my backend knowledge came from writing Java services in
classical Spring Boot fashion: DTOs, DAOs, repositories, services, controllers, etc. Think the
standard Spring Initializer experience with a package structure following layers. Other than Spring
Boot, my previous experiences with backend application frameworks could be boiled down to some PHP
(not a fan) or Nest.js, which is just a discount version of Spring for Node, and follows many of the
same patterns and design choices.

Despite my best efforts to write idiomatic Rust, my background clearly biased me towards some design
choices that were indeed _not_ idiomatic. Let's take the repository pattern as an example: structs
aren't classes, and traits are not interfaces, for all they look alike.

> Here I paused to think about this distinction and to mull over how I think about these concepts.
> This thinking lead me to research and read about this topic, which eventually lead to a happy
> realisation.

While writing this I had a back and forth with Claude in Learning Mode regarding traits, structs,
and how they compare to their Java and TypeScript counterparts and think I finally grokked at a
deeper level what traits are and why we say a type _is_ `Clone` instead of _has_ or _implements_ for
the most part: **traits are called traits because they may represent inherent characteristics that a
certain piece of data has.**

I am a bit flabbergasted as I write this, because, while a simple realization, it fundamentally
changes how I think about traits; I am no longer tempted to compare them to interfaces, because they
are _not_ interfaces, despite their similarities. I've landed on property traits for these inherent
characteristics, and capability traits for the other side of the coin: behaviour that they are
capable of. Think `Read`, `Write`, or `Hash`. A struct isn't `Hash`, but it does implement it.

Reading some of the Rust book with these new ideas in mind certainly gave me better understanding:

> Traits encode contracts about what a type can do and what a type is. Sometimes that's behavior
> (`Iterator`, `Read`), sometimes it's a property (`Send`, `Copy`), often it's both (`Clone`). The
> distinction matters less than understanding that traits describe capabilities and characteristics
> rather than inheritance hierarchies.

This change in mental framework (no longer analogues with different syntax) is also a change in how
I approach systems design in Empire. I intended to write about how I migrated from the repository
pattern to database operations modules that take in a connection as its first parameter instead of
holding an `Arc` ref to a database pool in the repository instance, which to me was a Java smell.

```rust
struct PlayerRepo {
  pool: Arc<DbPool>
}
impl PlayerRepo {
  do_thing(&self) { /* ... */ }
}

// instead becomes
pub fn do_think(conn: &mut DbConn) { /* ... */ }
```

As it turns out, it was indeed the correct way of thinking about it. Yes, I could have kept
repositories with `DbConn` refs and injecting that into handlers with nifty extractors, but I can
just as well extract a single connection that I can then reuse throughout the handler. I can now
wrap an entire flow with transactional boundaries easily, and just pass around the mutable ref to
`conn`. Testing is also easier, since I can instantiate a connection mock and pass it around instead
of faffing with full struct mocks.

With this pattern, I get to keep dependency injection through handler extractors
(`DatabaseConnection(mut conn): DatabaseConnection`) and avoid having to instantiate thin wrappers
to access the DB layer. Instead, I simply call `session_operations::create(&mut conn, ...)` instead,
thus retaining the separation of concerns I value while writing idiomatic Rust. Or at least my
understanding of it.

One pattern I did decide to keep was the DTO. I've come to appreciate that storage entities are not
necessarily the same entities one uses in the presentation layer, and this became even more evident
once I started implementing the web client. Thus, my controllers live in path-like folders alongside
their data models, route definitions, and handlers. It's a rather clean structure that anyone could
grok after a cursory browse. By leveraging module visibility, I ensure that handlers aren't exposed
to the rest of the application and only surface the route definitions and some models.

```text
src/controllers
├── auth
│   ├── handlers.rs
│   ├── mod.rs
│   ├── models.rs
│   └── routes.rs
├── dashboard
│   ├── handlers.rs
│   ├── mod.rs
│   ├── models.rs
│   └── routes.rs
└── game
    ├── mod.rs
    ├── index_controller.rs
    ├── buildings
    │   ├── handlers.rs
    │   ├── mod.rs
    │   ├── models.rs
    │   └── routes.rs
    ├── factions
    │   ├── handlers.rs
    │   ├── mod.rs
    │   ├── models.rs
    │   └── routes.rs
    └── resources
        ├── handlers.rs
        ├── mod.rs
        ├── models.rs
        └── routes.rs
```
