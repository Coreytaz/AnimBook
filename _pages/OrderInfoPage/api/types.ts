import { ProductProps } from '@/shared/api'

export interface ApiOrderData {
    _id: string
    paymentId: string
    status: string
    address: string
    postIndex: string
    apartaments: string
    created_at: Date
    updated_at: Date
    items: Item[]
}

export interface Item {
    _id: string
    quantity: number
    created_at: Date
    updated_at: Date
    product: ProductProps
}
