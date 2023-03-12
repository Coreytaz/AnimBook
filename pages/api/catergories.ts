import { CatergoriesListProps, ProductProps } from '@/shared/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { CatergoriesItem } from './data/catergories'
import { Product } from './data/product'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{
        categoryName: string
        subcategories: CatergoriesListProps[]
        products: ProductProps[]
    }>
) {
    if (req.method === 'GET') {
        const categorySlug = req.query.slug
        const category = await CatergoriesItem.find((item) => item.slug === categorySlug)
        const subcategories = await CatergoriesItem.filter((item) => item.parent === category?._id)
        const products = await Product.filter((item) => item.catergoriesId === category?._id)
        res.status(200).json({ categoryName: category?.name || '', subcategories, products })
    }
}
