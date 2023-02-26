import { StarRating } from '@/entities/StarRating'
import { Grid, Badge, Text, Avatar } from '@nextui-org/react'
import { FC } from 'react'
import Calendar from '../../svg/calendar'
import styles from './styles.module.scss'

interface CommentListProps {
    description: string
    date: Date
    name: string
    rating: number
}

const Comments: FC = () => {
    const comments = [
        {
            description:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nam! Perferendis accusantium possimus aliquam? Possimus, exercitationem quisquam numquam earum magni est pariatur alias unde tempora, facilis maxime hic, placeat dolorem!',
            date: new Date(),
            name: 'Вася',
            rating: 4,
        },
        {
            description:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nam! Perferendis accusantium possimus aliquam? Possimus, exercitationem quisquam numquam earum magni est pariatur alias unde tempora, facilis maxime hic, placeat dolorem!',
            date: new Date(),
            name: 'Петя',
            rating: 2,
        },
        {
            description:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nam! Perferendis accusantium possimus aliquam? Possimus, exercitationem quisquam numquam earum magni est pariatur alias unde tempora, facilis maxime hic, placeat dolorem!',
            date: new Date(),
            name: 'Игорь',
            rating: 3,
        },
        {
            description:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nam! Perferendis accusantium possimus aliquam? Possimus, exercitationem quisquam numquam earum magni est pariatur alias unde tempora, facilis maxime hic, placeat dolorem!',
            date: new Date(),
            name: 'Борбрик',
            rating: 1,
        },
    ]
    return (
        <Grid.Container gap={2}>
            {comments.map((comment, index) => (
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
                    <Calendar />
                    <Text>{date.getDate()}</Text>
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
