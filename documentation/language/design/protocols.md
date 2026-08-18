---
sidebar_position: 8
title: Protocols
description: PROTOCOL declares a contract, the members a conforming type must provide, without implementing them.
---

# Protocols

A protocol is a contract. It lists the members a type must provide without saying how
they work. It is the same idea as an interface in other languages.

```bhaus
PROTOCOL Domain/Repository:
    PUBLIC findById(Integer): ?Domain/Entity/User
    PUBLIC save(Domain/Entity/User): Boolean
```

Any type that claims to be a `Domain/Repository` promises to supply a `findById` and
a `save` with those exact shapes. The protocol supplies no implementation and only
states the requirement.

## What a protocol may declare

A protocol follows the same [member rules](./structs.md#members-and-visibility) as a
struct: every member starts with a visibility keyword. Unlike a struct, it may
declare both properties and methods:

```bhaus
PROTOCOL Base/Entity:
    PUBLIC getIdentifier(): UUID   # a required method
    PUBLIC value: String           # a required property
```

Methods here are signatures only: a name, parameters and an optional return type,
with no [functional intent](./functions.md#functional-intents). A protocol states
what is required and leaves how to whatever implements it.

## Using a protocol

Protocols are used in two places. First, as an ordinary type. A parameter or return
type can be a protocol, which asks for anything that satisfies the contract:

```bhaus
PROTOCOL Shape:
    PUBLIC area(): Float

FUNCTION totalArea(shapes: Array[Shape]): Float
    > sum the area of every shape
    > return the sum
```

`totalArea` accepts circles or squares, as long as each one has an `area()`.

Then a [class](./classes.md) can declare that it implements a protocol with the promise to
fulfill the contract:

```bhaus
CLASS Circle IMPLEMENTS Shape:
    PUBLIC radius: Float
    PUBLIC area(): Float
```

Tooling checks the `IMPLEMENTS` link. If `Circle` claimed to implement `Shape` but
had no `area()`, the linter would report it.

Protocols let you design against a contract rather than a concrete type.
