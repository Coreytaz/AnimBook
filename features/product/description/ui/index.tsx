import { ProductDescription, DescriptionList } from '@/shared/api'
import { Loading, Table, Text } from '@nextui-org/react'
import { descriptionApi } from '../api'
import { renderCell } from './lib'
import { SkeletonDescription } from './skeletonDescription'

export default function Description({ slug }: { slug: string }) {
    const { data: items, isLoading, isError } = descriptionApi.useGetDescriptionQuery(slug)

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

    if (isLoading) {
        return <SkeletonDescription />
    }

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
}
