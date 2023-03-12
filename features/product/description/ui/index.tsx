import { ProductDescription, DescriptionList } from '@/shared/api'
import { Table, Text } from '@nextui-org/react'
import { FC, memo, use } from 'react'
import { renderCell } from './lib'

async function getData(slug: string): Promise<ProductDescription | null> {
    const res = await fetch(
        'http://localhost:3000/api/getDescriptionProduct?' +
            new URLSearchParams({
                slug,
            }),
        { next: { revalidate: 10 } }
    )
    return res.json()
}

export default memo(function Description({ slug }: { slug: string }) {
    const items = use(getData(slug))
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
    if (!items) {
        return (
            <Text size="$2xl" css={{ textAlign: 'center', pb: '$10' }}>
                Описание у товара отсутствует
            </Text>
        )
    }

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
            <Table.Body items={items?.descriptionList}>
                {(item: DescriptionList) => (
                    <Table.Row
                        key={item.id}
                        css={{
                            '&:nth-child(even)': {
                                background: '$gray100',
                            },
                        }}
                    >
                        {(columnKey) => (
                            <Table.Cell key={item.id}>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
})
