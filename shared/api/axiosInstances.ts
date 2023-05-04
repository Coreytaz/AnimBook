import axios from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'

export const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: process.env.API_URL! }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axios({ url: baseUrl + url, method, data, params })
            return { data: result.data }
        } catch (axiosError) {
            let err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }
