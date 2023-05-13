'use client'

import { api } from '@/shared/api'
import { signIn, useSession } from 'next-auth/react'

export const useRefreshToken = () => {
    const { data: session } = useSession()

    const refreshToken = async () => {
        const res = await api.post('/auth/refresh')

        if (session) session.user!.token = res.data.token
        else signIn()
    }
    return refreshToken
}
