import { CatergoriesListProps } from '@/shared/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { CatergoriesItem } from './data/catergories'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CatergoriesListProps[]>
) {
    if (req.method === 'GET') {
        const category = await CatergoriesItem.filter((item) => item.parent === null)
        res.status(200).json(category)
    }
}
