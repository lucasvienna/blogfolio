---
title: Empire - Part 1
description: Getting started with Rust by making a game
date: "2024-07-25"
categories:
  - rust
  - empire
published: true
---

In an effort to learn Rust in a fun way, I've decided to write a game (server) with it. My grand
idea was to write a derivate of games like Tribal Wars, Ikariam, and Clash of Kings. These are
empire-building games where the goal is to upgrade your buildings and units and go to war against
both NPCs and other PCs.

Hence, Empire! I also took the opportunity to learn a little about some game design and game
programming basics. Things like database design, server architecture, networking, and so on. I might
be biting off more than I can chew, but as a learning experience it has been going great.

I decided to start with the model building and database design. I chose SQLite for my database
engine, as it's very fast and portable, making setup and maintenance extremely easy. Chosing between
crates to interface with the DB was relatively fun as well.

I started out with rusqlite, and while writing SQL with it was very easy, migrations and
serialisation of data was not so straightforward. Hence, Diesel. A much simpler approach to structs,
where the initial table migration is used to generate struct macros that we can then use. The data
is automatically serialised and writing queries is even easier than SQL, somehow. I have since then
stuck with Diesel and the DX has been excellent. The only thing I've found subpar is the lack of
support for views, which I intended to use extensively to reduce complexity and reduce read calls.
Oh well.

```rust
fn get_by_id(&self, connection: &mut DbConn, id: &building::PK) -> EmpResult<Building> {
    let building = buildings::table.find(&id).first(connection)?;
    Ok(building)
}
```

Scaffolding the app to setup the database took a couple of small sessions, between my model rewrites
due to Diesel's opinions. For example, composite primary keys comprised of two foreign keys are
supported, but require extra boilerplate and aren't as streamlined as a single `id` primary key.

After the initial rush to get a database set up and working, I fell into a rabbithole with RPC and
buffers for a homebrew protocol. After reading an article on game networking, I was driven to
experiment with protocol buffers and bitbanging. It sounded like a very interesting field, and what
followed was a long session of `unsafe` blocks and direct memory manipulation.

```rust
// write something to the buffer
buffer.write(unsafe { &mem::transmute::<u16, [u8; 2]>(value.to_le()) })
// and read it back
unsafe { ptr::copy(&self.data[self.index], &mut buf[0], buf.len()); }
```

Many exceptions later, I've got a basic protocol buffer that doesn't care about word boundaries and
is essentially a complex `[u8]` wrapper. I did learn a lot about lower level memory manipulation,
and had a lot of bouncing sending small messages between two threads.

For now, the Empire source is private on GitHub. I plan on open-sourcing it once a v0.1 is somewhat
stable and very, very basic gameplay can be achieved. I don't even have a client written yet, and
have been using `#[test]` and a single `sender.rs` file to communicate with the server.

This is all for now. I hope you enjoyed the read thus far, stay tuned for future updates!
