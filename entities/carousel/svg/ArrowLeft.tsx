import { FC } from 'react'

interface ArrowLeftProps {
    fill?: string
    filled?: boolean
    size?: number
    height?: number
    width?: number
    label?: string
}

export const ArrowLeft: FC<ArrowLeftProps> = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
}) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={filled ? fill : 'none'}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7.36922 10.869C7.42572 10.811 7.63906 10.563 7.8378 10.359C9.00292 9.076 12.0424 6.976 13.6332 6.335C13.8748 6.232 14.4856 6.014 14.812 6C15.1247 6 15.4228 6.072 15.7073 6.218C16.0619 6.422 16.3463 6.743 16.5022 7.122C16.6025 7.385 16.7584 8.172 16.7584 8.186C16.9143 9.047 17 10.446 17 11.992C17 13.465 16.9143 14.807 16.7867 15.681C16.772 15.695 16.6162 16.673 16.4457 17.008C16.133 17.62 15.5222 18 14.8685 18H14.812C14.3863 17.985 13.491 17.605 13.491 17.591C11.9859 16.949 9.01656 14.952 7.82319 13.625C7.82319 13.625 7.48709 13.284 7.34096 13.071C7.11301 12.765 7 12.386 7 12.007C7 11.584 7.12762 11.19 7.36922 10.869Z"
                stroke={fill}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}