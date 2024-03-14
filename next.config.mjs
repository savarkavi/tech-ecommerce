/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "img.clerk.com",
    ],
  },
  bodyParser: false,
};

export default nextConfig;
