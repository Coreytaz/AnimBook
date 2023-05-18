import { Loading, styled } from '@nextui-org/react'
import { Search as SearchSVG } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import { search } from './api'
import { GroupedOption, IOption } from './model'

const GroupStyles = styled('div', {
    d: 'flex',
    ai: 'center',
    jc: 'space-between',
})

const Control: FC<any> = ({ children, ...props }) => (
    <components.Control {...props}>
        {children}
        <SearchSVG style={{ marginRight: '10px' }} />
    </components.Control>
)

const Search: FC = () => {
    const router = useRouter()
    const promiseOptions = (inputValue: string) =>
        new Promise<GroupedOption[]>(async (resolve) => {
            const res = await search(inputValue)
            return resolve(res.data)
        })

    return (
        <AsyncSelect<IOption, false, GroupedOption>
            formatGroupLabel={(data) => (
                <GroupStyles>
                    <span>{data.label}</span>
                </GroupStyles>
            )}
            components={{
                Control,
            }}
            placeholder="Поиск..."
            onChange={(value) => router.push(value?.value as string)}
            styles={{
                container: (defaultStyles) => ({
                    ...defaultStyles,
                    width: 'var(--nextui-space-full)',
                }),
                indicatorsContainer: (base, props) => ({
                    display: 'none',
                }),
                placeholder: (defaultStyles) => ({
                    ...defaultStyles,
                    color: 'var(--nextui-colors-text)',
                }),
                input: (defaultStyles) => ({
                    ...defaultStyles,
                    color: 'var(--nextui-colors-text)',
                }),
                control: (defaultStyles) => ({
                    ...defaultStyles,
                    background: 'transparent',
                    borderRadius: 'none',
                    border: 'none',
                    borderBottom:
                        'var(--nextui-borderWeights-normal) solid var(--nextui--navbarBorderColor)',
                }),
                singleValue: (defaultStyles) => ({
                    ...defaultStyles,
                    color: 'var(--nextui-colors-text)',
                }),
                menu: (defaultStyles) => ({
                    ...defaultStyles,
                    backgroundColor: 'var(--nextui-colors-gray50)',
                    borderRadius: '12px',
                    border: 'var(--nextui--navbarBorderWeight) solid var(--nextui--navbarBorderColor)',
                    overflow: 'hidden',
                }),
                option: (defaultStyles, state) => ({
                    ...defaultStyles,
                    color: state.isSelected ? 'var(--nextui-colors-primary)' : '',
                    backgroundColor: state.isSelected ? 'var(--nextui-colors-gray200)' : '',
                    '&:hover': {
                        backgroundColor: 'var(--nextui-colors-gray100)',
                    },
                }),
            }}
            cacheOptions
            loadingMessage={() => <Loading />}
            noOptionsMessage={() => 'Ничего не найдено'}
            loadOptions={promiseOptions}
        />
    )
}

export default Search
