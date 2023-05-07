import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiProductData } from './types'

export const getViewProductApi = createApi({
    reducerPath: 'viewProducts',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['viewProducts'],
    endpoints: (builder) => ({
        getViewProducts: builder.query<ApiProductData[], string>({
            query: (productId) => ({
                url: routes.getViewProductsData(productId),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['viewProducts'],
        }),
    }),
})
