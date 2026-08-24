import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Declarations Only",
    icon: "{ }",
    description: (
      <>
        A <code>.bhaus</code> file contains types, contracts and architecture. <br />
        This keeps files compact, easy to diff and as reviewable as any good specification.
      </>
    ),
  },
  {
    title: "Cross-Language by Design",
    icon: "⇄",
    description: (
      <>
        The type system draws from familiar languages like TypeScript, Go, PHP and Swift. <br />
        Meant to it feel natural wherever you are coming from.
      </>
    ),
  },
  {
    title: "Architecture as Code",
    icon: "▦",
    description: <>BHaus uses the C4 model to describe software architecture in a structured, visualizable format that everyone can understand.</>,
  },
  {
    title: "Real Tooling",
    icon: "⚙",
    description: (
      <>
        The <code>bhaus-util</code> command line tool gives you a linter, language server, scaffolding generator and more to keep you productive.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--6")}>
      <div className={styles.featureRow}>
        <div className={styles.featureIcon} aria-hidden="true">
          {icon}
        </div>
        <div>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Why BHaus?
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
