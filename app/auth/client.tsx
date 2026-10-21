'use client'

import dynamic from 'next/dynamic'

const AuthPage = dynamic(() => import('@/_pages/AuthPage'), { ssr: false })

export default AuthPage
