import { DescriptionList } from '@/shared/api'
import { Table, Text } from '@/shared/ui-kit'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { descriptionApi } from '../api'
import { renderCell } from './lib'
import { SkeletonDescription } from './skeletonDescription'

export default function Description() {
    const params = useParams()
    const searchParams = useSearchParams()
    const [trigger, { data: items, isLoading, isError, isUninitialized }] =
        descriptionApi.useLazyGetDescriptionQuery()
    const tabs = searchParams?.get('tabs')

    useEffect(() => {
        if (tabs === 'characteristics') {
            trigger(params?.slug?.toString()!)
        }
    }, [params?.slug, tabs, trigger])

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

    if (isLoading || isUninitialized) {
        return <SkeletonDescription />
    }

    if (!items?.descriptionList.length && !isUninitialized) {
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
                    <Table.Column
                        id={column.key}
                        isRowHeader={column.key === 'name'}
                        key={column.key}
                        className="text-2xl"
                    >
                        {column.label}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={items?.descriptionList || []}>
                {(item: DescriptionList) => (
                    <Table.Row
                        columns={columns}
                        key={item.id}
                        id={item.id}
                        className="even:bg-default-100"
                    >
                        {(column) => (
                            <Table.Cell key={column.key}>{renderCell(item, column.key)}</Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}
