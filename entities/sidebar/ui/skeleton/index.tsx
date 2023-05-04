import { Skeleton } from '@/shared/ui'
import { Card, Spacer } from '@nextui-org/react'
import { FC } from 'react'

export const SidebarSkeleton: FC = () => {
    return (
        <Card variant="flat" css={{ position: 'sticky', left: '0', top: '$24', p: '$5' }}>
            {[...new Array(4)].map((_, i) => (
                <>
                    <Skeleton
                        style={{
                            width: '100%',
                            height: '76px',
                            backgroundColor: 'var(--nextui-colors-gray100)',
                        }}
                    />
                    <Spacer y={1} />
                </>
            ))}
            <Skeleton
                style={{
                    margin: '0 auto',
                    width: '50%',
                    height: '50px',
                    backgroundColor: 'var(--nextui-colors-gray100)',
                }}
            />
        </Card>
    )
}
