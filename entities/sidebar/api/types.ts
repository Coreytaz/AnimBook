import { Publisher } from '@/shared/api'

export interface ApiFiltersData {
    publisher: Publisher[]
    lowPriceAndMax: { max: number; min: number }
}
