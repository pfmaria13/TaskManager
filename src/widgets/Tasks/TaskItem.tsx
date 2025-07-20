import { Card, CardContent, CardActions, Chip, Stack, Button } from '@mui/material';
import styles from './TaskItem.module.css';

export interface TaskItemProps {
    id: string;
    header: string;
    description: string;
    category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    onEdit?: () => void;
}

const statusColor: Record<TaskItemProps['status'], string> = {
    'To Do': 'default',
    'In Progress': '#c9dffd',
    Done: '#dcf3d8',
};

const getPriorityLabel = (priority: TaskItemProps['priority']) => {
    switch (priority) {
        case 'Low':
            return 'Low •';
        case 'Medium':
            return 'Medium ••';
        case 'High':
            return 'High •••';
    }
};

export const TaskItem = ({
                             header,
                             description,
                             category,
                             status,
                             priority,
                             onEdit,
                         }: TaskItemProps) => {
    return (
        <Card
            className={styles.taskItem}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardContent>
                <h2 className={styles.header}>{header}</h2>
                <p className={styles.description}>{description}</p>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className={styles.chips}>
                    <Chip
                        label={category}
                        size="small"
                        sx={{ fontSize: '0.7rem', height: 20, px: 1 }}
                    />
                    <Chip
                        label={status}
                        size="small"
                        sx={{ fontSize: '0.7rem', height: 20, px: 1, backgroundColor: statusColor[status] }}
                    />
                    <Chip
                        label={getPriorityLabel(priority)}
                        size="small"
                        sx={{
                            fontSize: '0.7rem',
                            height: 20,
                            padding: '0 6px'
                        }}
                    />
                </Stack>
            </CardContent>

            <CardActions sx={{ padding: '4px 16px 16px 16px', mt: 'auto' }}>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        fontSize: '0.7rem',
                        color: '#6c757d',
                        borderColor: '#6c757d',
                        height: 28,
                        transition: 'color 0.25s, border-color 0.25s',
                        '&:hover': { color: '#000', borderColor: '#000', backgroundColor: 'transparent' },
                    }}
                    onClick={onEdit}
                >
                    Редактировать
                </Button>
            </CardActions>
        </Card>
    );
};
