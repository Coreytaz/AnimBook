import { Input } from '@nextui-org/react'
import { Search as SearchSVG } from 'lucide-react'
import React from 'react'

const Search = () => {
    return (
        <Input
            underlined
            placeholder="Поиск"
            initialValue=""
            color="primary"
            clearable
            contentRight={<SearchSVG />}
            css={{
                width: '100%',
            }}
        />
    )
}

export default Search
