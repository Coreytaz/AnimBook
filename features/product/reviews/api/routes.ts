export const routes = {
    getReviewsData: (slug: string, filter: string[]) =>
        `/product/rating/${slug}${filter.length > 0 ? `?filter=${filter.join('_')}` : ''}`,
    createReviewsData: () => `/rating/create`,
}
