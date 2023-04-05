import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import os from 'os'; // 노드 API
import Counter from '@/components/Counter';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  console.log('hello - 서버 컴포넌트');
  console.log(os.hostname());
  return (
    <>
      <h1>페이지</h1>
      <Counter></Counter>
    </>
  );
}
