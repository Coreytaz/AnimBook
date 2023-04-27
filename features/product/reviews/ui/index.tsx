import { ReviewsProps } from '@/shared/api'
import { Spacer, Text } from '@nextui-org/react'
import { use } from 'react'
import Comments from './comments'
import ReviewsHead from './reviewsHead'

async function getData(slug: string): Promise<ReviewsProps[] | null> {
    const res = await fetch(
        'http://localhost:3000/api/getReviews?' +
            new URLSearchParams({
                slug,
            }),
        { next: { revalidate: 10 } }
    )
    return res.json()
}

export default function Reviews({ slug }: { slug: string }) {
    const feedbackList = use(getData(slug))
    const totalRating =
        feedbackList?.reduce((acc, cur) => acc + cur.rating, 0)! / feedbackList?.length! || 0
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
