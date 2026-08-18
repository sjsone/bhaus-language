---
sidebar_position: 4
title: Simple types
description: The fixed, built-in types of BHaus, including String, Integer, Boolean and Bits<N>.
---

# Simple types

A simple type is a single value. BHaus provides a small, fixed set of them. You
cannot define new simple types, only compose the existing ones. Any name that is not
one of these built-ins (and not an [array](./composite-types.md#arrays) or
[`Bits`](#bits)) refers to a type you declared.

## The built-in types

| Type              | Alias    | Describes                                         |
| ----------------- | -------- | ------------------------------------------------- |
| `Character`       | `Char`   | A single character of an alphabet.                |
| `String`          | none     | A sequence of characters.                         |
| `Integer`         | `Int`    | A signed whole number.                            |
| `UnsignedInteger` | `UInt`   | A non-negative whole number.                      |
| `Float`           | none     | A signed floating-point number.                   |
| `UnsignedFloat`   | `UFloat` | A non-negative floating-point number.             |
| `Boolean`         | `Bool`   | A two-state value, true or false.                 |
| `Unknown`         | none     | A value whose type is deliberately left unstated. |

> [!WARNING]
> The concept of type aliases is not 100% set.  
> They may be removed. So try not to use them.

The spellings are exact and the set is closed. The parser recognises `Integer` and
`Int` for a signed integer and nothing else. Where a type has an alias, the two are
interchangeable. Pick whichever reads better and use it consistently.

```bhaus
STRUCT Account:
    PUBLIC id: Integer
    PUBLIC balance: Float
    PUBLIC active: Boolean
    PUBLIC label: String
```

### Sizes are contextual

There is no `Int32` or `Float64`. `Integer` and `Float` default to the largest
natural size on whatever platform implements the design. BHaus records the intent, a
signed integer and leaves the exact width to the target language. When you need a
fixed width, use [`Bits`](#bits).

### Unknown

`Unknown` marks a value whose type is deliberately left unstated. 
Language servers and linter may issue a warning for each found occurrence of `Unknown`.    
So it is meant to be a placeholder until a concrete type is defined. 

Avoid `Unknown` for an opaque framework value or a payload whose shape is not known. 
Declare an `EXTERN` type and reference that instead.

```bhaus
PROTOCOL Handler:
    PUBLIC handle(Request): Unknown
```

## Bits

`Bits<N>` describes a fixed-width sequence of exactly `N` bits. It is the one place
you write an exact width:

```bhaus
STRUCT Packet:
    PUBLIC flags: Bits<8>
    PUBLIC checksum: Bits<32>
```

`N` is a positive whole number written between angle brackets. There is no upper
bound, so `Bits<128>` is valid. Use it when the exact bit-width is part of the
design, such as wire formats, hardware registers or bit flags.
