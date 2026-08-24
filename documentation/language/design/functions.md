---
sidebar_position: 6
title: Functions
description: Declare behaviour with FUNCTION, covering parameters, return types and the functional intents that describe what a body should do.
---

# Functions

A function declaration describes an operation: its name, its inputs and what it
returns. A BHaus function has no body in the programming sense; there is no code
inside. It can describe the body's intent in prose, which is what a code generator or
a person implementing it reads.

## Declaring a function

A top-level function begins with `FUNCTION`, followed by
a [name](./document-structure.md#contextual-names-slash-paths), a parameter list in
parentheses and an optional return type after a colon:

```bhaus
FUNCTION calculateTotal(values: Array[Integer]): Integer
```

The return type is optional. Leave it off for an operation that produces nothing:

```bhaus
FUNCTION logEvent(message: String)
```

By convention a function name starts with a lower-case letter, which sets it apart
from the upper-case [type](./structs.md) names around it.

## Parameters

Each parameter takes one of two forms and a single list may mix them:

- a **named** parameter, `identifier: Type`, when the name adds meaning;
- a **bare type**, just a `Type`, when the type alone says enough.

```bhaus
FUNCTION transfer(from: Domain/Account, to: Domain/Account, Integer): Boolean
```

Here `from` and `to` are named because those words carry meaning. The third parameter
is a bare `Integer`, the amount, where a name would add nothing. Commas separate
parameters and the types can be anything, including
[composite types](./composite-types.md) like `?Array[String]`.

## Functional intents

A declaration gives a function's shape. A **functional intent** gives its purpose. An
intent is a single line beginning with `>` that describes what the body should do:

```bhaus
FUNCTION calculateTotal(values: Array[Integer]): Integer
    > sum every element of the array
    > return the sum
```

Attach as many intent lines as you need. Each is one step or clause of the behaviour.
An intent is the specification of the body: a human writes it in plain language and
a code generator or AI reads it to produce an implementation. It says what should
happen and leaves out how.

A functional intent MUST be written in **imperative mood**. Use commands like "return", "calculate", "validate" rather than present-tense descriptions like "returns" or "calculates". For example, use `> return true if valid` not `> returns true if valid`.

> [!NOTE]
> An intent attaches to a body, meaning a function or a [method](./structs.md). It
> differs from a comment (which starts with `#`) and from a document-level statement.

## Functions inside types

The `FUNCTION` keyword is only for standalone functions at the top level. When an
operation belongs to a [struct](./structs.md), [protocol](./protocols.md) or
[class](./classes.md), it becomes a method and drops the keyword. The visibility and
the parentheses are enough to mark it as callable:

```bhaus
PROTOCOL Shape:
    PUBLIC area(): Float          # a method, with no FUNCTION keyword
```

Methods take the same parameters, return types and functional intents as standalone
functions.
