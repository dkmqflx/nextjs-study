'use client';

import { useEffect, useState } from 'react';

const MeowArticle = () => {
  const [text, setText] = useState('데이터 준비중 ..');

  useEffect(() => {
    fetch('https://meowfacts.herokuapp.com')
      .then((res) => res.json())
      .then((data) => setText(data.data[0]));
  }, []);

  return <article>{text}</article>;
};
/**
 * html 파일 보면  컴포넌트 해당하는 데이터가 없는 것을 확인할 수 있다
 */

export default MeowArticle;
