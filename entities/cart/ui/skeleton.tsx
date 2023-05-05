import { SkeletonRow } from '@/entities/product'
import { Skeleton } from '@/shared/ui'
import { Grid } from '@nextui-org/react'
import React from 'react'

export const CartSkeleton = () => {
    return (
        <>
            <Skeleton style={{ width: '20%', height: '50px', marginTop: '10px' }} />
            <section style={{ marginTop: '10px' }}>
                <Skeleton style={{ width: '30%', height: '40px', marginTop: '10px' }} />
                <Skeleton style={{ width: '40%', height: '30px', marginTop: '10px' }} />
                <Grid.Container css={{ gap: '$10', mt: '$10' }} alignContent="flex-start">
                    {[...new Array(3)].map((_, i) => (
                        <SkeletonRow key={i} />
                    ))}
                </Grid.Container>
            </section>
        </>
    )
}
