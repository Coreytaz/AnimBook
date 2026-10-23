'use client'
import { SearchField, Spinner } from '@heroui/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { search } from './api'
import type { GroupedOption } from './model'

export default function Search() {
    const [query, setQuery] = useState('')
    const [result, setResult] = useState<GroupedOption[]>([])
    const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
    const [open, setOpen] = useState(false)
    const root = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (query.trim().length < 2) return
        let active = true
        const timer = setTimeout(async () => {
            setStatus('loading')
            try {
                const response = await search(query.trim())
                if (active) {
                    setResult(response.data)
                    setStatus('done')
                }
            } catch {
                if (active) setStatus('error')
            }
        }, 300)
        return () => {
            active = false
            clearTimeout(timer)
        }
    }, [query])
    useEffect(() => {
        const close = (event: PointerEvent) => {
            if (!root.current?.contains(event.target as Node)) setOpen(false)
        }
        document.addEventListener('pointerdown', close)
        return () => document.removeEventListener('pointerdown', close)
    }, [])
    return (
        <div
            className="search-wrap"
            ref={root}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
            }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') setOpen(false)
            }}
        >
            <SearchField
                aria-label="Поиск книг и категорий"
                value={query}
                onChange={(value) => {
                    setQuery(value)
                    setStatus('idle')
                    setOpen(true)
                }}
                className="w-full"
                onFocus={() => setOpen(true)}
            >
                <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input placeholder="Найти свою следующую историю…" />
                    <SearchField.ClearButton aria-label="Очистить поиск" />
                </SearchField.Group>
            </SearchField>
            {open && query.trim().length >= 2 && (
                <div className="search-results" aria-label="Результаты поиска">
                    <div role="status">
                        {status === 'loading' || status === 'idle' ? (
                            <span className="search-message">
                                <Spinner size="sm" /> Ищем истории…
                            </span>
                        ) : status === 'error' ? (
                            <p className="search-message">
                                Не удалось выполнить поиск. Попробуйте ещё раз.
                            </p>
                        ) : !result.some((group) => group.options.length) ? (
                            <p className="search-message">
                                Ничего не найдено. Попробуйте другое название.
                            </p>
                        ) : null}
                    </div>
                    {status === 'done' &&
                        result.map((group) => (
                            <div key={group.label}>
                                <p className="search-group">{group.label}</p>
                                {group.options.map((option) => (
                                    <Link
                                        key={option.value}
                                        href={String(option.value)}
                                        onClick={() => {
                                            setOpen(false)
                                            setQuery('')
                                        }}
                                    >
                                        {option.label}
                                    </Link>
                                ))}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
