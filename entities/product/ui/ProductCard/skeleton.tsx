import { Skeleton } from '@/shared/ui'
import { Card, Grid, Spacer } from '@nextui-org/react'
import { FC } from 'react'
import styles from './styles.module.scss'

export const ProductCardSkeleton: FC = () => {
    return (
        <>
            <Skeleton style={{ width: '50%', height: '54px', marginBottom: '10px' }} />
            <Card>
                <Grid.Container gap={2} justify="center" css={{ p: '$11' }}>
                    <Grid xs={5} css={{ flexDirection: 'column', gap: '$10' }}>
                        <Card>
                            <Skeleton
                                style={{
                                    width: '100%',
                                    height: '450px',
                                    backgroundColor: 'var(--nextui-colors-gray100)',
                                }}
                            />
                        </Card>
                        <div className={styles.imageCollection}>
                            {[...new Array(5)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        backgroundColor: 'var(--nextui-colors-gray100)',
                                    }}
                                />
                            ))}
                        </div>
                    </Grid>
                    <Grid xs={7} css={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div className={styles.wrapperProduct}>
                            <div>
                                <Skeleton
                                    style={{
                                        width: '50%',
                                        height: '41px',
                                        backgroundColor: 'var(--nextui-colors-gray100)',
                                    }}
                                />
                            </div>
                            <div>
                                <Skeleton
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        marginBottom: '24px',
                                        backgroundColor: 'var(--nextui-colors-gray100)',
                                    }}
                                />
                                <Skeleton
                                    style={{
                                        width: '50%',
                                        height: '42px',
                                        backgroundColor: 'var(--nextui-colors-gray100)',
                                    }}
                                />
                            </div>
                            <div className={styles.buttonGroups}>
                                <Skeleton
                                    style={{
                                        width: '20%',
                                        height: '40px',
                                        backgroundColor: 'var(--nextui-colors-gray100)',
                                    }}
                                />
                                <Skeleton
                                    style={{
                                        width: '20%',
                                        height: '40px',
                                        backgroundColor: 'var(--nextui-colors-gray100)',
                                    }}
                                />
                            </div>
                            <div>
                                {[...new Array(2)].map((_, i) => (
                                    <div key={i}>
                                        <Skeleton
                                            style={{
                                                width: '30%',
                                                height: '20px',
                                                marginBottom: '10px',
                                                backgroundColor: 'var(--nextui-colors-gray100)',
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Spacer />
                    </Grid>
                </Grid.Container>
            </Card>
        </>
    )
}
