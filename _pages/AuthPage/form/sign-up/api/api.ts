import { api, ApiResponseData } from '@/shared/api'
import { User } from 'next-auth'
import { routes } from './routes'
import { ApiSignUpData } from './types'

export const signUp = (data: ApiSignUpData) => {
    return api.post<any, ApiResponseData<User>>(routes.signUp(), data, {
        baseURL: 'http://localhost:5000/api',
    })
}
