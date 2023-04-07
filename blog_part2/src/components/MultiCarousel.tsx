'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
/**
 * 외부 라이브러리를 사용할 때, 이렇게 별도의 컴포넌트로 분리하면
 * 라이브러리에 대한 책임을 한단계 감싸주면
 * 라이브러리를 교체할 때 해당 컴포넌트에서만 수정을 해주면 되낟
 */

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

type Props = {
  children: React.ReactNode;
};
export default function MultiCarousel({ children }: Props) {
  return (
    <Carousel infinite autoPlay responsive={responsive} itemClass='m-2'>
      {children}
    </Carousel>
  );
}
