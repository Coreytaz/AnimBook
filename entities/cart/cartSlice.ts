import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleProduct(state, action: PayloadAction<string>) {
            if (state.includes(action.payload)) {
                return state.filter((it) => it !== action.payload)
            }
            return [...state, action.payload]
        },
    },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
