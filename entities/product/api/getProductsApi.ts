import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiProductData, Links, Meta } from './types'

export const getProductsApi = createApi({
    reducerPath: 'products',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getProducts: builder.query<
            {
                items: ApiProductData[]
                meta: Meta
                links: Links
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
