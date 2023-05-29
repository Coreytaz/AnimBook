export const routes = {
    getOneProductData: (slug: string) => `/product/slug/${slug}`,
    getProductsData: (slug: string) => `/product/getProducts/${slug}`,
    getViewProductsData: (productId: string) => `/product/id/${productId}`,
}
