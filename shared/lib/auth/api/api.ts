import { api, ApiResponseData } from '@/shared/api'
import { routes } from './routes'
import { ApiRefreshData } from './types'

export const refreshAccessToken = (token: string) => {
    return api.get<any, ApiResponseData<ApiRefreshData>>(routes.getRefreshData(), {
        baseURL: 'http://localhost:5000/api',
        headers: { Authorization: `Bearer ${token}` },
    })
}
