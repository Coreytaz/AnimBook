'use client'

import { signIn, useSession } from 'next-auth/react'
import { refreshAccessToken } from '../api'

export const useRefreshToken = () => {
    const { data: session } = useSession()

    const refreshToken = async () => {
        const res = await refreshAccessToken(session?.user?.token!)

        if (session) session.user!.token = res.data.token
        else signIn()
    }
    return refreshToken
}
