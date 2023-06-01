import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartSliceType {
    productId: string
    count: number
}

const initialState: { cartId: CartSliceType[] } = {
    cartId: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleProduct(state, action: PayloadAction<string>) {
            if (state.cartId.find((item) => item.productId === action.payload)) {
                return {
                    ...state,
                    cartId: state.cartId.filter((item) => item.productId !== action.payload),
                }
            }
            state.cartId.push({ productId: action.payload, count: 1 })
        },
        plusCountProduct(state, action: PayloadAction<string>) {
            state.cartId = state.cartId.map((item) => {
                if (item.productId === action.payload) {
                    return {
                        ...item,
                        count: item.count + 1,
                    }
                }
                return item
            })
        },
        minusCountProduct(state, action: PayloadAction<string>) {
            state.cartId = state.cartId.map((item) => {
                if (item.productId === action.payload) {
                    return {
                        ...item,
                        count: item.count - 1,
                    }
                }
                return item
            })
        },
        clearAllCart(state) {
            state.cartId = []
        },
    },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
