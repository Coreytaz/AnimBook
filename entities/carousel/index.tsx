import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Card, Grid, Text } from '@nextui-org/react'
import styles from './style.module.scss'
import cn from 'clsx'
import { ArrowRight } from './svg/ArrowRight'
import { ArrowLeft } from './svg/ArrowLeft'
import { useRouter } from 'next/navigation'

interface CarouselItemProps {
    src: string
    alt: string
    caption: string
}

const Carousel: FC<{ items: CarouselItemProps[] }> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const slideRef = useRef<HTMLDivElement>(null!)

    return (
        <div className={styles.wraperCoursel}>
            <Button
                light
                auto
                onClick={() => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))}
                className={cn(styles.btnCoursel, styles.btnLeft)}
                icon={<ArrowLeft size={60} />}
            />
            <Grid.Container
                ref={slideRef}
                direction="row"
                wrap="nowrap"
                css={{
                    h: '45vh',
                    p: '0',
                    m: '0',
                    transform: `translateX(-${activeIndex * 100}%)`,
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
                            active={index === activeIndex}
                        />
                    )
                })}
            </Grid.Container>
            <Button
                light
                auto
                onClick={() => setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))}
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
                        position: 'absolute',
                    }}
                >
                    <Text h2>{caption}</Text>
                </Card.Body>
                <Card.Image src={src} objectFit="cover" width="100%" alt={alt} />
            </Card>
        </Grid>
    )
}

export default Carousel
