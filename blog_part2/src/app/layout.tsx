import './globals.css';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sans = Open_Sans({ subsets: ['latin'] });

// head 태그에서 아래 내용을 확인할 수 있다
export const metadata = {
  title: {
    default: '엘리의 블로그', // 기본 값
    template: '엘리의 블로그 | %s', // 템플릿을 사용하면 원하는 텍스트가 %s가 된다
  },
  description: '풀스택 개발자 엘리의 블로그',
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
      <body className='flex flex-col w-full max-w-screen-2xl mx-auto'>
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
