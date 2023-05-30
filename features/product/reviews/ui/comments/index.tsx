import { StarRating } from '@/entities/StarRating'
import { ReviewsProps } from '@/shared/api'
import { formatTime } from '@/shared/helpers'
import { Grid, Badge, Text, Avatar } from '@nextui-org/react'
import { CalendarDays } from 'lucide-react'
import { FC } from 'react'
import styles from './styles.module.scss'

interface CommentListProps {
    discription: string
    created_at: Date
    updated_at: Date
    user: {
        username: string
    }
    rating: number
}

const Comments: FC<{ feedbackList: ReviewsProps[] }> = ({ feedbackList }) => {
    return (
        <Grid.Container gap={2}>
            {feedbackList.map((comment, index) => (
                <Grid
                    sm={12}
                    key={index}
                    css={{
                        borderBottom: '3px solid $gray100',
                        '&:last-child': {
                            borderBottom: 'none',
                        },
                    }}
                >
                    <CommentList {...comment} />
                </Grid>
            ))}
        </Grid.Container>
    )
}

export const CommentList: FC<CommentListProps> = ({ discription, created_at, user, rating }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.comment_description}>
                <Text size="$lg">{discription}</Text>
            </div>
            <div className={styles.comment_info}>
                <div className={styles.comment_date}>
                    <CalendarDays />
                    <Text>{formatTime(created_at)}</Text>
                </div>
                <div className={styles.comment_user}>
                    <Avatar
                        text={user?.username ? user.username : 'Неизвестный'}
                        color="primary"
                        textColor="white"
                    />
                    <Text b>{user?.username ? user.username : 'Неизвестный'}</Text>
                </div>
                <div className={styles.comment_reviews}>
                    <Badge
                        size="lg"
                        isSquared
                        color="warning"
                        variant="bordered"
                        css={{ gap: '$2' }}
                    >
                        <StarRating tooltip readOnly rating={rating} />
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Comments
