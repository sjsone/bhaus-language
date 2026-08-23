---
slug: /
title: BHaus Specification
description: The normative BHaus language specification. It covers syntax, the type system, structural types and the C4 architecture model.
---

# BHaus Specification

**Version:** 0.3  
**Last Updated:** 2026-08-16  
**Status:** RFC Draft  
**Scope:** Language specification for architectural design documents

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Language Fundamentals](#2-language-fundamentals)
3. [Document-Level Statements](#3-document-level-statements)
4. [Type System](#4-type-system)
5. [Functional Types](#5-functional-types)
6. [Structural Types](#6-structural-types)
7. [Functional Intents](#7-functional-intents)
8. [C4 Architecture Model](#8-c4-architecture-model)
9. [Reference](#9-reference)

---

## 1. Introduction

### 1.1 BHaus as a Textual Language

This document defines **BHaus**. It is a textual language for describing the structure and design of software systems. BHaus works independently of any programming language. It provides a precise notation for architectural documentation. Files use the `.bhaus` extension.

### 1.2 Design Philosophy

BHaus emphasizes **clarity through structure**. A BHaus document is a design
artifact. It describes the _types_, _contracts_ and _architecture_ of a system.
It does not describe runtime values or behavior. The language has no value
expressions, no control flow and no arithmetic. It has only declarations.

### 1.3 Conformance Keywords

This specification uses keywords to show requirement levels.
The keywords are `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT` and `MAY`.
Write each keyword in capital letters.  
The keywords follow [RFC 2119](https://datatracker.ietf.org/doc/rfc2119/).

Each keyword sets one requirement level. Read each keyword as follows:

- **`MUST`**: the rule is mandatory. A BHaus document MUST obey the rule. A
  document that breaks a MUST rule is not valid. `REQUIRED` and `SHALL` have the
  same meaning as MUST.
- **`MUST NOT`**: the rule is a prohibition. A BHaus document MUST NOT do the
  thing. `SHALL NOT` has the same meaning as MUST NOT.
- **`SHOULD`**: the rule is a recommendation. A BHaus document SHOULD obey the
  rule. You MAY ignore the rule for a good reason. Examine the effect first.
  `RECOMMENDED` has the same meaning as SHOULD.
- **`SHOULD NOT`**: the rule is a caution. A BHaus document SHOULD NOT do the
  thing. You MAY do the thing for a good reason. Examine the effect first.
  `NOT RECOMMENDED` has the same meaning as SHOULD NOT.
- **`MAY`**: the rule is optional. A BHaus document MAY do the thing. A document
  that does not do the thing is also valid. `OPTIONAL` has the same meaning as
  MAY.

A keyword in lower case is normal English. A lower-case "must", "should" or
"may" does not set a requirement level.

> [!NOTE]
> The BHaus linter is the tool that checks these rules. The linter reports a broken
> MUST rule as an error. The linter reports a broken SHOULD rule as a warning.

---

## 2. Language Fundamentals

### 2.1 Lexical Elements

A BHaus document is built from:

- **Keywords**: fixed uppercase tokens (`VERSION`, `FUNCTION`, `CLASS`, `PUBLIC`, `SYSTEM`, ...) and the fixed built-in [§4.1 simple type](#41-simple-types) names.
- **Identifiers**: an identifier MUST match `[a-zA-Z_][a-zA-Z0-9_]*`. An identifier is the atom of every name. The first character MUST NOT be a digit.
- **Names**: a _contextual name_ is either a single identifier or a slash-separated **path** (`Domain/Entity/User`). See [§2.4 contextual name](#24-contextual-names-and-paths).
- **C4 paths**: dot-separated identifier chains (`MailSystem.MTA`). Used only for [§8 C4](#8-c4-architecture-model) connection endpoints.
- **Descriptions**: a double-quoted label on a [§8 C4](#8-c4-architecture-model) element (`"Mail Backend"`). This is the only quoted string in the language.
- **Version designators**: matching `\d+\.\d+` (major.minor), e.g. `0.1`.
- **Glob patterns**: matching `[a-zA-Z0-9_*./]+`, used by `INCLUDE`.

BHaus has **no** string, number or boolean _value_ literals: it describes types, not values.

> [!NOTE]
> Values may be hinted at by [§7 functional intents](#7-functional-intents) and comments.

### 2.2 Comments

A comment MUST begin with `#`. The `#` runs to the end of the line.  
A comment MAY appear anywhere between tokens. The parser attaches each comment automatically.  
A comment is not a member of any block.  
Comments may contain light markdown (`_italic_`, `**bold**`, `` `code` ``); this has no semantic meaning.  
Consecutive comment lines (with no blank line between them) are read as a single comment block.

```bhaus
# This is a comment.
# A second line continues the same comment block.
# Based on syntax highlighting support _italic_, **bold** and `code` are displayed as such.
```

A comment MUST NOT use `//` or a block form. BHaus has no such syntax.

### 2.3 Whitespace

Whitespace separates tokens and is otherwise insignificant. The parser is
indentation-_insensitive_ as block membership is determined by the grammar (a block
runs until the next statement that cannot be a member), not by indentation.  
Indentation SHOULD be used for readability.

### 2.4 Contextual Names and Paths

A **contextual name** (`contextual_name`) is either:

A single `identifier` (e.g. `User`).  
_Or_ a **path**: two or more identifiers joined by `/`.

Every path segment MUST be a valid identifier. A segment MUST NOT be an arity or
index suffix.

Contextual names are used for: struct/protocol/class names, `EXTENDS`/`IMPLEMENTS`
targets, function names, `EXTERN` targets and user-defined type references.

For example: `Engine/DimensionalPoint/2` is not valid. `2` is not a valid identifier.

---

## 3. Document-Level Statements

### 3.1 Version

```bhaus
VERSION 0.1
```

`VERSION` MUST be followed by a version designator that matches `\d+\.\d+` (major and minor only).  
A document MUST place `VERSION` as its first statement.

### 3.2 Include

```bhaus
INCLUDE types/*.bhaus
```

`INCLUDE` MUST be followed by a glob pattern (`[a-zA-Z0-9_*./]+`).  
A tool MUST resolve the glob relative to the directory of the including file.  
A tool MAY follow includes recursively.  
An included file contributes its declarations. This lets a cross-file reference resolve.

### 3.3 Extern

```bhaus
EXTERN Domain/User
```

`EXTERN` MUST be followed by a [§2.4 contextual name](#24-contextual-names-and-paths).  
`EXTERN` declares that a type exists elsewhere.  
It does not define the type here. A reference to the type then resolves without a local definition.

---

## 4. Type System

### 4.1 Simple Types

The built-in simple types are a **fixed, closed set**.  
A built-in type MUST use one of these spellings.  
The parser does not recognize any other spelling than:

| Type              | Aliases  | Meaning                                                          |
| ----------------- | -------- | ---------------------------------------------------------------- |
| `Character`       | `Char`   | One character of an alphabet.                                    |
| `String`          | none     | A sequence of characters.                                        |
| `Integer`         | `Int`    | A signed integer; platform-native size by default.               |
| `UnsignedInteger` | `UInt`   | An unsigned integer.                                             |
| `Float`           | none     | A signed floating-point number; platform-native size by default. |
| `UnsignedFloat`   | `UFloat` | An unsigned floating-point number.                               |
| `Boolean`         | `Bool`   | A two-state value: true or false.                                |
| `Unknown`         | none     | A value with no formally declared type.                          |

### 4.2 Bits Type

`Bits<N>` represents a fixed-width sequence of `N` bits:

```bhaus
PUBLIC flags: Bits<8>
```

`Bits` MUST be followed by `<`, a bit-width literal and `>`.  
The bit-width literal MUST be a non-negative integer.  
The bit-width literal MUST be greater than 0.  
The grammar places no upper bound on `N`.

### 4.3 Optional (Nullable) Types

A leading `?` makes any type optional:

```bhaus
PUBLIC name: ?String
```

An optional value MAY be empty.  
An empty value is not yet initialized.  
A `?` MAY prefix any type.  
This includes arrays and user types, such as `?Array[String]` and `?Domain/User`.

### 4.4 Array Types

```bhaus
PUBLIC roles: Array[String]
```

`Array` MUST be followed by `[`, an element type and `]`.  
An array MAY nest to any depth:

```bhaus
PUBLIC grid: Array[Array[Integer]]
```

### 4.5 Union Types

A union MUST combine exactly two operands with `|`:

```bhaus
PUBLIC result: Integer | String
```

Each operand MUST be a simple type, an array type, a `Bits<N>` type or a [§2.4 contextual name](#24-contextual-names-and-paths).
An operand MUST NOT be an optional type or a nested union.
A union is always binary.

### 4.6 User Types

Any [§2.4 contextual name](#24-contextual-names-and-paths) used in a type position refers to a user-defined type (a struct, class, protocol or `EXTERN`).

---

## 5. Functional Types

### 5.1 Function Declarations

```bhaus
FUNCTION calculateTotal(values: Array[Integer]): Integer
```

A function declaration MUST begin with `FUNCTION` or `FUNC`.  
A [§2.4 contextual name](#24-contextual-names-and-paths) MUST follow the keyword.  
A `(`, an optional parameter list and a `)` MUST follow the name.  
A `:` and a return type MAY follow the `)`.  
One or more [§7 functional intents](#7-functional-intents) MAY follow the signature.

A function name SHOULD start with a lower-case letter.

### 5.2 Parameters

A parameter is either:

- a **named** parameter: `identifier : type`, e.g. `amount: Decimal` or
- a **bare type**: just a `type`, e.g. `Array[Integer]`.

A comma MUST separate parameters.  
A parameter list MAY mix both forms.

```bhaus
FUNCTION transfer(from: Domain/Account, to: Domain/Account, Integer): Boolean
```

---

## 6. Structural Types

Each member MUST start with a **visibility** keyword.  
Which MUST be followed by an identifier.  
Which MUST be followed by either a property or method tail.

### 6.1 Visibility

Every struct, protocol and class member MUST begin with one of these keywords:

- **`PUBLIC`**: accessible from outside the type.
- **`PRIVATE`**: accessible only within the enclosing type.
- **`PROTECTED`**: accessible within the type and its subtypes.

A visibility keyword MUST be in upper case.

### 6.2 Properties and Methods

Within a structural type, a member is a **property** or a **method**, distinguished
by the presence of a parameter list:

```bhaus
PUBLIC id: Integer                 # property:  name : Type
PUBLIC vertices(): Array[Vertex]   # method:    name(params) [: ReturnType]
```

A **property** is `visibility identifier : type`.

A **method** is `visibility identifier ( params? ) ( : type )? intents?`. The
return type is optional. Functional intents [§7](#7-functional-intents) describe the method body. Inside
a structural type a method MUST NOT use the `FUNCTION` keyword.

### 6.3 Protocols

A protocol declares required members without implementing them.  
It is a structural contract regarding its methods.

```bhaus
PROTOCOL GraphRepresentation:
    PUBLIC vertices(): Array[Vertex]
    PUBLIC edges(): Array[Edge]
```

### 6.4 Structs

A struct is a container of named members.

```bhaus
STRUCT Point:
    PUBLIC x: Integer
    PUBLIC y: Integer
```

Structs MAY hold properties.  
Struct MUST NOT hold methods.

### 6.5 Classes

A class is an object type with optional inheritance and protocol conformance.

```bhaus
CLASS Employee EXTENDS Person IMPLEMENTS Serializable, Comparable:
    PUBLIC name: String
    PUBLIC salary(): Integer
    OVERRIDE PUBLIC toString(): String
```

Each class MUST begin with `CLASS`.  
Which MUST be followed by a [§2.4 contextual name](#24-contextual-names-and-paths).  
Which MAY be followed by `EXTENDS` and a single [§2.4 contextual name](#24-contextual-names-and-paths) as parent.  
Which MAY be followed by a `IMPLEMENTS` which MUST BE followed by one or more comma-separated [§2.4 contextual names](#24-contextual-names-and-paths) (a single parent).  
The line MUST end with `:`. Following its members in new lines below.

A member that redeclares an inherited method MUST use the **`OVERRIDE`** keyword.  
`OVERRIDE` exists because the parent may live outside the design document.  
A tool cannot infer the override without it.

---

## 7. Functional Intents

### 7.1 Syntax and Scope

A functional intent MUST be a single line that begins with `>`.  
A functional intent MUST attach to a body only. A body is inside a function or a method.

```bhaus
FUNCTION calculateTotal(values: Array[Integer]): Integer
    > sum every element of the array
    > return the sum
```

### 7.2 Semantics

The intend documents the intended behavior of the function or method.  
The intend serves as a specification for code-generation and AI tooling.

---

## 8. C4 Architecture Model

BHaus supports the [C4 model](https://c4model.com) across four abstraction levels.
C4 endpoints use **dot-separated** paths (`MailSystem.MTA`). Distinct from the slash-separated [§2.4 contextual names](#24-contextual-names-and-paths).

| Level      | Keyword      | Nesting                                       |
| ---------- | ------------ | --------------------------------------------- |
| System     | `SYSTEM`     | contains containers and connection shorthands |
| Container  | `CONTAINER`  | contains components and connection shorthands |
| Component  | `COMPONENT`  | contains connection shorthands                |
| Connection | `CONNECTION` | a relationship between two paths              |

### 8.1 System, Container, Component

Each of `SYSTEM`, `CONTAINER` and `COMPONENT` has the form:

```
<KEYWORD> <identifier> "<description>"? :
    <members>
```

The nesting is fixed.  
A description is optional.  
A description MUST use double quotes.  
A `SYSTEM` MUST contain only containers and [§8.3 connection shorthands](#83-connection-shorthand).  
A `CONTAINER` MUST contain only components and [§8.3 connection shorthands](#83-connection-shorthand).  
A `COMPONENT` MUST contain only [§8.3 connection shorthands](#83-connection-shorthand).  
A `CONTAINER` or a `COMPONENT` MUST NOT appear at the top level.

```bhaus
SYSTEM MailSystem "Mail Backend":
    CONTAINER MTA "Postfix":
        COMPONENT Queue "Outbound queue":
    CONTAINER Database "PostgreSQL":
```

### 8.2 Connections

A top-level connection joins two C4 paths with an arrow:

```bhaus
CONNECTION MailSystem.MTA -> MailSystem.Database
CONNECTION Webmail.Frontend <-> MailSystem.Database
```

A bidirectional connection is designated by `<->`.
A unidirectional connection is designated by `->`.
A unidirectional connection can also be designated by implicit-source shorthand [§8.3](#83-connection-shorthand) `=>`.

### 8.3 Connection Shorthand

Inside a `SYSTEM`, `CONTAINER` or `COMPONENT` block, a connection source may be omitted using the `=>` shorthand.  
The source is implicitly the enclosing element.

```bhaus
SYSTEM Webmail:
    CONTAINER Backend:
        CONNECTION => MailSystem.MTA
```

The example above is equivalent to:

```bhaus
CONNECTION Webmail.Backend -> MailSystem.MTA
```

A document MUST NOT use the shorthand at the top level.  
At the top level there is no enclosing element to supply the source.

---

## 9. Reference

### 9.1 Naming Conventions

A type name (struct, protocol or class) SHOULD start with an upper-case letter.  
A function name or a method name SHOULD start with a lower-case letter.

---

## Appendix

Written :computer: :shrimp: by humans  
Aligned :building_construction: :robot: by a LLM
