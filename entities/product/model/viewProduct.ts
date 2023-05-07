import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface viewProductSliceType {
    viewProductId: string[]
}

const initialState: viewProductSliceType = {
    viewProductId: [],
}

export const viewProductSlice = createSlice({
    name: 'viewProduct',
    initialState,
    reducers: {
        toggleProduct(state, action: PayloadAction<string>) {
            if (!state.viewProductId.includes(action.payload)) {
                return { ...state, viewProductId: [...state.viewProductId, action.payload] }
            }
        },
        delProduct(state, action: PayloadAction<string>) {
            state.viewProductId = state.viewProductId.filter((it) => it !== action.payload)
        },
    },
})

export const viewProductActions = viewProductSlice.actions

export default viewProductSlice.reducer
