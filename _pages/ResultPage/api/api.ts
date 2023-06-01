import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiOrderData } from './types'

export const orderApi = createApi({
    reducerPath: 'orderStatus',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['orderStatus'],
    endpoints: (builder) => ({
        getOrderStatus: builder.query<ApiOrderData, string>({
            query: (orderId) => ({
                url: routes.getOrderStatusData(orderId),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['orderStatus'],
        }),
    }),
})
