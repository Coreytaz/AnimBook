import { ProductGridCard, SkeletonCard, useGetViewProductsQuery } from '@/entities/product'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { ViewedProduct } from '@/features/viewedProduct'
import { useScrollVertical } from '@/shared/helpers'
import { Button, Card, Col, Container, Grid, Row, Text } from '@nextui-org/react'
import styles from './styles.module.scss'

export default function ViewProduct() {
    const { data: products, isLoading } = useGetViewProductsQuery()
    const scrollVerticalRef = useScrollVertical()

    return (
        <>
            {products?.length! > 0 ? (
                <Container lg>
                    <Text
                        h2
                        css={{
                            textAlign: 'center',
                            textGradient: '45deg, $blue600 10%, $pink600 100%',
                            mb: '$10',
                        }}
                        weight="bold"
                    >
                        Вы недавно смотрели
                    </Text>
                    <Grid.Container gap={2} justify="center">
                        <Card
                            variant="bordered"
                            css={{
                                p: '$10',
                                overflow: 'scroll',
                                d: 'flex',
                                flexFlow: 'nowrap',
                                gap: '$13',
                            }}
                            ref={scrollVerticalRef}
                        >
                            {isLoading
                                ? [...new Array(5)].map((_, i) => (
                                      <Col key={i}>
                                          <SkeletonCard
                                              style={{
                                                  width: '100%',
                                                  height: '430px',
                                                  backgroundColor: 'var(--nextui-colors-gray100)',
                                              }}
                                          />
                                      </Col>
                                  ))
                                : products?.map((prod, idx) => (
                                      <Col
                                          key={prod._id}
                                          css={{
                                              position: 'relative',
                                              width: '242px',
                                          }}
                                      >
                                          <ViewedProduct.Actions.DelViewedProductHistory
                                              productId={prod._id}
                                          />
                                          <ProductGridCard
                                              data={prod}
                                              className={styles.card}
                                              actions={
                                                  <>
                                                      <Button.Group
                                                          ghost
                                                          css={{ minWidth: '100%' }}
                                                      >
                                                          <Fav.Actions.AddBookMini
                                                              productId={prod._id}
                                                          />
                                                          <Cart.Actions.AddBookMini
                                                              productId={prod._id}
                                                          />
                                                      </Button.Group>
                                                  </>
                                              }
                                          />
                                      </Col>
                                  ))}
                        </Card>
                    </Grid.Container>
                </Container>
            ) : null}
        </>
    )
}
