import { Spacer, Text } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { reviewsApi } from '../api'
import Comments from './comments'
import ReviewsHead from './reviewsHead'
import { SkeletonReviews } from './skeletonReviews'

export default function Reviews({ slug }: { slug: string }) {
    const searchParams = useSearchParams()
    const [trigger, { data: feedbackList, isLoading, isError, isUninitialized }] =
        reviewsApi.useLazyGetReviewsQuery()
    const totalRating =
        feedbackList?.reduce((acc, cur) => acc + cur.rating, 0)! / feedbackList?.length! || 0
    const tabs = searchParams.get('tabs')

    useEffect(() => {
        if (tabs === 'opinion') {
            trigger(slug)
        }
    }, [slug, tabs, trigger])

    if (isLoading || isUninitialized) {
        return <SkeletonReviews />
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
