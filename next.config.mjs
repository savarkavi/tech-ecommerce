/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "img.clerk.com",
    ],
  },
  serverRuntimeConfig: {
    functionTimeout: 30,
  },
};

export default nextConfig;
