import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiCatergoriesData, ApiSubCatergoriesData } from './types'

export const catergoriesApi = createApi({
    reducerPath: 'catergories',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['catergories'],
    endpoints: (builder) => ({
        getCatergories: builder.query<ApiCatergoriesData[], string>({
            query: () => ({
                url: routes.getСatergoriesAllData(),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['catergories'],
        }),
        getPopularCatergories: builder.query<ApiCatergoriesData[], string>({
            query: () => ({
                url: routes.getPopularСatergoriesAllData(),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['catergories'],
        }),
        getSubCatergories: builder.query<ApiSubCatergoriesData, string>({
            query: (slug) => ({
                url: routes.getSubCatergoriesData(slug),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['catergories'],
        }),
    }),
})
