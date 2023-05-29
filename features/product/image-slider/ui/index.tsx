import { useScrollVertical } from '@/shared/helpers'
import { Card } from '@nextui-org/react'
import { FC, useState } from 'react'
import styles from './styles.module.scss'

interface ImageSliderProps {
    imageCollection: {
        src: string
        alt: string
    }[]
}

const ImageSlider: FC<ImageSliderProps> = ({ imageCollection }) => {
    const scrollVerticalRef = useScrollVertical()
    const [selectImage, setSelectImage] = useState(0)

    const onChangePreviewImage = (index: number) => {
        setSelectImage(index)
    }

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
                        css={{ maxWidth: 95, minH: 100, cursor: 'pointer' }}
                        key={image.src}
                        isHoverable
                    >
                        <Card.Image
                            onClick={() => onChangePreviewImage(i)}
                            src={image.src}
                            objectFit="cover"
                            showSkeleton
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
