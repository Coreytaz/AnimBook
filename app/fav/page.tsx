import dynamic from 'next/dynamic'

const FavPage = dynamic(() => import('@/_pages/FavPage'), { ssr: false })

const Fav = () => {
    return <FavPage />
}

export default Fav
