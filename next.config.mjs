/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["lh5.googleusercontent.com", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        hostname: "lh5.googleusercontent.com"
      },
      {
        hostname: "lh3.googleusercontent.com"
      },
      {
        hostname: "streetviewpixels-pa.googleapis.com"
      },
    ],
  }
};

export default nextConfig;