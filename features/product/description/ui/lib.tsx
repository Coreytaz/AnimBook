import { DescriptionList } from '@/shared/api'
import { Tooltip, Text } from '@nextui-org/react'
import { HelpCircle } from 'lucide-react'
import { Key, ReactNode } from 'react'

export const renderCell = (discription: DescriptionList, columnKey: Key): ReactNode => {
    const cellValue = discription[columnKey]
    switch (columnKey) {
        case 'name':
            return discription.descriptionHelp ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Text>{cellValue}</Text>
                    <Tooltip content={discription.descriptionHelp} placement="topStart">
                        <HelpCircle size={20} />
                    </Tooltip>
                </div>
            ) : (
                cellValue
            )
        default:
            return cellValue
    }
}
