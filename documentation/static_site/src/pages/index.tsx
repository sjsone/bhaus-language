import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

const SAMPLE = `VERSION 0.1

STRUCT Domain/Entity/User:
    PUBLIC id: Integer
    PUBLIC name: String
    PUBLIC email: String
    PUBLIC roles: Array[String]
    PUBLIC manager: ?Integer

PROTOCOL Domain/Repository:
    PUBLIC findById(Integer): ?Domain/Entity/User
    PUBLIC save(Domain/Entity/User): Boolean`;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--6", styles.heroText)}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p className={styles.heroLead}>
              BHaus is a textual design language, written by humans and followed by text-generating models. A <code>.bhaus</code> file declares the types,
              contracts and architecture of a system &mdash; nothing more &mdash; so it stays precise, diffable, and ready for an LLM (or a teammate) to
              implement against.
            </p>
            <div className={styles.buttons}>
              <Link className="button button--secondary button--lg" to="/getting-started/quick-start">
                Get Started
              </Link>
              <Link className="button button--outline button--secondary button--lg" to="/specification">
                Read the Spec
              </Link>
            </div>
          </div>
          <div className={clsx("col col--6", styles.heroCode)}>
            <CodeBlock language="bhaus" title="user.bhaus">
              {SAMPLE}
            </CodeBlock>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="BHaus" description="BHaus is a textual software architecture and design language, written by humans and followed by text-generating models.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
