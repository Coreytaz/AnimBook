import { api, ApiResponseData } from '@/shared/api'
import { routes } from './routes'
import { ApiSearchData } from './types'

export const search = (search: string) => {
    return api.get<any, ApiResponseData<ApiSearchData[]>>(routes.getSearchData(search))
}
