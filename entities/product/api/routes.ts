import { objectToQueryString } from '@/shared/helpers'

export const routes = {
    getOneProductData: (slug: string) => `/product/slug/${slug}`,
    getProductsData: (slug: string, queryParams: { [key: string]: any }) =>
        `/product/getProducts/${slug}?${objectToQueryString(queryParams)}`,
    getViewProductsData: (productId: string) => `/product/id/${productId}`,
}
