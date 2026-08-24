import siteConfig from "@generated/docusaurus.config";
import type * as PrismNamespace from "prismjs";
import type { Optional } from "utility-types";

import {bhaus_language} from "./prism-bhaus"

export default function prismIncludeLanguages(PrismObject: typeof PrismNamespace): void {
    const {
        themeConfig: { prism },
    } = siteConfig;
    const { additionalLanguages } = prism as { additionalLanguages: string[] };

    const PrismBefore = globalThis.Prism;
    globalThis.Prism = PrismObject;

    if (!additionalLanguages.includes("php")) {
        additionalLanguages.push("php");
    }

    // throw new Error(JSON.stringify(additionalLanguages))

    additionalLanguages.forEach((lang) => {
        if (lang === "php") {
            // eslint-disable-next-line global-require
            require("prismjs/components/prism-markup-templating.js");
        }
        require(`prismjs/components/prism-${lang}`);
    });

    // Custom language, not shipped by Prism itself, so it must not go through
    // additionalLanguages (that array is resolved against prismjs/components/).
    // eslint-disable-next-line global-require


    // BHaus grammar for Prism. Mirrors bhaus/documentation/specification/spec.md.
    PrismObject.languages.bhaus = bhaus_language

    delete (globalThis as Optional<typeof globalThis, "Prism">).Prism;
    if (typeof PrismBefore !== "undefined") {
        globalThis.Prism = PrismObject;
    }
}
