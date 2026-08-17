import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Declarations Only',
    icon: '{ }',
    description: (
      <>
        No value expressions, no control flow, no arithmetic. A{' '}
        <code>.bhaus</code> file only declares types, contracts, and
        architecture. That keeps it small, diffable, and reviewable like a
        spec, not a program.
      </>
    ),
  },
  {
    title: 'Cross-Language by Design',
    icon: '⇄',
    description: (
      <>
        The type system maps 1:1 onto TypeScript, Go, PHP and Swift.{' '}
        <code>bhaus-cli scaffold</code> turns a design file into real source
        for any of them today.
      </>
    ),
  },
  {
    title: 'Architecture as Code',
    icon: '▦',
    description: (
      <>
        <code>SYSTEM</code>, <code>CONTAINER</code>, <code>COMPONENT</code>{' '}
        and <code>CONNECTION</code> implement the C4 model natively, so your
        architecture diagram lives in version control next to the code it
        describes.
      </>
    ),
  },
  {
    title: 'Real Tooling',
    icon: '⚙',
    description: (
      <>
        A tree-sitter grammar, a Go language server with hover and
        go-to-definition, a linter, and editor support for VS&nbsp;Code and
        Zed. It is not just a spec on paper.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
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
