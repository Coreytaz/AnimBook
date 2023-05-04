import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { cartId: string[] } = {
    cartId: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleProduct(state, action: PayloadAction<string>) {
            if (state.cartId.includes(action.payload)) {
                return { ...state, cartId: state.cartId.filter((it) => it !== action.payload) }
            }
            return { ...state, cartId: [...state.cartId, action.payload] }
        },
    },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
