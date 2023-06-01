import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ProfilePage = dynamic(() => import('@/_pages/ProfilePage'), { ssr: false })

export const metadata: Metadata = {
    title: 'Профиль',
}

const Profile = () => {
    return <ProfilePage />
}

export default Profile
