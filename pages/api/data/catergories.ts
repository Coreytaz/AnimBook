import { CatergoriesListProps } from '@/shared/api'

export const CatergoriesItem: CatergoriesListProps[] = [
    {
        _id: '6025e5c5b5e5db24648333d5',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        description: 'Описание категории 1',
        name: 'Фигурки',
        slug: 'figurki',
        parent: null,
    },
    {
        _id: '6025e5c5b5e5db24648333d6',
        img: 'https://nextui.org/images/card-example-3.jpeg',
        description: 'Описание категории 1',
        name: 'Акриловые фигурки',
        slug: 'akrilovye-figurki',
        parent: '6025e5c5b5e5db24648333d5',
    },
    {
        _id: '6025e5c5b5e5db24648333d7',
        img: 'https://nextui.org/images/card-example-2.jpeg',
        description: 'Описание категории 1',
        name: 'Action фигурки',
        slug: 'action-figurki',
        parent: '6025e5c5b5e5db24648333d5',
    },
]
