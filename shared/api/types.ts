export interface CatergoriesListProps {
    title: string
    description: string
    img: string
    altImg: string
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
    [key: string]: string | undefined
    name: string
    description: string
    descriptionHelp?: string
}
