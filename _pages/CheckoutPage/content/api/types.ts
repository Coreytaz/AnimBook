export interface ApiOrderData {
    status: 'succeeded' | 'pending'
    description: string
    confirmation: {
        confirmation_url: string
    }
}

export interface OrderDataWithoutUser {
    username: string
    email: string
    phone: string
    password: string
    postalIndex: string
    apartaments: string
    address: string
}

export interface Products {
    productId: string
    count: number
}

export interface OrderDataWithUser {
    readonly userId: string
    readonly products: Products[]
    readonly postIndex: string
    readonly address: string
    readonly apartaments: string
    readonly amount: number
}
