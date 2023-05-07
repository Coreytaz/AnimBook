import { ProductProps } from '@/shared/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from './data/product'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductProps[] | null>
) {
    if (req.method === 'GET') {
        const { productId } = req.query
        const splitProductId = productId?.toString().split('-')!
        console.log(productId)
        const products = Product.filter((item) => splitProductId.includes(item._id))
        res.status(200).json(products || null)
    }
}
