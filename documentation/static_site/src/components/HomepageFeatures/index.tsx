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
        A <code>.bhaus</code> file declares types, contracts and architecture only.
        It stays small, easy to compare and reviewable like a specification.
      </>
    ),
  },
  {
    title: "Cross-Language by Design",
    icon: "⇄",
    description: (
      <>
        The type system is inspired by languages like TypeScript, Go, PHP and Swift.
      </>
    ),
  },
  {
    title: "Architecture as Code",
    icon: "▦",
    description: (
      <>
        BHaus chooses the C4 model as its way to describe architecture.
      </>
    ),
  },
  {
    title: "Real Tooling",
    icon: "⚙",
    description: (
      <>
        <code>bhaus-util</code> provides a linter, language server and more.
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
