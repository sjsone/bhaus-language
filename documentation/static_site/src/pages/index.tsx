import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

const SAMPLE_SOURCE = `VERSION 0.1

CLASS Domain/User:
    PUBLIC id: Integer
    PUBLIC name: String
    PUBLIC email: String

    PUBLIC displayName(): String
        > return email if name empty`;

const SAMPLE_TARGET_PHP = `namespace Domain;

class User {
    public int $id;
    public string $name;
    public string $email;

    public function displayName(): string {
        // TODO: return email if name empty
        throw new \Exception('not implemented');
    }
}`;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--6", styles.heroText)}>
            <Heading as="h1" className="hero__title">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <img style={{ height: "9rem", marginRight: "0rem" }} src="/bhaus-language/img/logo.svg"></img>
                {siteConfig.title}
              </div>
            </Heading>
            <p className="hero__subtitle" style={{ lineHeight: "1.5rem" }}>
              Architecture and Design
              <br />
              <span style={{ fontSize: "1.125rem" }}>for Software Engineering</span>
            </p>
            <p className={styles.heroLead}>
              BHaus is a design language to keep programming by hand, in a world of LLMs and coding agents.
            </p>
            <p className={styles.heroLead}>
              A <code>.bhaus</code> file defines the types, contracts and architecture of your system. It keeps the design precise, easy to compare and
              ready for an LLM (or a teammate) to implement.
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
              {SAMPLE_SOURCE}
            </CodeBlock>
            <br />
            <CodeBlock language="php" title="Domain/Entity/User.php">
              {SAMPLE_TARGET_PHP}
            </CodeBlock>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="BHaus" description="BHaus is a design language for software systems. You write it by hand and models can read it.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
