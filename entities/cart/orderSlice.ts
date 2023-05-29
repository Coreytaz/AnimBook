import { api, ApiResponseData, ProductProps as Product } from '@/shared/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CartSliceType } from './cartSlice'

interface ProductProps extends Product {
    count: number
}

interface OrderSliceType {
    orderProduct: ProductProps[]
    status: string | null
    error: string | null
}

const initialState: OrderSliceType = {
    orderProduct: [],
    status: null,
    error: null,
}

export const getOrderProduct = createAsyncThunk<
    ProductProps[],
    undefined,
    { state: { cartSlice: { cartId: CartSliceType[] } } }
>('order/get-order-product', async function (_, { getState }) {
    const order = getState().cartSlice.cartId
    const { data } = await api.post<any, ApiResponseData<ProductProps[]>>('/product/id', {
        productsId: order.map((item) => item.productId),
    })
    return data.map((item) => {
        const count = order.find((i) => i.productId === item._id)?.count!
        return {
            ...item,
            count,
        }
    })
})

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getOrderProduct.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(getOrderProduct.fulfilled, (state, action) => {
            state.status = 'resolved'
            state.orderProduct = action.payload
        })
    },
})

export const cartActions = orderSlice.actions

export default orderSlice.reducer
