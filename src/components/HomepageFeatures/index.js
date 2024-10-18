import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'NextAuth.js 공식문서',
    Svg: require('@site/static/img/nextauth_logo.svg').default,
    description: (
      <>
        <a href='https://next-auth.js.org/'>바로가기</a>
      </>
    ),
  },
  {
    title: '',
    Svg: require('@site/static/img/translation.svg').default,
    description: (
      <>
        이 사이트는 공식문서의 영어를 비공식으로 한국어 번역하였습니다<br />
        이 사이트내에서 발견한 문제사항은 꼭 아래 이메일로 보내주세요
      </>
    ),
  },
  {
    title: '오역, 오탈자등 기타 문의는 여기입니다',
    Svg: require('@site/static/img/email.svg').default,
    description: (
      <>
        bg@wsbox.pw
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
