---
sidebar_position: 1
title: Overview
description: The architecture half of BHaus, describing how a system is built and deployed with the C4 model.
---

# Architecture

The architecture half of BHaus describes how a system fits together at the level of
deployable pieces: the systems, services and modules your types live in and the
connections between them.

It uses the [C4 model](https://c4model.com), which describes software architecture at
four levels of abstraction: system, container, component and code. The architecture
half of BHaus covers the first three. The fourth level, code, is the
[design half](../design/overview.md) of the language: the structs, classes, protocols
and functions that make up each component.

```bhaus
SYSTEM MailSystem "E-Mail Backend":
    CONTAINER MTA "Mail Transfer Agent":
        COMPONENT SmtpServer:
        COMPONENT QueueManager:
    CONTAINER Database:

CONNECTION MailSystem.MTA -> MailSystem.Database
```

## The three levels

C4 describes a system by zooming in, one level at a time. Each level nests inside the
one above it:

| Level         | Keyword     | Represents                                    | Contains          |
| ------------- | ----------- | --------------------------------------------- | ----------------- |
| **System**    | `SYSTEM`    | A whole software system                       | containers        |
| **Container** | `CONTAINER` | A deployable/runnable unit (app, service, DB) | components        |
| **Component** | `COMPONENT` | A modular part inside a container             | (nothing further) |

The nesting is fixed. A `SYSTEM` holds `CONTAINER`s and a `CONTAINER` holds
`COMPONENT`s. You cannot skip a level or invert it. Containers and components cannot
stand on their own at the top of a file; they exist only inside their parent.

## Connections

A `CONNECTION` links two elements to show how they relate. A connection is a
relationship between elements rather than a level of abstraction, so it does not nest.
It can join elements at any level, including across different systems.

```bhaus
CONNECTION Webmail.Backend -> MailSystem.MTA
```

## Two pages

- **[System, container & component](./levels.md)**: the three nesting levels, how to
  declare them, attach descriptions and structure a system.
- **[Connections](./connections.md)**: `CONNECTION`, the arrows `->` and `<->` and the
  `=>` shorthand for edges drawn from inside a block.

## How it relates to the design half

The two halves answer different questions and can share a file. The
[design](../design/overview.md) keywords (`STRUCT`, `CLASS`, `PROTOCOL`, `FUNCTION`)
describe what things are; in C4 terms they are the code level that sits inside a
component. The architecture keywords describe where those things run and how they
talk.

A common approach is to model the types first and then sketch the deployment picture
around them. Another is to keep the architecture in its own file and
[`INCLUDE`](../design/modules.md#include) the type definitions.
