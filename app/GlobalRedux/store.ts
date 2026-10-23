'use client'

import { cartSlice, orderSlice } from '@/entities/cart'
import { catergoriesApi } from '@/entities/catergories'
import { favSlice } from '@/entities/fav'
import { getProductsApi, oneProductApi, viewProductSlice } from '@/entities/product'
import { getViewProductApi } from '@/entities/product/api/getViewProductApi'
import { filtersApi } from '@/entities/sidebar'
import { descriptionApi, reviewsApi } from '@/features/product'
import { bannerApi } from '@/_pages/IndexPage/sections/banner/api'
import { getOrderiesApi } from '@/_pages/OrderInfoPage/api'
import { deliveriedApi, deliveriesApi } from '@/_pages/ProfilePage/content/section/api'
import { orderApi } from '@/_pages/ResultPage/api'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : {
              getItem: async (_key: string) => null,
              setItem: async (_key: string, value: string) => value,
              removeItem: async (_key: string) => {},
          }

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
    [orderApi.reducerPath]: orderApi.reducer,
    [deliveriesApi.reducerPath]: deliveriesApi.reducer,
    [deliveriedApi.reducerPath]: deliveriedApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [getOrderiesApi.reducerPath]: getOrderiesApi.reducer,
})

export const makeStore = () =>
    configureStore({
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
                .concat(getViewProductApi.middleware)
                .concat(deliveriesApi.middleware)
                .concat(deliveriedApi.middleware)
                .concat(getOrderiesApi.middleware)
                .concat(bannerApi.middleware)
                .concat(orderApi.middleware),
    })

export type AppStore = ReturnType<typeof makeStore>
export type TypeRootState = ReturnType<AppStore['getState']>
