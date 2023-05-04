import dynamic from 'next/dynamic'

const ProfilePage = dynamic(() => import('@/_pages/ProfilePage'), { ssr: false })

const Profile = () => {
    return <ProfilePage />
}

export default Profile
