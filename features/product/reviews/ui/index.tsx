import { Spacer, Text } from '@nextui-org/react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { reviewsApi } from '../api'
import Comments from './comments'
import ReviewsHead from './reviewsHead'
import { SkeletonReviews } from './skeletonReviews'

export default function Reviews() {
    const params = useParams()
    const searchParams = useSearchParams()
    const [trigger, { data: feedbackList, isLoading, isError, isUninitialized }] =
        reviewsApi.useLazyGetReviewsQuery()
    const tabs = searchParams?.get('tabs')

    useEffect(() => {
        if (tabs === 'opinion') {
            trigger(params?.slug.toString()!)
        }
    }, [params?.slug, tabs, trigger])

    if (isLoading || isUninitialized) {
        return <SkeletonReviews />
    }

    return (
        <>
            <ReviewsHead
                rating={feedbackList?.totalRating!}
                quantityReviews={feedbackList?.countReviews!}
            />
            <Spacer
                y={1}
                css={{ borderTop: '4px solid $gray100', width: '100%', marginLeft: '0' }}
            />
            {feedbackList?.rating.length! > 0 ? (
                <Comments feedbackList={feedbackList?.rating!} />
            ) : (
                <Text size="$2xl" css={{ textAlign: 'center', p: '$10' }}>
                    Отзывов ещё нет, будьте первыми
                </Text>
            )}
        </>
    )
}
