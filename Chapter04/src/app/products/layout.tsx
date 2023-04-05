import Link from 'next/link';
import styles from './layout.module.css';
import { Metadata } from 'next';

/**
 * loading.tsx 사용하면 children 컴포넌트 부분을 리액트 suspense로 감싸준다
 */

export const metadata: Metadata = {
  title: '제품 사이트 | 전체 제품 확인',
  description: '제품을 확인하는 곳',
};

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
