'use client'

import { signIn, useSession } from 'next-auth/react'
import { refreshAccessToken } from '../api'

export const useRefreshToken = () => {
    const { data: session, update } = useSession()

    const refreshToken = async () => {
        if (!session?.user) {
            await signIn()
            return undefined
        }
        const res = await refreshAccessToken(session.user.token)
        await update({ user: { ...session.user, token: res.data.token } })
        return res.data.token
    }
    return refreshToken
}
