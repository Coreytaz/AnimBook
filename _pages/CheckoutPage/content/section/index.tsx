import { Skeleton } from '@/shared/ui'
import { Card, CardProps, Text } from '@nextui-org/react'
import { FC, forwardRef, ReactNode } from 'react'

export const Section = forwardRef<
    HTMLDivElement,
    { title?: string; descriptions?: string; children: ReactNode; isLoading?: boolean } & CardProps
>(({ title, descriptions, children, isLoading, css, ...props }, ref) => {
    if (isLoading) {
        return (
            <section>
                <Skeleton style={{ width: '10%', height: '36px', marginTop: '10px' }} />
                <Skeleton style={{ width: '20%', height: '28px', marginTop: '10px' }} />
                <Skeleton style={{ width: '100%', height: '400px', marginTop: '10px' }} />
            </section>
        )
    }

    return (
        <section {...props}>
            <Text h3>{title}</Text>
            <Text>{descriptions}</Text>
            <Card
                ref={ref}
                variant="bordered"
                css={{
                    mt: '$5',
                    p: '$5',
                    overflow: 'scroll',
                    d: 'flex',
                    flexFlow: 'nowrap',
                    gap: '$13',
                    ...css,
                }}
            >
                {children}
            </Card>
        </section>
    )
})

Section.displayName = 'Section'
