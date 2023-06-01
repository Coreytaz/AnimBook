export interface ApiOrderData {
    status: 'succeeded' | 'pending'
    description: string
    confirmation: {
        confirmation_url: string
    }
}
