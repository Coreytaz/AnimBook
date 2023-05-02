import { api, ApiResponseData, ProductProps } from '@/shared/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
    { state: { cartSlice: { cartId: string[] } } }
>('order/get-order-product', async function (_, { getState }) {
    const order = getState().cartSlice.cartId
    const { data } = await api.post<any, ApiResponseData<ProductProps[]>>('/getOneProductById', {
        productId: order,
    })
    return data
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
