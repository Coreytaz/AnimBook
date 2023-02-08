import { Input } from '@nextui-org/react'
import React from 'react'
import { SearchSvg } from './svg/SearchSvg'

const Search = () => {
    return (
        <Input
            underlined
            placeholder="Поиск"
            initialValue=""
            color="primary"
            clearable
            contentRight={<SearchSvg />}
            css={{
                width: '100%',
            }}
        />
    )
}

export default Search
