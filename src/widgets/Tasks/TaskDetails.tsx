import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Button,
    Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { TaskItemProps } from './TaskItem';

interface TaskDetailsProps {
    open: boolean;
    task: TaskItemProps;
    onClose: () => void;
    onSave: (task: TaskItemProps) => void;
}

export const TaskDetails = ({ open, task, onClose, onSave }: TaskDetailsProps) => {
    const [editedTask, setEditedTask] = useState<TaskItemProps>(task);

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const handleChange = (field: keyof TaskItemProps, value: string) => {
        setEditedTask((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(editedTask);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ padding: '25px 24px 30px 24px' }}>Редактировать задачу</DialogTitle>
            <DialogContent sx={{ padding: '32px' }}>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Заголовок"
                        value={editedTask.header}
                        onChange={(e) => handleChange('header', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Описание"
                        value={editedTask.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <TextField
                        label="Категория"
                        select
                        value={editedTask.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        fullWidth
                    >
                        {['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Статус"
                        select
                        value={editedTask.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        fullWidth
                    >
                        {['To Do', 'In Progress', 'Done'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Приоритет"
                        select
                        value={editedTask.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                        fullWidth
                    >
                        {['Low', 'Medium', 'High'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ padding: '0 24px 25px 16px' }}>
                <Button
                    onClick={onClose}
                    sx={{
                        color: '#6c757d',
                        transition: 'color 0.3s, border-color 0.3s',
                        '&:hover': { color: '#000', borderColor: '#000', backgroundColor: 'transparent' },
                    }}
                >
                    Отмена
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    sx={{
                        color: 'white',
                        backgroundColor: '#000',
                        transition: 'color 0.3s, border-color 0.3s, backgroundColor 0.3',
                        '&:hover': { color: 'white', borderColor: 'rgba(0,0,0,0.77)', backgroundColor: 'rgba(0,0,0,0.77)' }
                    }}
                >
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};