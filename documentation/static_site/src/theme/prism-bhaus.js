// BHaus grammar for Prism. Mirrors bhaus/documentation/specification/spec.md.
Prism.languages.bhaus = {
    // §2.2: a comment MUST begin with `#` and runs to end of line (no // or block form).
    comment: {
        pattern: /#.*/,
        greedy: true,
    },
    // §7.1: a functional intent MUST be a single line beginning with `>`.
    "function-intent": {
        pattern: /^[ \t]*>.*$/m,
        alias: "important",
        greedy: true,
    },
    // §2.1: descriptions are the only quoted string in the language, used on C4 elements.
    description: {
        pattern: /"[^"\r\n]*"/,
        alias: "string",
        greedy: true,
    },
    // §9.1 keyword summary: document, functional, structural, visibility and C4 keywords.
    keyword: /\b(?:VERSION|INCLUDE|EXTERN|FUNCTION|FUNC|PROTOCOL|STRUCT|CLASS|EXTENDS|IMPLEMENTS|OVERRIDE|PUBLIC|PRIVATE|PROTECTED|SYSTEM|CONTAINER|COMPONENT|CONNECTION)\b/,
    // §4.1 simple types (fixed closed set) plus the Array/Bits type operators.
    builtin: /\b(?:Character|Char|String|Integer|Int|UnsignedInteger|UInt|Float|UnsignedFloat|UFloat|Boolean|Bool|any|Array|Bits)\b/,
    // §2.4/§9.2: contextual names (incl. slash-separated paths) SHOULD start upper-case.
    "class-name": {
        pattern: /\b[A-Z]\w*(?:\/[A-Z]\w*)*\b/,
        greedy: true,
    },
    // §5.1/§6.2: a function or method name, recognized by the following `(`.
    function: /\b[a-zA-Z_]\w*(?=\s*\()/,
    // §2.1: version designators (`\d+\.\d+`) and Bits<N> bit-width literals.
    number: /\b\d+(?:\.\d+)?\b/,
    // §8.2/§8.3 connection arrows, §4.3 optional `?`, §4.5 union `|`.
    operator: /<->|->|=>|\||\?/,
    punctuation: /[{}()\[\]<>,.:/]/,
};
