import { Metadata } from 'next'
import FavPage from './client'


export const metadata: Metadata = {
    title: 'Избранное',
}

const Fav = () => {
    return <FavPage />
}

export default Fav
