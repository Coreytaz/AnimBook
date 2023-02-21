import { Card } from '@nextui-org/react'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

interface ImageSliderProps {
    imageCollection: {
        src: string
        alt: string
    }[]
}

const ImageSlider: FC<ImageSliderProps> = ({ imageCollection }) => {
    const scrollVerticalRef = useRef<HTMLDivElement>(null!)
    const [selectImage, setSelectImage] = useState(0)

    const onChangePreviewImage = (index: number) => {
        setSelectImage(index)
    }

    const onWheel = (e: WheelEvent) => {
        e.preventDefault()
        scrollVerticalRef.current.scrollTo({
            left: +scrollVerticalRef.current.scrollLeft + e.deltaY * 4,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        if (scrollVerticalRef.current) {
            scrollVerticalRef.current.addEventListener('wheel', onWheel)
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                scrollVerticalRef.current?.removeEventListener('wheel', onWheel)
            }
        }
    }, [])
    return (
        <>
            <Card>
                <Card.Image
                    src={imageCollection[selectImage].src}
                    objectFit="cover"
                    showSkeleton
                    width="100%"
                    height={450}
                    alt={imageCollection[selectImage].alt}
                />
            </Card>
            <div className={styles.imageCollection} ref={scrollVerticalRef}>
                {imageCollection.map((image, i) => (
                    <Card
                        css={{ minWidth: 95, minH: 100, cursor: 'pointer' }}
                        key={image.src}
                        isHoverable
                    >
                        <Card.Image
                            onClick={() => onChangePreviewImage(i)}
                            src={image.src}
                            objectFit="cover"
                            showSkeleton
                            width="100%"
                            height={100}
                            alt={image.alt}
                        />
                    </Card>
                ))}
            </div>
        </>
    )
}

export default ImageSlider
