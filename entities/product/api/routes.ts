export const routes = {
    getOneProductData: (slug: string) =>
        `/getOneProduct?${new URLSearchParams({
            slug,
        })}`,
    getProductsData: (slug: string) =>
        `/getProducts?${new URLSearchParams({
            slug,
        })}`,
    getViewProductsData: (productId: string) =>
        `/getProductsById?${new URLSearchParams({
            productId,
        })}`,
}
