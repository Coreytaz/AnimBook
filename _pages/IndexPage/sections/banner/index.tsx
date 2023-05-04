import Carousel from '@/entities/carousel'
import React from 'react'

const items = [
    {
        src: 'https://via.placeholder.com/1920x1080',
        alt: 'placeholder',
        caption: 'caption',
    },
    {
        src: 'https://via.placeholder.com/1920x1080',
        alt: 'placeholder',
        caption: 'caption',
    },
    {
        src: 'https://via.placeholder.com/1920x1080',
        alt: 'placeholder',
        caption: 'caption',
    },
]

const Banner = () => {
    return <Carousel items={items} />
}

export default Banner
