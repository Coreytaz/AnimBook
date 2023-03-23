import { ProductProps } from '@/shared/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderSliceType {
    favoritesId: string[]
    favorites: {
        favoritesItems: ProductProps[]
        status: string | null
        error: string | null
    }
}

const initialState: OrderSliceType = {
    favoritesId: [],
    favorites: {
        favoritesItems: [],
        status: null,
        error: null,
    },
}

export const getFavProduct = createAsyncThunk<
    ProductProps[],
    undefined,
    { state: { favSlice: OrderSliceType } }
>('order/get-fav-product', async function (_, { getState }) {
    const favId = getState().favSlice.favoritesId
    const response = await fetch('http://localhost:3000/api/getOneProductById', {
        method: 'POST',
        body: JSON.stringify(favId),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data: ProductProps[] = await response.json()
    return data
})

export const favSlice = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        toggleProduct(state, action: PayloadAction<string>) {
            if (state.favoritesId.includes(action.payload)) {
                return {
                    ...state,
                    favoritesId: state.favoritesId.filter((it) => it !== action.payload),
                }
            }
            return { ...state, favoritesId: [...state.favoritesId, action.payload] }
        },
    },
    extraReducers(builder) {
        builder.addCase(getFavProduct.pending, (state) => {
            state.favorites.status = 'loading'
            state.favorites.error = null
        })
        builder.addCase(getFavProduct.fulfilled, (state, action) => {
            state.favorites.status = 'resolved'
            state.favorites.favoritesItems = action.payload
        })
    },
})

export const favActions = favSlice.actions

export default favSlice.reducer
