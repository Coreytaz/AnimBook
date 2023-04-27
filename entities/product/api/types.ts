import { Publisher } from '@/shared/api'

export interface ApiProductData {
    _id: string
    catergoriesId: string
    name: string
    slug: string
    price: number
    rating: number
    img: string
    discription: string
    publisher?: Publisher
    type?: string
}
