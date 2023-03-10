import { ProductDescription, ReviewsProps } from '@/shared/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { Reviews } from './data/reviews'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReviewsProps[] | null>
) {
    if (req.method === 'GET') {
        const productSlug = req.query.slug
        const reviews = await Reviews.filter((item) => item.productSlug === productSlug)
        res.status(200).json(reviews || null)
    }
}
