import { ProductDescription } from '@/shared/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { Descriptions } from './data/description'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductDescription | null>
) {
    if (req.method === 'GET') {
        const productSlug = req.query.slug
        const descriptions = await Descriptions.find((item) => item.productSlug === productSlug)
        res.status(200).json(descriptions || null)
    }
}
