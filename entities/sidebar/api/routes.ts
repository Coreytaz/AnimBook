export const routes = {
    getFiltersData: (slug: string) =>
        `/getFilters?${new URLSearchParams({
            slug,
        })}`,
}
