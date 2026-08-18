---
sidebar_position: 1
title: Overview
description: The design half of BHaus, covering the type system and the structural declarations that describe what things are.
---

# Design

The design half of BHaus describes what things are: the types in your system and the
contracts between them. Every declaration on these pages produces a type or a
contract, never a value and never a computation.

A design file is a sequence of statements. The first is always the
[version](./document-structure.md#version). After that you declare types in any
order.

```bhaus
VERSION 0.1

STRUCT Point:
    PUBLIC x: Integer
    PUBLIC y: Integer

PROTOCOL Shape:
    PUBLIC area(): Float

CLASS Circle IMPLEMENTS Shape:
    PUBLIC center: Point
    PUBLIC radius: Float
    PUBLIC area(): Float
```

## What's on these pages

The design pages build up in the order you would write a file:

- **[Document structure](./document-structure.md)**: the skeleton. The version
  statement, comments, whitespace and the naming rules every declaration shares.
- **[Modules & references](./modules.md)**: splitting a design across files with
  `INCLUDE` and pointing at types you do not define yourself with `EXTERN`.
- **[Simple types](./simple-types.md)**: the fixed, built-in types like `String`,
  `Integer` and `Bits<N>`.
- **[Composite types](./composite-types.md)**: building richer types with arrays
  (`Array[T]`), optionals (`?T`) and unions (`A | B`).
- **[Functions](./functions.md)**: `FUNCTION` declarations, their parameters and the
  functional intents that describe what a body should do.
- **[Structs](./structs.md)**: records of named properties.
- **[Protocols](./protocols.md)**: contracts that list required members without
  implementing them.
- **[Classes](./classes.md)**: object types with inheritance, protocol conformance
  and overrides.

## Specification

These pages favour clarity over completeness. Where a rule matters but is fiddly,
such as the exact grammar of a union, the page states the useful version and links to
the [Specification](/specification) for the full rule. When you need to know
precisely what a conforming document may and may not do, the spec is the source of
truth.
