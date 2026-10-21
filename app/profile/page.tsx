import { Metadata } from 'next'
import ProfilePage from './client'


export const metadata: Metadata = {
    title: 'Профиль',
}

const Profile = () => {
    return <ProfilePage />
}

export default Profile
