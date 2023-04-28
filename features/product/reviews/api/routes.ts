export const routes = {
    getReviewsData: (slug: string) => `/getReviews?${new URLSearchParams({ slug })}`,
}
