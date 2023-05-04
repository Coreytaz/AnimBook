export const routes = {
    getDescriptionProductData: (slug: string) =>
        `/getDescriptionProduct?${new URLSearchParams({ slug })}`,
}
