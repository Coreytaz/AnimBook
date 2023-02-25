import { ProductDescription } from '@/shared/api'
import { Avatar, Tooltip, Text } from '@nextui-org/react'
import { Key, ReactNode } from 'react'
import { QuestionSvg } from './svg/question'

export const renderCell = (discription: ProductDescription, columnKey: Key): ReactNode => {
    const cellValue = discription[columnKey]
    switch (columnKey) {
        case 'name':
            return discription.descriptionHelp ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Text>{cellValue}</Text>
                    <Tooltip content={discription.descriptionHelp} placement="topStart">
                        <Avatar size="xs" icon={<QuestionSvg size={20} fill="currentColor" />} />
                    </Tooltip>
                </div>
            ) : (
                cellValue
            )
        default:
            return cellValue
    }
}
