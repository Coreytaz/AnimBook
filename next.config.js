/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        appDir: true,
    },
    env: {
        API_URL: process.env.API_URL,
        API_GEO: process.env.API_GEO,
        API_GEO2: process.env.API_GEO2,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        VERCEL_URL: process.env.VERCEL_URL,
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
