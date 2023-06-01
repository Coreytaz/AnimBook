import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const FavPage = dynamic(() => import('@/_pages/FavPage'), { ssr: false })

export const metadata: Metadata = {
    title: 'Избранное',
}

const Fav = () => {
    return <FavPage />
}

export default Fav
