'use client'
import { Loading as Load } from '@/shared/ui-kit'

export default function Loading() {
    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
            }}
        >
            <Load size="lg" />
        </div>
    )
}
