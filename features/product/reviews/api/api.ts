import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiCreateReviewsData, ApiReviewsData } from './types'

export const reviewsApi = createApi({
    reducerPath: 'reviews',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['reviews'],
    endpoints: (builder) => ({
        getReviews: builder.query<
            {
                rating: ApiReviewsData[]
                totalRating: number
                countReviews: number
                filtersCounts: { [key: number]: string }
            },
            { slug: string; filter: string[] }
        >({
            query: ({ slug, filter }) => ({
                url: routes.getReviewsData(slug, filter),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['reviews'],
        }),
        addReviews: builder.mutation<ApiReviewsData, ApiCreateReviewsData>({
            query: (data) => {
                return {
                    url: routes.createReviewsData(),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data,
                }
            },
            invalidatesTags: () => ['reviews'],
        }),
    }),
})
