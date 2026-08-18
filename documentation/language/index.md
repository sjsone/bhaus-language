---
sidebar_position: 1
title: Overview
description: BHaus is a textual language for describing the design and architecture of software. This is the guided tour of the language.
---

# Overview

BHaus is a textual language for describing the design and architecture of software.
You write it in plain `.bhaus` files.

BHaus is primarily used to describe a design and not behaviour.
A `.bhaus` file declares the shape of a system: its types, its contracts and its structure.

```bhaus
VERSION 0.1

STRUCT Domain/Entity/User:
    PUBLIC id: Integer
    PUBLIC name: String
    PUBLIC email: String
    PUBLIC roles: Array[String]

PROTOCOL Domain/Repository:
    PUBLIC findById(Integer): ?Domain/Entity/User
    PUBLIC save(Domain/Entity/User): Boolean
```

## Why a design-only language

Most notations for software design pull toward one of two extremes. Diagrams (boxes
and arrows) are easy to read, but they drift out of date and cannot be checked. Real
source code is precise and checkable, but it buries the design under implementation
detail.

BHaus aims for the space between. It is precise enough to lint and to feed to a code
generator and small enough to read in one sitting. Because it describes intent
rather than behaviour, one BHaus document can stand in front of several concrete
implementations (Go, TypeScript, PHP, Swift) without committing to any of them.

## The two halves of the language

The language covers two concerns and this documentation follows that split.

- **[Design](./design/overview.md)**: the type system and the structural
  declarations. Simple types like `String` and `Integer`, ways to compose them
  (`Array`, `?`, `|`) and the building blocks `STRUCT`, `PROTOCOL`, `CLASS` and
  `FUNCTION`. Use this half to describe what things are.
- **[Architecture](./architecture/overview.md)**: the [C4 model](https://c4model.com)
  (`SYSTEM`, `CONTAINER`, `COMPONENT` and `CONNECTION`). Use this half to describe how
  things fit together at the level of deployable systems.

Both halves can live in the same file but should not.
A large design usually declares its types with `STRUCT`, `CLASS` and `PROTOCOL`, then sketches the deployment picture with the C4 keywords.
