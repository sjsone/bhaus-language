import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    specificationSidebar: [
        { type: "doc", id: "spec", label: "BHaus Specification" },
        { type: "doc", id: "decision_records", label: "Decision Records" },
        { type: "doc", id: "open_decisions", label: "Open Decisions" },
    ],
};

export default sidebars;
