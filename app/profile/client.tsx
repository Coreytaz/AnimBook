'use client'

import dynamic from 'next/dynamic'

const ProfilePage = dynamic(() => import('@/_pages/ProfilePage'), { ssr: false })

export default ProfilePage
