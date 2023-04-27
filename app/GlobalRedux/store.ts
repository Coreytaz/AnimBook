'use client'

import { cartSlice, orderSlice } from '@/entities/cart'
import { catergoriesApi } from '@/entities/catergories'
import { favSlice } from '@/entities/fav'
import { oneProductApi } from '@/entities/product'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const CartPersistConfig = {
    key: 'cartSlice',
    storage: storage,
    blacklist: ['favSlice'],
}

const FavPersistConfig = {
    key: 'favSlice',
    storage: storage,
    blacklist: ['cartSlice'],
}

const rootReducer = combineReducers({
    cartSlice: persistReducer(CartPersistConfig, cartSlice),
    orderSlice,
    favSlice: persistReducer(FavPersistConfig, favSlice),
    [catergoriesApi.reducerPath]: catergoriesApi.reducer,
    [oneProductApi.reducerPath]: oneProductApi.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(catergoriesApi.middleware)
            .concat(oneProductApi.middleware),
})

export type TypeRootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export default store
