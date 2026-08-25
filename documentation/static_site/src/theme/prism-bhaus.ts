import { type PrismTheme } from "prism-react-renderer";
import { type Grammar } from "prismjs";

export const bhaus_language: Grammar = {
    // §2.2: a comment MUST begin with `#` and runs to end of line (no // or block form).
    comment: {
        pattern: /#.*/,
        greedy: true,
    },
    // §7.1: a functional intent MUST be a single line beginning with `>`.
    "functional-intent": {
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
    keyword:
        /\b(?:VERSION|INCLUDE|EXTERN|FUNCTION|FUNC|PROTOCOL|STRUCT|CLASS|EXTENDS|IMPLEMENTS|OVERRIDE|PUBLIC|PRIVATE|PROTECTED|SYSTEM|CONTAINER|COMPONENT|CONNECTION)\b/,
    // §4.1 simple types (fixed closed set) plus the Array/Bits type operators.
    builtin: /\b(?:Character|Char|String|Integer|Int|UnsignedInteger|UInt|Float|UnsignedFloat|UFloat|Boolean|Bool|any|Array|Bits)\b/,

    // §5.1/§6.2: a function or method name, recognized by the following `(`.
    function: /\b[a-zA-Z_]\w*(?=\s*\()/,

    variable: {
        pattern: /\b(?<!\/)[a-zA-Z]\w*\b(?=\: )/
    },

    // §2.4/§9.2: contextual names (incl. slash-separated paths) SHOULD start upper-case.
    "class-name": {
        pattern: /\b[a-zA-Z]\w*(?:[\/\.][a-zA-Z]\w*)*\b/,
        greedy: true,
    },


    // §2.1: version designators (`\d+\.\d+`) and Bits<N> bit-width literals.
    number: /\b\d+(?:\.\d+)?\b/,
    // §8.2/§8.3 connection arrows, §4.3 optional `?`, §4.5 union `|`.
    operator: /<->|->|=>|\||\?/,
    punctuation: /[{}()\[\]<>,.:/]/,
};

const color = {
    bhaus: {
        dark_blue: "#010337",
        blue: "#2B5FA3",
        light_blue: "#306FDE",
        pink_red: "#E93351",
        pastel_yellow: "#F6D15F",
        dark_yellow: "#ECB60E",
        dark_green: "#015A2F",
        purple: "#ab4aa9",
    },
    braun: {
        functional_orange: "#ed8008",
        functional_red_orange: "#ed3f1c",
        functional_deep_red: "#bf1b1b",
        functional_green: "#736b1e",

        base_earthy_brown: "#754C24",
        base_slate_gray: "#5E6B70",
        base_deep_charcoal: "#3B4B59",
        base_beige: "#D7C9A8",
        base_off_white: "#d9d2c6",
    },
};

export const bhaus_theme_light: PrismTheme = {
    plain: {
        color: "#1d1d16",
        backgroundColor: "#ffffff",
        fontWeight: "600"
    },
    styles: [
        {
            types: ["punctuation"],
            style: {
                color: "#1d1d16",
            },
        },
        {
            types: ["comment", "prolog", "doctype", "cdata"],
            style: {
                color: "#999988",
                fontStyle: "italic",
                fontWeight: "800"
            },
        },
        {
            types: ["namespace"],
            style: {
                opacity: 0.7,
            },
        },
        {
            types: ["string", "attr-value"],
            style: {
                color: color.bhaus.dark_green,
            },
        },
        {
            types: ["operator"],
            style: {
                color: color.bhaus.dark_blue,
            },
        },
        {
            types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
            style: {
                color: color.bhaus.pink_red,
            },
        },
        {
            types: ["class-name", "package"],
            style: {
                color: color.bhaus.dark_green,
                fontStyle: "italic",
            },
        },
        {
            types: ["keyword"],
            style: {
                color: color.bhaus.light_blue,
            },
        },
        {
            types: ["type-hint", "type-declaration", "builtin"],
            style: {
                color: color.bhaus.blue,
                fontStyle: "normal",
            },
        },
        {
            types: ["functional-intent"],
            style: {
                color: color.bhaus.dark_yellow,
                fontStyle: "italic",
                fontWeight: "800"
            }
        }
    ],
};

export const bhaus_theme_dark: PrismTheme = {
    plain: {
        color: "#d0d0d0",
        backgroundColor: "#141414",
        fontWeight: "600"
    },
    styles: [
        {
            types: ["punctuation"],
            style: {
                color: "#d0d0d0",
            },
        },
        {
            types: ["comment", "prolog", "doctype", "cdata"],
            style: {
                color: "#999988",
                fontStyle: "italic",
                fontWeight: "800"
            },
        },
        {
            types: ["namespace"],
            style: {
                opacity: 0.7,
            },
        },
        {
            types: ["string", "attr-value"],
            style: {
                color: color.bhaus.purple,
            },
        },
        {
            types: ["operator"],
            style: {
                color: color.bhaus.blue,
            },
        },
        {
            types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
            style: {
                color: color.bhaus.pink_red,
            },
        },
        {
            types: ["class-name", "package"],
            style: {
                color: color.bhaus.purple,
                fontStyle: "italic",
            },
        },
        {
            types: ["keyword"],
            style: {
                color: color.bhaus.blue,
            },
        },
        {
            types: ["type-hint", "type-declaration", "builtin"],
            style: {
                color: color.bhaus.dark_yellow,
                fontStyle: "normal",
            },
        },
        {
            types: ["functional-intent"],
            style: {
                color: color.bhaus.dark_yellow,
                fontStyle: "italic",
                fontWeight: "800"
            }
        }
    ],
};
