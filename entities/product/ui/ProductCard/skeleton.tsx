import { Card, Skeleton } from '@heroui/react'
export function ProductCardSkeleton() {
    return (
        <Card className="product-detail" aria-label="Загрузка книги">
            <Skeleton className="h-80 w-full rounded-2xl" />
            <div className="flex flex-col gap-6">
                <Skeleton className="h-12 w-1/2 rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
            </div>
        </Card>
    )
}
