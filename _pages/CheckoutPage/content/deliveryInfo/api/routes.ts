import { Geolocation } from './types'

export const routes = {
    getGeo: (params: Geolocation) =>
        `/geocode/reverse?lat=${params.latitude}&lon=${params.longitude}&lang=ru&apiKey=${process.env.API_GEO}`,
    getAddres: () => `/address`,
}
