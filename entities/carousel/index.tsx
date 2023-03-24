import { FC, useEffect, useState } from 'react'
import { Button, Card, Grid, Radio, Text } from '@nextui-org/react'
import styles from './style.module.scss'
import cn from 'clsx'
import { ArrowRight } from './svg/ArrowRight'
import { ArrowLeft } from './svg/ArrowLeft'
import { useRouter } from 'next/navigation'
import { CarouselItemProps } from '@/shared/api'

const Carousel: FC<{ items: CarouselItemProps[] } & { delay?: number }> = ({ items, delay }) => {
    const [activeIndex, setActiveIndex] = useState<string | number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (+prev === items.length - 1 ? 0 : +prev + 1))
        }, delay || 5000)
        return () => clearInterval(interval)
    }, [activeIndex, delay, items.length])

    return (
        <div className={styles.wraperCoursel}>
            <Button
                light
                auto
                onPress={() =>
                    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : +prev - 1))
                }
                className={cn(styles.btnCoursel, styles.btnLeft)}
                css={{ position: 'absolute' }}
                icon={<ArrowLeft size={60} />}
            />
            <Grid.Container
                direction="row"
                wrap="nowrap"
                css={{
                    h: '45vh',
                    p: '0',
                    m: '0',
                    transform: `translateX(-${+activeIndex * 100}%)`,
                    transition: 'transform 0.5s ease-in-out',
                }}
            >
                {items.map((item, index) => {
                    return (
                        <CarouselItem
                            key={index}
                            src={item.src}
                            alt={item.alt}
                            caption={item.caption}
                        />
                    )
                })}
            </Grid.Container>
            <Button
                light
                auto
                onPress={() =>
                    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : +prev + 1))
                }
                css={{ position: 'absolute' }}
                className={cn(styles.btnCoursel, styles.btnRight)}
                icon={<ArrowRight size={60} />}
            />
        </div>
    )
}

const CarouselItem: FC<CarouselItemProps> = ({ src, alt, caption }) => {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push('/catalog')
    }
    return (
        <Grid xs={12} css={{ minWidth: '100%', cursor: 'pointer' }} onClick={handleClick}>
            <Card variant="flat" isPressable isHoverable>
                <Card.Body
                    className={styles.carouselItem}
                    css={{
                        w: '100%',
                        h: '100%',
                        position: 'absolute',
                        zIndex: '$10',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text h2>{caption}</Text>
                </Card.Body>
                <Card.Image showSkeleton src={src} objectFit="cover" width="100%" alt={alt} />
            </Card>
        </Grid>
    )
}

export default Carousel
