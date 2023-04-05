import MeowArticle from '@/components/MeowArticle';
import { getProducts } from '@/service/producs';
import Image from 'next/image';
import Link from 'next/link';
import clothesImage from '../../../public/images/clothes.jpg';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <h1>제품 소개 페이지!</h1>
      <Image src={clothesImage} alt='Cloth' priority />
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <MeowArticle></MeowArticle>
    </>
  );
}

/**
 * Element탭에서 보면 srcset 사용해서 화면 사이즈별로 이미지가 보이도록 최적화된 것을 확인할 수 있다
 * static한 이미지의 경우에는 너비와높이 지정하지 않아도 이미지에 대한 정보 있기 때문에 너비, 높이 지정하지 않아도 되지만
 * 서버에서 받아오는 경우에는 너비와 높이를 지정 해주어야 한다
 * 그리고 next config에 등록을 외부 이미지 주소를 등록해주어야 하낟
 * 이렇게 width, height 정해주면, 이미지가 다운받는 중에 이미지가 화면에 없어도  layout shift가 발생하지 않는다
 * 한 페이지 안에서 사용하는 이미지가 여러개인 경우, priority속성을 통해 우선순위를 정해서 next js에게 말해줄 수 있다
 *
 */
