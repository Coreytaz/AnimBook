import { StarRating } from '@/entities/StarRating'
import { ReviewsProps } from '@/shared/api'
import { Grid, Badge, Text, Avatar } from '@nextui-org/react'
import { CalendarDays } from 'lucide-react'
import { FC } from 'react'
import styles from './styles.module.scss'

interface CommentListProps {
    description: string
    date: Date
    name: string
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

export const CommentList: FC<CommentListProps> = ({ description, date, name, rating }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.comment_description}>
                <Text>{description}</Text>
            </div>
            <div className={styles.comment_info}>
                <div className={styles.comment_date}>
                    <CalendarDays />
                    <Text>{date.toString()}</Text>
                </div>
                <div className={styles.comment_user}>
                    <Avatar text={name} color="primary" textColor="white" />
                    <Text b>{name}</Text>
                </div>
                <div className={styles.comment_reviews}>
                    <Badge
                        size="lg"
                        isSquared
                        color="warning"
                        variant="bordered"
                        css={{ gap: '$2' }}
                    >
                        <StarRating tooltip readOnly defaultState={rating} />
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Comments
