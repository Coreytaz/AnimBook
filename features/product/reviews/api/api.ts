import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiReviewsData } from './types'

export const reviewsApi = createApi({
    reducerPath: 'reviews',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['reviews'],
    endpoints: (builder) => ({
        getReviews: builder.query<ApiReviewsData[], string>({
            query: (slug) => ({
                url: routes.getReviewsData(slug),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['reviews'],
        }),
    }),
})
