import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiProductData } from './types'

export const getProductsApi = createApi({
    reducerPath: 'products',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getProducts: builder.query<
            {
                categoryName: string
                products: ApiProductData[]
            },
            string
        >({
            query: (slug) => ({
                url: routes.getProductsData(slug),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['products'],
        }),
    }),
})
