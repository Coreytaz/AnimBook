import { Skeleton } from '@/shared/ui'
import React, { FC } from 'react'

export const SkeletonDescription: FC = () => {
    return (
        <>
            {[...new Array(3)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        gap: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <Skeleton
                        style={{
                            width: '50%',
                            height: '20px',
                            backgroundColor: 'var(--nextui-colors-gray100)',
                        }}
                    />
                    <Skeleton
                        style={{
                            width: '50%',
                            height: '20px',
                            backgroundColor: 'var(--nextui-colors-gray100)',
                        }}
                    />
                </div>
            ))}
        </>
    )
}
