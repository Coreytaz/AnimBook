import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiProductDescriptionData } from './types'

export const descriptionApi = createApi({
    reducerPath: 'description',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['description'],
    endpoints: (builder) => ({
        getDescription: builder.query<ApiProductDescriptionData, string>({
            query: (slug) => ({
                url: routes.getDescriptionProductData(slug),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['description'],
        }),
    }),
})
