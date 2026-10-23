import type { Metadata } from 'next'
import CatalogPage from '@/_pages/CatalogPage'
import { serverGet } from '@/shared/api/server'
import type { ApiCatergoriesData } from '@/entities/catergories/api/types'
export const metadata: Metadata = { title: 'Каталог' }
export const revalidate = 300
export default async function Catalog() {
    const categories = await serverGet<ApiCatergoriesData[]>('/catergories/All')
    return <CatalogPage categories={categories} />
}
