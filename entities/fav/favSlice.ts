import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = []

export const favSlice = createSlice({
    name: 'fav',
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

export const favActions = favSlice.actions

export default favSlice.reducer
