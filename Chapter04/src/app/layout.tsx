import './globals.css';
import styles from './layout.module.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header className={styles.header}>
          <h1>Demo Note</h1>
          <nav className={styles.nav}>
            <a href=''>Contact</a>
            <a href=''>About</a>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}

// A layout is UI that is shared between routes.
// /contact, /product로 이동해도 공통으로 위에 정의한 header 부분 존재한다
