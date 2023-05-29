import { Publisher } from '@/shared/api'

interface ImageArray {
    src: string
    alt: string
}
export interface ApiProductData {
    _id: string
    catergoriesId: string
    name: string
    slug: string
    price: number
    rating: {
        rating: number
    }[]
    img: ImageArray[]
    discription: string
    publisher?: Publisher
    type?: string
}

export interface Links {
    first: string
    previous: string
    next: string
    last: string
}

export interface Meta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}
