'use client'; // 클라이언트 컴포넌트 명시해준다

import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  console.log('counter - 클라이언트 컴포넌트');

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount((num) => num + 1)}>Counter</button>
    </>
  );
};

export default Counter;
