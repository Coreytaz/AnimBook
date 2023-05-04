import { ApiProductData } from '@/entities/product'

export interface ApiCatergoriesData {
    _id: string
    name: string
    description: string
    img: string
    slug: string
    parent: string | null
}
export interface ApiSubCatergoriesData {
    categoryName: string
    subcategories: ApiCatergoriesData[]
    products: ApiProductData[]
}
