'use client'
import { Loading as Load } from '@nextui-org/react'

export default function Loading() {
    return (
        <Load
            size="lg"
            css={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        />
    )
}
