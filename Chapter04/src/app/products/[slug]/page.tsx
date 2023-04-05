import { getProduct, getProducts } from '@/service/producs';
import { notFound } from 'next/navigation';

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

const PantsPage = ({ params: { slug } }: Props) => {
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }
  // 서버 팡리에 있는데이터 중 해당 제품의 정보를 찾아서 그걸 보여주도록 한다
  return <div>{product}</div>;
};

export default PantsPage;

export function generateStaticParams() {
  // 모든 제품의 페이지를 미리 만들어 둘 수 있도록 한다 (SSG)
  const products = getProducts();
  return products.map((product) => ({
    slug: product,
  }));
}
