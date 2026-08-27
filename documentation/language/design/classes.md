---
sidebar_position: 9
title: Classes
description: CLASS declares an object type with properties, methods, inheritance via EXTENDS, protocol conformance via IMPLEMENTS and OVERRIDE.
---

# Classes

A class is the largest of the three structural types. A [`STRUCT`](./structs.md) holds
only data and a [`PROTOCOL`](./protocols.md) holds only requirements. 

A class holds both properties and methods and it can sit in an inheritance hierarchy.

```bhaus
CLASS Circle:
    PUBLIC center: Point
    PUBLIC radius: Float
    PUBLIC area(): Float
```

The members follow the same [visibility rules](./structs.md#members-and-visibility)
as every structural type and its methods may carry
[functional intents](./functions.md#functional-intents) like standalone functions.

## Inheritance with EXTENDS

A class may extend **one** parent class with `EXTENDS`, inheriting its members:

```bhaus
CLASS Employee EXTENDS Person:
    PUBLIC salary(): Integer
```

`Employee` gains everything `Person` declares and adds its own `salary()`. Classes
use single inheritance: exactly one `EXTENDS` target, written as a single
[contextual name](./document-structure.md#contextual-names-slash-paths).

## Conformance with IMPLEMENTS

A class may declare that it satisfies one or more [protocols](./protocols.md) with
`IMPLEMENTS`, listing them comma-separated:

```bhaus
CLASS Employee EXTENDS Person IMPLEMENTS Serializable, Comparable:
    PUBLIC name: String
    PUBLIC salary(): Integer
```

`EXTENDS` and `IMPLEMENTS` can appear together, in that order. A class implements any
number of protocols while extending at most one class. This appears often in real
designs:

```bhaus
CLASS FileStrategy IMPLEMENTS StrategyProtocol:
CLASS SettingStrategy IMPLEMENTS StrategyProtocol:
CLASS ManifestStrategy IMPLEMENTS StrategyProtocol:
```

Three classes share one contract. A class body can be empty when the declaration
itself, meaning which protocols it fulfils, is the point.

## Overriding with OVERRIDE

When a class redeclares a method it inherited from its parent, it **must** mark the
redeclaration with `OVERRIDE`:

```bhaus
CLASS Controller/AbstractIntertiaController EXTENDS Neos/ActionController:
    PROTECTED renderContext: Domain/Render/Context

    OVERRIDE PUBLIC renderView()
```

The `OVERRIDE` keyword comes before the visibility. 
It is needed because the parent class be defined [`EXTERN`](./modules.md#extern).

## Putting it together

A realistic class draws on the whole design section: composite types, methods,
inheritance and conformance.

```bhaus
STRUCT Domain/Render/Context:
    PUBLIC component: String
    PUBLIC props: Array[Unknown]

CLASS Domain/Render/Fusion:
    PUBLIC prepareView(Neos/FusionView, Domain/Render/Context)

CLASS Domain/AssetVersion/StrategyFactory:
    PUBLIC buildFromConfiguration(String | Array[String]): ?StrategyProtocol
```
