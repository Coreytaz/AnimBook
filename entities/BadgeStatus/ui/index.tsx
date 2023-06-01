import { Badge, BadgeProps } from '@nextui-org/react'
import React, { FC, ReactNode } from 'react'

interface BadgeStatusProps extends BadgeProps {
    text: string
}

enum ColorStatus {
    AwaitingPayment = 'Ожидает оплаты',
    AwaitingСonfirmation = 'Ожидает подтверждения',
    InTransit = 'В пути',
    Delivered = 'Доставлен',
}

export const BadgeStatus: FC<BadgeStatusProps> = ({ text, ...props }) => {
    const colors: Record<ColorStatus, 'error' | 'success' | 'warning'> = {
        'Ожидает оплаты': 'error',
        'В пути': 'warning',
        'Ожидает подтверждения': 'warning',
        Доставлен: 'success',
    }
    return (
        <Badge {...props} color={colors[text as ColorStatus]} variant="bordered">
            {text}
        </Badge>
    )
}
