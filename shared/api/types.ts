import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

interface ImageArray {
    src: string
    alt: string
}
export interface CatergoriesListProps {
    _id: string
    name: string
    description: string
    img: string
    slug: string
    parent: string | null
}

export type Publisher = {
    id: string
    catergoriesId: string[]
    slug: string
    name: string
    city: string
}

export interface ProductProps {
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

export interface CarouselItemProps {
    url: string
    img: string
    caption: string
}

export interface IBreadcrumbsLocationState {
    id: string
    path: string
    title: string
    url: string
}

export interface ProductDescription {
    productSlug: string
    descriptionList: DescriptionList[]
}

export interface DescriptionList {
    [id: string]: string | undefined
    name: string
    description: string
    descriptionHelp?: string
}

export interface ReviewsProps {
    _id: string
    productSlug: string
    discription: string
    created_at: Date
    updated_at: Date
    user: {
        username: string
    }
    rating: number
}

export interface ApiErrorResponse {
    data: {
        token: string
        ttl: string
        type: string
    }
    extendedMessage: string
    message: string
}

export interface ApiError<T = ApiErrorResponse> extends AxiosError<T> {}

export interface ApiResponse<T = ApiResponseData> extends AxiosResponse<T> {}
export interface ApiResponseData<T = any> {
    data: T
    message: string
}

export interface ApiRequestConfig<T = any> extends AxiosRequestConfig<T> {}
