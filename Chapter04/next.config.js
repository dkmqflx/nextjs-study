/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/products/deleted_forever',
        destination: '/products',
        permanent: true,
        // 영원히 옮겨갔다는 것을 search engine에게 308 status 코드 보내준다
        // 그래서 이 페이지 영원히 변경되었으니까 캐시해다서 음번에도 이 페이지 오면 똑같이 처리해도된다는 것을 알려준다
      },
    ];
  },

  // redirects 경로가 바뀌거나 했을 때 예전 사용자 뿐 아니라 검색엔진처럼 페이지를 캐시한 사용자들에 대해서 혼란스럽지 않도록 처리하는 것
  // rewrites는 내부적으로 복잡하고 보안상 민감한 key가 있는 url이 있다면 외부에 공개하면사용자가 볼 수 있기 때문에
  // 복잡한 url을 덮어쓸 수 있도록 한다
  // 그렇기 때문에 /ellie만 입력해도 바로 /about/me/ellie로 접근할 수 있도록 한다
  // 아래예시중에 products가 너무 이름이 길다 items로 바꾸자고 결정하는 경우에도 rewrites로 처리할 수 있다
  async rewrites() {
    return [
      {
        source: '/ellie',
        destination: '/about/me/ellie',
      },
      {
        source: '/items/:slug',
        destination: '/products/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
