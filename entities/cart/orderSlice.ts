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
    requestId?: string
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
    if (!order.length) return []
    const { data } = await api.post<any, ApiResponseData<ProductProps[]>>('/product/id', {
        productsId: order.map((item) => item.productId),
    })
    return data.map((item) => {
        const count = getState().cartSlice.cartId.find((i) => i.productId === item._id)?.count ?? 0
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
        builder.addCase(getOrderProduct.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
            state.requestId = action.meta.requestId
        })
        builder.addCase(getOrderProduct.fulfilled, (state, action) => {
            if (state.requestId !== action.meta.requestId) return
            state.status = 'resolved'
            state.orderProduct = action.payload
            state.requestId = undefined
        })
        builder.addCase(getOrderProduct.rejected, (state, action) => {
            if (state.requestId !== action.meta.requestId) return
            state.status = 'error'
            state.error = action.error.message || 'Не удалось загрузить товары корзины'
            state.requestId = undefined
        })
    },
})

export const cartActions = orderSlice.actions

export default orderSlice.reducer
