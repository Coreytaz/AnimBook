import type { Metadata } from 'next'
import IndexPage from '@/_pages/IndexPage'
import { serverGet } from '@/shared/api/server'
import type { ApiBannerData } from '@/_pages/IndexPage/sections/banner/api/types'
import type { ApiCatergoriesData } from '@/entities/catergories/api/types'
export const metadata: Metadata = { title: 'AnimBook' }
export const revalidate = 300
export default async function Home() {
    const [banners, categories] = await Promise.all([
        serverGet<ApiBannerData[]>('/banner'),
        serverGet<ApiCatergoriesData[]>('/catergories/popular'),
    ])
    return <IndexPage banners={banners} categories={categories} />
}
