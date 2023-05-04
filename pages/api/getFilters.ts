import { ProductProps, Publisher } from '@/shared/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { CatergoriesItem } from './data/catergories'
import { Product } from './data/product'
import * as publishers from './data/publishers'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ publisher: Publisher[]; lowPriceAndMax: { max: number; min: number } }>
) {
    if (req.method === 'GET') {
        const categorySlug = req.query.slug
        const category = CatergoriesItem.find((item) => item.slug === categorySlug)
        const allPrice = Product.filter((item) => item.catergoriesId === category?._id).map(
            (item) => item.price
        )
        const lowPriceAndMax = { min: Math.min(...allPrice), max: Math.max(...allPrice) }
        const publisher = publishers
            .getAll()
            .filter((item) => item.catergoriesId.includes(category?._id!))
        res.status(200).json({ publisher, lowPriceAndMax })
    }
}
