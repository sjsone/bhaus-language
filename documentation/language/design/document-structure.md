---
sidebar_position: 2
title: Document structure
description: The skeleton of a .bhaus file, covering the version statement, comments, whitespace and the naming rules shared by every declaration.
---

# Document structure

Every `.bhaus` file shares the same skeleton. Before the types, here are the rules
that apply everywhere: how a file starts, how comments work, why indentation is only
for looks and how names are formed.

## Version

The first statement in a file must be the version:

```bhaus
VERSION 0.1
```

`VERSION` is followed by a `major.minor` designator (two numbers with a dot between
them). It records which revision of the language the file targets, so tools know how
to read the rest. Nothing may come before it, not even another declaration.

## Comments

A comment starts with a `#` followed by a space and runs to the end of the line.

There is no block-comment form and no `//`.

```bhaus
# This is a comment.
# A second line with no blank line between continues the same comment block.

PUBLIC id: Integer   # comments can also trail a declaration
```

Two rules matter:

- **Consecutive comment lines form one block.** A blank line ends the block. Tools
  treat an unbroken run of `#` lines as a single note, which lets you attach a short
  paragraph of documentation to the declaration below.
- **Light markdown is allowed.** You can write `_italic_`, `**bold**` and
  `` `code` `` inside a comment. It carries no meaning to the parser. Editors use it
  to render formatting in tooltips and previews.

```bhaus
# The **User** entity. See `Domain/Repository` for persistence.
STRUCT Domain/Entity/User:
    PUBLIC id: Integer
```

## Whitespace and indentation

BHaus is indentation-insensitive. Unlike Python or YAML, indentation never changes
meaning. The grammar decides where a block ends: a block runs until the next
statement that cannot belong to it. The amount of indentation plays no part.

```bhaus
STRUCT Point:
    PUBLIC x: Integer
    PUBLIC y: Integer
```

The indentation above only makes the two properties easy to read as members of
`Point`. The file would parse the same without it. Indent for readability, but do not
rely on indentation to carry meaning.

## Identifiers, names & paths

Three kinds of name appear across the language. Keep them distinct.

### Identifiers

An identifier is the smallest unit of a name. It matches `[a-zA-Z_][a-zA-Z0-9_]*`:
letters, digits and underscores, never starting with a digit. 

`User`, `findById` and `_internal` are all valid identifiers. 

`2nd` is not.

### Contextual names (slash paths)

A **contextual name** is either a single identifier or several identifiers joined by
slashes into a **path**:

```bhaus
User
Domain/Entity/User
```

Paths namespace your declarations without any import machinery. The slashes group
related types the way folders group files. Every segment must be a valid identifier.
Contextual names are used for struct, protocol and class names, for
`EXTENDS`/`IMPLEMENTS` targets, for function names and for any reference to a
user-defined type.

### C4 paths (dot paths)

The [architecture](../architecture/overview.md) keywords use dots as a separator
instead of slashes:

```bhaus
CONNECTION MailSystem.MTA -> MailSystem.Database
```

Dot paths address elements inside the C4 model (`System.Container.Component`). Keep
the two apart: slashes name types, dots name architecture elements.

## Naming conventions

Two conventions run through the language. They are recommendations and tools report
them as warnings rather than errors:

- A **type** name (struct, protocol, class) should start with an **upper-case**
  letter: `User`, `Repository`.
- A **function** or **method** name should start with a **lower-case** letter:
  `findById`, `area`.

Following them keeps types and functions visually distinct, which matters in a
language where both appear side by side.
