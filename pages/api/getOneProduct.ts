import { ProductProps } from '@/shared/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from './data/product'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductProps | null>
) {
    if (req.method === 'GET') {
        const productSlug = req.query.slug
        const products = await Product.find((item) => item.slug === productSlug)
        res.status(200).json(products || null)
    }
}
