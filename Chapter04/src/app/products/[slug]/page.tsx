import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

// 다이나믹하게 메타 데이터 만드는 방법
// title 태그가 변경되는 것을 확인할 수 있다
export function generateMetadata({ params }: Props) {
  return {
    title: `제품의 이름 ${params.slug}`,
  };
}

const PantsPage = ({ params }: Props) => {
  if (params.slug === 'nothing') {
    notFound(); // not-found.tsx로 이동한다
  }
  return <div>{params.slug}</div>;
};

export default PantsPage;

export function generateStaticParams() {
  const products = ['pants', 'skirt'];
  return products.map((product) => ({
    slug: product,
  }));
}
