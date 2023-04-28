import { Loading, Spacer, Text } from '@nextui-org/react'
import { reviewsApi } from '../api'
import Comments from './comments'
import ReviewsHead from './reviewsHead'

export default function Reviews({ slug }: { slug: string }) {
    const { data: feedbackList, isLoading, isError } = reviewsApi.useGetReviewsQuery(slug)
    const totalRating =
        feedbackList?.reduce((acc, cur) => acc + cur.rating, 0)! / feedbackList?.length! || 0

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <ReviewsHead rating={totalRating} quantityReviews={feedbackList?.length!} />
            <Spacer
                y={1}
                css={{ borderTop: '4px solid $gray100', width: '100%', marginLeft: '0' }}
            />
            {feedbackList?.length! > 0 ? (
                <Comments feedbackList={feedbackList!} />
            ) : (
                <Text size="$2xl" css={{ textAlign: 'center', p: '$10' }}>
                    Отзывов ещё нет, будьте первыми
                </Text>
            )}
        </>
    )
}
