// src/plugins/rehypeRfcKeywords.js
const KEYWORDS = ["MUST NOT", "SHALL NOT", "SHOULD NOT", "MUST", "SHALL", "SHOULD", "MAY", "REQUIRED", "RECOMMENDED", "OPTIONAL"];

const KEYWORD_REGEX = new RegExp(`\\b(${KEYWORDS.join("|")})\\b`, "g");

function transformNode(node) {
  if (!node.children) return;

  // Ignore code snippets and blocks so code isn't styled unexpectedly
  if (["code", "pre", "script", "style"].includes(node.tagName)) return;

  const newChildren = [];
  for (const child of node.children) {
    if (child.type === "text") {
      const parts = child.value.split(KEYWORD_REGEX);
      if (parts.length > 1) {
        for (let i = 0; i < parts.length; i++) {
          if (KEYWORDS.includes(parts[i])) {
            const classSuffix = parts[i].toLowerCase().replace(/\s+/g, "-");
            newChildren.push({
              type: "element",
              tagName: "span",
              properties: {
                className: ["rfc-keyword", `rfc-${classSuffix}`],
              },
              children: [{ type: "text", value: parts[i] }],
            });
          } else if (parts[i] !== "") {
            newChildren.push({ type: "text", value: parts[i] });
          }
        }
        continue;
      }
    } else if (child.type === "element") {
      transformNode(child);
    }
    newChildren.push(child);
  }
  node.children = newChildren;
}

module.exports = function rehypeRfcKeywords() {
  return (tree) => transformNode(tree);
};
