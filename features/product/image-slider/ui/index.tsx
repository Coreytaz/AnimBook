/* eslint-disable @next/next/no-img-element -- Product images use variable external sources. */
import { Button } from '@heroui/react'
import { useState } from 'react'
export default function ImageSlider({
    imageCollection,
}: {
    imageCollection: { src: string; alt: string }[]
}) {
    const [selected, setSelected] = useState(0)
    const image = imageCollection[selected] || imageCollection[0]
    if (!image) return <div className="product-image-empty">Изображение скоро появится</div>
    return (
        <>
            <div className="product-main-image">
                <img src={image.src} alt={image.alt} />
            </div>
            {imageCollection.length > 1 && (
                <div className="product-thumbnails">
                    {imageCollection.map((item, index) => (
                        <Button
                            key={item.src}
                            variant="secondary"
                            aria-label={'Посмотреть изображение ' + (index + 1)}
                            aria-pressed={index === selected}
                            onPress={() => setSelected(index)}
                        >
                            <img src={item.src} alt="" />
                        </Button>
                    ))}
                </div>
            )}
        </>
    )
}
