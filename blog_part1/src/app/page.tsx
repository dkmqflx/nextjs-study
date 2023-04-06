import CarouselPosts from '@/components/CarouselPosts';
import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      {/* @ts-expect-error Server Component */}
      <CarouselPosts />
    </>
  );
}

/**
 * @ts-expect-error Server Component
 * 주석 처리해준 이유는 현재버전에서 layouts나 pages가 아닌 곳에서 사용하면,
 * 예를들어 FeaturedPosts처럼 클라이언트 컴포넌트에서 async/await 사용하면 에러 나타나기 때문
 * https://beta.nextjs.org/docs/configuring/typescript#async-server-component-typescript-error
 */
