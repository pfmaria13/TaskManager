import { Grid } from '@mui/material';
import { TaskItem, TaskItemProps } from './TaskItem';

interface TaskListProps {
    tasks: TaskItemProps[]; // теперь с id
    onEdit?: (task: TaskItemProps) => void;
}

export const TaskList = ({ tasks, onEdit }: TaskListProps) => {
    return (
        <Grid container spacing={2}>
            {tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id} sx={{ display: 'flex' }}>
                    <TaskItem
                        {...task}
                        onEdit={() => onEdit?.(task)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
