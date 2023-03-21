import { ProductProps } from '@/shared/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from './data/product'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductProps[] | null>
) {
    if (req.method === 'POST') {
        const productId = req.body
        const products = await Product.filter((item) => productId.includes(item._id))
        res.status(200).json(products || null)
    }
}
