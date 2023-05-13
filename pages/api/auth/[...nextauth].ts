import { api } from '@/shared/api'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const res = await api.post(
                    '/auth/login',
                    {
                        email: credentials?.email,
                        password: credentials?.password,
                    },
                    {
                        baseURL: 'http://localhost:5000/api',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                const user = await res.data

                if (user) {
                    return user
                } else return null
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token as any

            return session
        },
    },
    pages: {
        signIn: '/auth',
    },
}

export default NextAuth(authOptions)
