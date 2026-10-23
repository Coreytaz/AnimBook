import Carousel from '@/entities/carousel'
import type { ApiBannerData } from './api/types'
export default function Banner({ items }: { items: ApiBannerData[] }) {
    return <Carousel items={items} />
}
