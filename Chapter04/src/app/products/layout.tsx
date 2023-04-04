import Link from 'next/link';
import styles from './layout.module.css';
import { Metadata } from 'next';

/**
 * products 페이지 이동하면 아래 데이터에 해당 하는 태그 있는 것을 확인할 수 있다
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
