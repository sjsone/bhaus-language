---
sidebar_position: 3
title: Modules & references
description: Split a design across files with INCLUDE and reference types you don't define with EXTERN.
---

# Modules & references

Most designs span more than one file and most reference types they do not define.
Two document-level keywords cover this. `INCLUDE` pulls in other `.bhaus` files and
`EXTERN` names types that live outside your design.

## INCLUDE

`INCLUDE` composes a design out of several files. It takes a glob pattern:

```bhaus
VERSION 0.1
INCLUDE types/*.bhaus
```

The pattern is resolved relative to the directory of the including file, so a file at
`domain/model.bhaus` writing `INCLUDE ../shared/*.bhaus` reaches out of its own
folder. A tool may follow includes recursively, so an included file can include
further files of its own.

The effect: every declaration in an included file becomes visible to the including
file. A reference in one file can then resolve to a definition in another.

```bhaus title="base.bhaus"
VERSION 0.1

PROTOCOL Base/Entity:
    PUBLIC getIdentifier(): UUID
```

```bhaus title="model.bhaus"
VERSION 0.1

INCLUDE *

CLASS Model IMPLEMENTS Base/Entity:
    PUBLIC getIdentifier(): UUID
```

Here `INCLUDE *` pulls in every sibling `.bhaus` file, so `Base/Entity` (declared in
`base.bhaus`) is in scope when `Model` implements it. Without the include the
reference stays unresolved and the linter reports it.

> [!NOTE]
> `INCLUDE` controls visibility rather than performing text substitution. It does not
> paste one file into another; it makes the included declarations resolvable. Each
> file keeps its own `VERSION`.

## EXTERN

Not every type you reference is one you can or want to define here. A type might live
in a framework, a third-party library or a part of the system that falls outside
this document. `EXTERN` declares that such a type exists elsewhere:

```bhaus
EXTERN glsp/Context
EXTERN protocol/DefinitionParams
```

An `EXTERN` takes a [contextual name](./document-structure.md#contextual-names-slash-paths)
and defines nothing. It states that the type is real. Once declared, you can
reference it anywhere a type is expected and the reference resolves rather than
dangling.

```bhaus
VERSION 0.2

EXTERN glsp/Context
EXTERN protocol/CompletionParams

PROTOCOL TextDocumentCompletionHandler:
    PUBLIC textDocumentCompletion(glsp/Context, protocol/CompletionParams): Unknown
```

Use `EXTERN` when you want to mention a type without bringing its full definition into
your design. The document stays focused on the part you own and references still
type-check.
