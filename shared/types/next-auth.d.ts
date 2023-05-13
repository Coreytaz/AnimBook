import NextAuth from 'next-auth'
// types/next-auth.d.ts

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
        refreshTokenExpires?: number
        accessTokenExpires?: string
        refreshToken?: string
        token?: string
        error?: string
        user?: User
    }

    interface User {
        id: string
        email: string
        username?: string
        phone: string
        address?: string
        token: string
        created_at: Date
        updated_at: Date
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        refreshTokenExpires?: number
        accessTokenExpires?: number
        refreshToken?: string
        token: string
        exp?: number
        iat?: number
        jti?: string
    }
}
