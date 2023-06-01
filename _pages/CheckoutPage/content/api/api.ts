import { api, ApiResponseData } from '@/shared/api'
import { User } from 'next-auth'
import { routes } from './routes'
import { ApiOrderData, OrderDataWithUser } from './types'

export const createOrderWithUser = (data: OrderDataWithUser) => {
    return api.post<any, ApiResponseData<ApiOrderData>>(routes.orderWithUser(), data)
}
