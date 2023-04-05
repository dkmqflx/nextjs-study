import MeowArticle from '@/components/MeowArticle';
import { getProducts } from '@/service/producs';
import Link from 'next/link';

export default async function ProductsPage() {
  throw new Error('error'); // error.tsx에 있는 부분 나타난다
  // 개발모드 일 때만 나타나고 배포하면 나타나지 않는다
  // 이 때 가장 근접한 error.tsx 파일을 보여준다

  // const products = await getProducts();

  // return (
  //   <>
  //     <h1>제품 소개 페이지!</h1>
  //     <ul>
  //       {products.map((product, index) => (
  //         <li key={index}>
  //           <Link href={`/products/${product.id}`}>{product.name}</Link>
  //         </li>
  //       ))}
  //     </ul>
  //     <MeowArticle></MeowArticle>
  //   </>
  // );
}
