import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiProductData } from './types'

export const oneProductApi = createApi({
    reducerPath: 'oneProduct',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['oneProduct'],
    endpoints: (builder) => ({
        getOneProduct: builder.query<ApiProductData, string>({
            query: (slug) => ({
                url: routes.getOneProductData(slug),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['oneProduct'],
        }),
    }),
})
