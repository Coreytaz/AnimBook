'use client'

import { cartSlice, orderSlice } from '@/entities/cart'
import { favSlice } from '@/entities/fav'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        cartSlice,
        orderSlice,
        favSlice,
    },
})

export type TypeRootState = ReturnType<typeof store.getState>
export default store
