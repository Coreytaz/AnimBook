export const routes = {
    getСatergoriesAllData: () => `/catergoriesAll`,
    getSubCatergoriesData: (slug: string) => `/catergories?${new URLSearchParams({ slug })}`,
}
