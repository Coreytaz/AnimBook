import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiDeliveriesData } from './types'

export const deliveriesApi = createApi({
    reducerPath: 'deliveries',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['deliveries'],
    endpoints: (builder) => ({
        getDeliveriesStatus: builder.query<ApiDeliveriesData[], string>({
            query: (userId) => ({
                url: routes.getDeliveriesStatusData(userId),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['deliveries'],
        }),
    }),
})

export const deliveriedApi = createApi({
    reducerPath: 'deliveriedApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['deliveriedApi'],
    endpoints: (builder) => ({
        getDeliveriedStatus: builder.query<ApiDeliveriesData[], string>({
            query: (userId) => ({
                url: routes.getDeliveriedApiStatusData(userId),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['deliveriedApi'],
        }),
    }),
})
