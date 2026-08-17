; BHaus syntax highlighting

; Comments
(comment) @comment

; Functional intents ("> ..." lines) — free text, highlighted as a string
(functional_intent) @string

; Version
(version_declaration) @keyword
(version) @number

; Keywords
[
  "EXTERN"
  "VERSION"
  "EXTENDS"
  "IMPLEMENTS"
  "OVERRIDE"
  "PUBLIC"
  "PRIVATE"
  "PROTECTED"
  "PROTOCOL"
  "STRUCT"
  "CLASS"
  "INCLUDE"
  "FUNCTION"
  "FUNC"
  "SYSTEM"
  "CONTAINER"
  "COMPONENT"
] @keyword

; C4 type declarations
(system_declaration (identifier) @type)
(container_declaration (identifier) @type)
(component_declaration (identifier) @type)
(c4_description) @string

; A CONNECTION is a relationship, so its keyword and arrows read as @operator
; rather than a keyword — distinct from the SYSTEM/CONTAINER/COMPONENT
; declarations. The endpoints are C4 paths referencing the same elements those
; declarations name, so their identifiers use the same @type color.
"CONNECTION" @operator
(c4_path (identifier) @type)

; Type declarations
(protocol_declaration) @type
(struct_declaration) @type
(class_declaration) @type

; Visibility
(visibility) @keyword

; Simple types
(simple_type) @type

; Array type
(array_type) @type

; Bits<N> type
(bits_type) @type
(bit_width) @number

; Union type - highlight children
(union_type (simple_type) @type)
(union_type (array_type) @type)
(union_type (bits_type) @type)
(union_type (contextual_name) @type)

; Contextual name (type references)
(contextual_name) @type

; Optional type
(optional_type) @type

; Parameters
(parameter) @variable.parameter

; Members
(class_member) @function
(struct_member) @property
(protocol_member) @function

; Connection arrows
"->" @operator
"<->" @operator
"=>" @operator

; String (descriptions)
(glob_pattern) @string

; Operators
":" @punctuation.delimiter
"?" @operator
"[" @punctuation.bracket
"]" @punctuation.bracket
"(" @punctuation.bracket
")" @punctuation.bracket
