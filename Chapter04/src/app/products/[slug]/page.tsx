import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

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

/**
 * 미리 만들어주고 싶은 페이지를 미리 명시해줄 수 있다
 * In the app directory, getStaticPaths is replaced with generateStaticParams.
 * build 해주면 /products/pants , /products/skirt 두 페이지가 SSG로 만들어진 것을 확인할 수 있다
 */
