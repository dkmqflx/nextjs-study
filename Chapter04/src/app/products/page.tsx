import { getProducts } from '@/service/producs';
import Link from 'next/link';

/**
 * yarn build 후 실행하면
 * 고양이에 대한 factText 변하지 않는다
 * 그 이유는 서버가 빌드될 때 처음 fetch한 다음 그 데이터를 쓰기 때문이다
 */

export default async function ProductsPage() {
  // 서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그걸 보여주도록 한다
  const products = await getProducts();
  const res = await fetch('https://meowfacts.herokuapp.com', {
    next: {
      revalidate: 3,
      // cache: 'no-store'
    },
  });
  // 얼마만큼 자주 fetch할지 정할수 있다. 3초마다 되는 ISR이 된다
  // revalidate가 0이면, SSR 처럼 작동해서 요청할 때 마다 렌더링이 된다
  // cache 옵션을 사용할수도 있다.
  // no-store 사용하면 SSR처럼 작동한다

  const data = await res.json();
  const factText = data.data[0];

  return (
    <>
      <h1>제품 소개 페이지!</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <article>{factText}</article>
    </>
  );
}
