import GoProductsButton from '@/components/GoProductsButton';
import { getProduct, getProducts } from '@/service/producs';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Props) {
  return {
    title: `제품의 이름 ${params.slug}`,
  };
}

/**
 * 서버 컴포넌트는 async 함수로 정의 가능(즉, 서버 컴포넌트를 async 함수로 정의 하는 것은 전혀 이상하지 않음)
 * 다만, 서버 컴포넌트 "자체"가 아직은 실험적 기능으로 자주 보이는 패턴이 아님
 * https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md
 */

export const revalidate = 3;

const ProductsPage = async ({ params: { slug } }: Props) => {
  console.log('slug', slug);
  const product = await getProduct(slug);

  if (!product) {
    // notFound();
    redirect('/products'); // 동적으로 redirect
  }
  // 서버 팡리에 있는데이터 중 해당 제품의 정보를 찾아서 그걸 보여주도록 한다
  return (
    <>
      <h1>{product.name} : 제품 설명 페이지</h1>
      <Image
        src={`/images/${product.image}`}
        alt={product.name}
        width={300}
        height={300}
      />
      {/* 서버 컴포넌트는 아래처럼 버튼 클릭 이벤트 처리할 수 없기 때문에 클라이언트 컴포넌트로 빼주는 작업이 필요하다  */}
      <GoProductsButton></GoProductsButton>
    </>
  );
};

export default ProductsPage;

export async function generateStaticParams() {
  // 모든 제품의 페이지를 미리 만들어 둘 수 있도록 한다 (SSG)
  // yarn build하고 .next/server/app/products 보면 html 파일들 만들어진 것 확인할 수 있다
  const products = await getProducts();
  console.log('generateStaticParams - products', products);
  return products.map((product) => ({
    slug: product.id,
  }));
}

/**
 * The generateStaticParams function can be used in combination with dynamic route segments
 * to statically generate routes at build time instead of on-demand at request time.
 */
