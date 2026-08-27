---
sidebar_position: 5
title: Composite types
description: Build richer types out of simpler ones with arrays, optionals and unions.
---

# Composite types

Composite types build larger types out of simpler ones. There are three composers,
arrays, optionals and unions and each applies to any type (including the ones you
declare yourself).

## Arrays

`Array[T]` describes an ordered collection whose elements are all of type `T`:

```bhaus
PUBLIC roles: Array[String]
```

The element type goes inside the square brackets and can be anything, including
another array. Arrays nest to any depth:

```bhaus
PUBLIC grid: Array[Array[Integer]]
PUBLIC teams: Array[Domain/Entity/User]
```

## Optionals

A leading `?` marks a type as optional. The value may be empty, meaning not yet
initialised:

```bhaus
PUBLIC manager: ?Integer
PUBLIC nickname: ?String
```

The `?` binds to the whole type that follows it, so it works on composed types too:

```bhaus
PUBLIC tags: ?Array[String]      # the array itself may be absent
PUBLIC owner: ?Domain/Entity/User
```

`?` is the design-level version of nullable or "may be `None`". It makes the
possibility of absence explicit, so nobody implementing the design has to guess
whether a field is always present.

## Unions

A union describes a value that is one of two alternatives, written with a `|`:

```bhaus
PUBLIC result: Integer | String
```

Unions in BHaus are binary: exactly two operands. Each operand may be a simple type,
an array, a `Bits<N>` or a [user-defined type](#user-defined-types), but it may not
itself be optional or another union.

```bhaus
PUBLIC id: Integer | String       
PUBLIC version: String | Array[Integer]  
```

The restriction keeps unions easy to read. 

> [!NOTE]
>  If you want three alternatives, the concept usually belongs in a [`PROTOCOL`](./protocols.md) or [`CLASS`](./classes.md) hierarchy.

## User-defined types

Any [contextual name](./document-structure.md#contextual-names-slash-paths) used
where a type is expected refers to a type you declared elsewhere: 
- [`STRUCT`](./structs.md)
- [`CLASS`](./classes.md)
- [`PROTOCOL`](./protocols.md)
- [`EXTERN`](./modules.md#extern)

No special syntax marks a user type.     
If a name is not a built-in simple type or a composer keyword, it is a reference by name.

```bhaus
STRUCT Order:
    PUBLIC customer: Domain/Entity/User   # references a struct declared elsewhere
    PUBLIC lines: Array[OrderLine]        # an array of another user type
```

The composers combine: `?Array[Domain/Entity/User]` is an optional array of a type
you defined and it reads the way you would say it aloud.
