/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        externalDir: true,
        appDir: true,
    },
    env: {
        API_URL: 'http://localhost:3000/api',
    },
}

module.exports = nextConfig
