import { Skeleton } from '@/shared/ui'
import { FC } from 'react'

export const SkeletonCard: FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <Skeleton style={{ width: '100%', height: '430px' }} {...props} />
}
