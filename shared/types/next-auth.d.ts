import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
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
}
