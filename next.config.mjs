/** @type {import("next").NextConfig} */
/* Build date in IST (yyyy-mm-dd): essays dated after this stay unpublished until a later deploy. */
const BUILD_DATE = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
const nextConfig = { env: { NEXT_PUBLIC_BUILD_DATE: BUILD_DATE }, reactStrictMode: true, poweredByHeader: false, images: { deviceSizes: [640, 828, 1080, 1200, 1920], formats: ["image/avif", "image/webp"] } };
export default nextConfig;
