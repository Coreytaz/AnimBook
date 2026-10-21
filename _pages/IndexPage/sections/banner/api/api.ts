import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/query/react'
import { routes } from './routes'
import { ApiBannerData } from './types'

export const bannerApi = createApi({
    reducerPath: 'banner',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['banner'],
    endpoints: (builder) => ({
        getBanner: builder.query<ApiBannerData[], unknown>({
            query: (orderId) => ({
                url: routes.getBannerData(),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['banner'],
        }),
    }),
})
