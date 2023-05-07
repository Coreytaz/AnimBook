'use client'

import { cartSlice, orderSlice } from '@/entities/cart'
import { catergoriesApi } from '@/entities/catergories'
import { favSlice } from '@/entities/fav'
import { getProductsApi, oneProductApi, viewProductSlice } from '@/entities/product'
import { getViewProductApi } from '@/entities/product/api/getViewProductApi'
import { filtersApi } from '@/entities/sidebar'
import { descriptionApi, reviewsApi } from '@/features/product'
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
    key: 'cart',
    storage: storage,
}

const FavPersistConfig = {
    key: 'fav',
    storage: storage,
    whitelist: ['favoritesId'],
}
const ViewProductPersistConfig = {
    key: 'viewProduct',
    storage: storage,
}

const rootReducer = combineReducers({
    cartSlice: persistReducer(CartPersistConfig, cartSlice),
    orderSlice,
    viewProductSlice: persistReducer(ViewProductPersistConfig, viewProductSlice),
    favSlice: persistReducer(FavPersistConfig, favSlice),
    [catergoriesApi.reducerPath]: catergoriesApi.reducer,
    [oneProductApi.reducerPath]: oneProductApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [descriptionApi.reducerPath]: descriptionApi.reducer,
    [filtersApi.reducerPath]: filtersApi.reducer,
    [getProductsApi.reducerPath]: getProductsApi.reducer,
    [getViewProductApi.reducerPath]: getViewProductApi.reducer,
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
            .concat(oneProductApi.middleware)
            .concat(reviewsApi.middleware)
            .concat(descriptionApi.middleware)
            .concat(filtersApi.middleware)
            .concat(getProductsApi.middleware)
            .concat(getViewProductApi.middleware),
})

export type TypeRootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export default store
