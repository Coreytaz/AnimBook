import { Publisher } from '@/shared/api'

export const AST: Publisher = {
    id: '1',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'act',
    name: 'АСТ',
    city: 'Москва',
}

export const NOT_PUB: Publisher = {
    id: '1',
    catergoriesId: ['6025e5c5b5e5db24648333d6', '6025e5c5b5e5db24648333d7'],
    slug: 'net-izdatelja',
    name: 'Нет издателя',
    city: 'Москва',
}

export const COLIBRI: Publisher = {
    id: '2',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'kolibri',
    name: 'КоЛибри',
    city: 'Москва',
}

export const EKSMO: Publisher = {
    id: '3',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'jeksmo',
    name: 'Эксмо',
    city: 'Москва',
}

export const GOS_PUB: Publisher = {
    id: '4',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'gosudarstvennoe-izdatelstvo-hudozhestvennoj-literatury',
    name: 'Государственное издательство художественной литературы',
    city: 'Москва',
}

export const AZBUKA: Publisher = {
    id: '5',
    catergoriesId: ['6025e5c5b5e5db24648333d7', '6025e5c5b5e5db24648333d6'],
    slug: 'azbuka',
    name: 'Азбука',
    city: 'Санкт-Петербург',
}

export const LENIZDAT: Publisher = {
    id: '6',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'lenizdat',
    name: 'Лениздат',
    city: 'Санкт-Петербург',
}

export const PITER: Publisher = {
    id: '7',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'piter',
    name: 'Питер',
    city: 'Санкт-Петербург',
}

export const BOMBORA: Publisher = {
    id: '8',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'bombora',
    name: 'Бомбора',
    city: 'Москва',
}

export const ALPINA_PUB: Publisher = {
    id: '9',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'alpina-pablisher',
    name: 'Альпина Паблишер',
    city: 'Москва',
}

export const SYM_PLUS: Publisher = {
    id: '10',
    catergoriesId: ['6025e5c5b5e5db24648333d7'],
    slug: 'simvol-pljus',
    name: 'Символ-Плюс',
    city: 'Москва',
}

export const getAll = () => [
    AST,
    NOT_PUB,
    COLIBRI,
    EKSMO,
    GOS_PUB,
    AZBUKA,
    LENIZDAT,
    PITER,
    BOMBORA,
    ALPINA_PUB,
    SYM_PLUS,
]
