import { Skeleton } from '@/shared/ui'
import { Grid, Row, Spacer } from '@nextui-org/react'
import { FC } from 'react'

export const SkeletonReviews: FC = () => {
    return (
        <>
            <Grid.Container gap={2}>
                <Grid xs css={{ gap: '$10', alignItems: 'center' }}>
                    <Skeleton
                        style={{
                            width: '40%',
                            height: '40px',
                            backgroundColor: 'var(--nextui-colors-gray100)',
                        }}
                    />
                    <Skeleton
                        style={{
                            width: '50%',
                            height: '48px',
                            backgroundColor: 'var(--nextui-colors-gray100)',
                        }}
                    />
                </Grid>
                <Grid xs>
                    <Spacer />
                </Grid>
            </Grid.Container>
            <Spacer y={1} />
            <>
                <Row justify="space-between">
                    <Skeleton
                        style={{
                            width: '10%',
                            height: '40px',
                            backgroundColor: 'var(--nextui-colors-gray100)',
                        }}
                    />
                    <Skeleton
                        style={{
                            width: '10%',
                            height: '40px',
                            backgroundColor: 'var(--nextui-colors-gray100)',
                        }}
                    />
                </Row>
                <Grid.Container gap={2} css={{ mt: '$5' }}>
                    {[...new Array(5)]
                        .map((_, i) => (
                            <Grid xs key={i + 1}>
                                <Skeleton
                                    style={{
                                        width: `${100 + (20 * i + 1)}px`,
                                        height: '48px',
                                        backgroundColor: 'var(--nextui-colors-gray100)',
                                    }}
                                />
                            </Grid>
                        ))
                        .reverse()}
                    <Grid xs={4}>
                        <Spacer />
                    </Grid>
                </Grid.Container>
            </>
            <Spacer
                y={1}
                css={{ borderTop: '4px solid $gray100', width: '100%', marginLeft: '0' }}
            />
            <Grid.Container gap={2}>
                {[...new Array(3)].map((_, i) => (
                    <Grid
                        sm={12}
                        key={i}
                        css={{
                            borderBottom: '3px solid $gray100',
                            '&:last-child': {
                                borderBottom: 'none',
                            },
                        }}
                    >
                        <div style={{ width: '100%' }}>
                            <div>
                                <Skeleton
                                    style={{
                                        width: '100%',
                                        height: '120px',
                                        backgroundColor: 'var(--nextui-colors-gray100)',
                                    }}
                                />
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid.Container>
        </>
    )
}
