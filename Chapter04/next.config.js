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
};

module.exports = nextConfig;
