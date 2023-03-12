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
    rating: number
    img: string
    publisher?: Publisher
    type?: string
}

export interface AbstractPropsSvg {
    fill?: string
    filled?: boolean
    size?: number
    height?: number
    width?: number
    label?: string
}

export interface CarouselItemProps {
    src: string
    alt: string
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
    description: string
    date: Date
    name: string
    rating: number
}
