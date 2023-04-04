import Link from 'next/link';
import styles from './layout.module.css';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className={styles.nav}>
        <Link href='/products/woman'>여성옷</Link>
        <Link href='/products/man'>남성옷</Link>
      </nav>
      <section className={styles.product}> {children}</section>
    </>
  );
}

/**
 * product 경로 안에서 공통의 컴포넌트를 만드는 방법
 * layout.tsx 파일을 만들어주면 된다
 */
