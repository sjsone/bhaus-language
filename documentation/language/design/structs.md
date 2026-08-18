---
sidebar_position: 7
title: Structs
description: STRUCT declares a record of named properties and introduces the visibility keywords shared by every structural type.
---

# Structs

A struct is the simplest of the three structural types: a record of named values. To
say that a point has an `x` and a `y`, use a struct.

```bhaus
STRUCT Point:
    PUBLIC x: Integer
    PUBLIC y: Integer
```

A `STRUCT` declaration is the keyword, a
[name](./document-structure.md#contextual-names-slash-paths), a colon and the
members on the lines below. Give a member a struct type to nest structs. By
convention the name starts with an upper-case letter, like every type in the
language.

## Members and visibility

Every member of a structural type (struct, [protocol](./protocols.md) or
[class](./classes.md)) begins with a **visibility** keyword. The next two pages reuse
this rule, so it is introduced here.

| Keyword     | Reachable from                          |
| ----------- | --------------------------------------- |
| `PUBLIC`    | anywhere                                |
| `PRIVATE`   | only inside the declaring type          |
| `PROTECTED` | inside the type and its subtypes        |

Visibility keywords are always upper-case and always come first:

```bhaus
STRUCT UUID:
    PRIVATE raw: String
```

After the visibility comes the member name, then the rest of the member. There are
two kinds:

- a **property**: `visibility name: Type`
- a **method**: `visibility name(params): ReturnType`, marked by the parentheses

```bhaus
PUBLIC id: Integer                 # property
PUBLIC vertices(): Array[Vertex]   # method
```

## Structs hold data

A struct may only hold properties. It describes state, a set of typed fields and
nothing more. Methods belong to [protocols](./protocols.md) and
[classes](./classes.md).

```bhaus
STRUCT Domain/Entity/User:
    PUBLIC id: Integer
    PUBLIC name: String
    PUBLIC email: String
    PUBLIC roles: Array[String]
    PUBLIC manager: ?Integer
```

Every member above is a property. The [composite types](./composite-types.md) appear
here: `roles` is an array of strings and `manager` is optional, so it may be absent.
Named fields with precise, composable types are what a struct is for.

> [!NOTE]
> To attach behaviour to data, use a [class](./classes.md), which holds both
> properties and methods. Keep `STRUCT` for data on its own. The restriction tells a
> reader that the type is state and nothing else.
