'use client'; // 클라이언트 컴포넌트 명시해준다

import Image from 'next/image';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  console.log('counter - 클라이언트 컴포넌트');

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount((num) => num + 1)}>Counter</button>
      <Image
        src='https://images.unsplash.com/photo-1441986300917-64674bd600d8'
        alt='shop'
        width={400}
        height={400}
      ></Image>
    </>
  );
};

export default Counter;
