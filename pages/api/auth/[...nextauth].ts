import { api } from '@/shared/api'
import NextAuth, { NextAuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { refreshAccessToken } from '@/shared/lib/auth'

const useSecureCookies = !!process.env.VERCEL_URL

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
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
                console.log(res)
                const user = await res.data

                if (user) {
                    return user
                } else return null
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    cookies: {
        sessionToken: {
            name: `${useSecureCookies ? '__Secure-' : ''}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                domain: '.anim-book.vercel.app',
                secure: useSecureCookies,
            },
        },
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user?.email) {
                const { exp } = jwt.verify(user.token, process.env.NEXTAUTH_SECRET!) as any
                return { ...token, ...user, refreshTokenExpires: exp }
            }

            if (Date.now() / 1000 < token?.refreshTokenExpires!) {
                try {
                    const res = await refreshAccessToken(token.token)
                    const { exp } = jwt.verify(res.data.token, process.env.NEXTAUTH_SECRET!) as any
                    return { ...token, ...res.data, refreshTokenExpires: exp }
                } catch (error) {
                    console.log(error)
                }
            }

            return { ...token, ...user }
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            session.expires = token.refreshTokenExpires as any
            if (Date.now() / 1000 > token.refreshTokenExpires!) {
                return Promise.reject({
                    error: new Error(
                        'Срок действия токена обновления истек. Войдите в систему еще раз, чтобы получить новый токен обновления.'
                    ),
                })
            }
            session.user = token as any

            return Promise.resolve(session)
        },
    },
    pages: {
        signIn: '/auth',
    },
}

export default NextAuth(authOptions)
