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
    async headers() {
        return [
            {
                source: '/_next/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: 'https://anim-book.vercel.app' },
                ],
            },
        ]
    },
}

module.exports = nextConfig
