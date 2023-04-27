import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiCatergoriesData } from './types'

export const catergoriesApi = createApi({
    reducerPath: 'catergories',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['catergories'],
    endpoints: (builder) => ({
        getCatergories: builder.query<ApiCatergoriesData[], string>({
            query: () => ({
                url: routes.getСatergoriesData(),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['catergories'],
        }),
    }),
})
