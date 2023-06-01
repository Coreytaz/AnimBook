import Carousel from '@/entities/carousel'
import { Skeleton } from '@/shared/ui'
import React from 'react'
import { bannerApi } from './api'

const Banner = () => {
    const { data: items, isLoading, isError } = bannerApi.useGetBannerQuery('')
    if (isLoading) {
        return <Skeleton style={{ height: '420px', width: '100%' }} />
    }
    return <Carousel items={items!} />
}

export default Banner
