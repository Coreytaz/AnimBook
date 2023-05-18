export const routes = {
    getSearchData: (q: string) =>
        `/search?${new URLSearchParams({
            q,
        })}`,
}
