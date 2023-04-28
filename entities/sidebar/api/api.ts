import { axiosBaseQuery } from '@/shared/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { routes } from './routes'
import { ApiFiltersData } from './types'

export const filtersApi = createApi({
    reducerPath: 'filters',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['filters'],
    endpoints: (builder) => ({
        getFilters: builder.query<ApiFiltersData, string>({
            query: (slug) => ({
                url: routes.getFiltersData(slug),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }),
            providesTags: () => ['filters'],
        }),
    }),
})
