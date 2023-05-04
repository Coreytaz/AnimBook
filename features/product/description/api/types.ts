export interface DescriptionList {
    [id: string]: string | undefined
    name: string
    description: string
    descriptionHelp?: string
}

export interface ApiProductDescriptionData {
    productSlug: string
    descriptionList: DescriptionList[]
}
