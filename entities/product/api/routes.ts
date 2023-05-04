export const routes = {
    getOneProductData: (slug: string) =>
        `/getOneProduct?${new URLSearchParams({
            slug,
        })}`,
}
