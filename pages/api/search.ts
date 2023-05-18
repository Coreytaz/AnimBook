import { GroupedOption } from '@/widgets/header/ui/search/model'
import { NextApiRequest, NextApiResponse } from 'next'
import { CatergoriesItem } from './data/catergories'
import { Product } from './data/product'

export default async function handler(req: NextApiRequest, res: NextApiResponse<GroupedOption[]>) {
    if (req.method === 'GET') {
        const search = req.query.q?.toString()!
        const category = CatergoriesItem.filter((item) => item.name.includes(search)).map(
            (item) => {
                return {
                    value: `catalog/${item.slug}`,
                    label: item.name,
                }
            }
        )
        console.log(category)
        const products = Product.filter((item) => item.name.includes(search)).map((item) => {
            return {
                value: `product/${item.slug}`,
                label: item.name,
            }
        })
        console.log(products)
        res.status(200).json([
            {
                label: 'Каталог',
                options: category,
            },
            {
                label: 'Товары',
                options: products,
            },
        ])
    }
}
