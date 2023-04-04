type Props = {
  params: {
    slug: string;
  };
};

const PantsPage = ({ params }: Props) => {
  return <div>{params.slug}</div>;
};

export default PantsPage;

/**
 * 동적 라우팅은, 기본 페이지는 정적으로 미리 서버에서 만들어주지만
 * params 같이 동적인 부분은 SSR처럼 만들어져서 브라우저에 보내진다
 */
