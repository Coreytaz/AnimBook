import { ProductDescription } from '@/shared/api'
import { Table } from '@nextui-org/react'
import { FC } from 'react'
import { renderCell } from './lib'

const Description: FC = () => {
    const columns = [
        {
            key: 'name',
            label: 'Название',
        },
        {
            key: 'description',
            label: 'Описание',
        },
    ]
    const rows: ProductDescription[] = [
        {
            key: '1',
            name: 'Издатель',
            description: 'Азбука',
            descriptionHelp: 'Помощь',
        },
        {
            key: '2',
            name: 'Автор',
            description: 'Тацуки Фудзимото',
        },
        {
            key: '3',
            name: 'Художник',
            description: 'Тацуки Фудзимото',
        },
    ]
    return (
        <Table
            aria-label="Example static collection table"
            headerLined
            shadow={false}
            css={{
                height: 'auto',
                minWidth: '100%',
            }}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key} css={{ fontSize: '$2xl' }}>
                        {column.label}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={rows}>
                {(item: ProductDescription) => (
                    <Table.Row
                        key={item.key}
                        css={{
                            '&:nth-child(even)': {
                                background: '$gray100',
                            },
                        }}
                    >
                        {(columnKey) => (
                            <Table.Cell key={item.key}>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default Description
