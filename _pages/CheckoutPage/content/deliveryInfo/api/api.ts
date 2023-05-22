import { api, ApiResponseData } from '@/shared/api'
import { routes } from './routes'
import { Geo, Geolocation, GEO_Addres } from './types'

export const getGeo = (params: Geolocation) => {
    return api.get<any, ApiResponseData<Geo>>(routes.getGeo(params), {
        baseURL: 'https://api.geoapify.com/v1',
    })
}

export const getAddres = (query: string) => {
    return api.post<any, ApiResponseData<{ suggestions: GEO_Addres[] }>>(
        routes.getAddres(),
        JSON.stringify({ query: query }),
        {
            baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Token ' + process.env.API_GEO2,
            },
        }
    )
}
