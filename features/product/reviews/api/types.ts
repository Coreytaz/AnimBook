export interface ApiReviewsData {
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

export interface ApiCreateReviewsData {
    slug: string
    discription: string
    rating: number
    userId: string
}
