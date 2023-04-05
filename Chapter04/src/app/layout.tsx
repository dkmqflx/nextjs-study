import Link from 'next/link';
import './globals.css';
import styles from './layout.module.css';
import { Nanum_Gothic, Open_Sans } from '@next/font/google';

const sans = Open_Sans({ subsets: ['latin'] });
const gothic = Nanum_Gothic({ weight: '700', subsets: ['latin'] });

export const metadata = {
  title: '제품 사이트',
  description: '제품을 판매하는 곳',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={sans.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header className={styles.header}>
          <h1 className={gothic.className}>Demo Note</h1>
          <nav className={styles.nav}>
            <Link href='/contact'>Contact</Link>
            <Link href='/about'>About</Link>
            <Link href='/products'>Products</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}

/**
 * yarn add next@13.1.7-canary.11
 * 각각의 페이지에 title과 description을 정으해줄 수 있기 때문에 크롤러가 SEO를 잘 할 수 있다
 * Metadata page에 넣으면 해당 페이지에만 적용되지만
 * Layout 파일에 넣으면 해당 페이지와 서브 라우트에도 모두 적용된다
 *
 * head.ts 파일 대신 metadata 사용한다
 *
 * https://beta.nextjs.org/docs/guides/seo
 * https://beta.nextjs.org/docs/api-reference/metadata
 */
