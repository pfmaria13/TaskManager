import { Header } from "../../widgets/Header/Header";
import styles from "./HomePage.module.css";
import { TaskList } from "../../widgets/Tasks/TaskList";
import { TaskItemProps } from "../../widgets/Tasks/TaskItem";
import { TaskDetails } from "../../widgets/Tasks/TaskDetails";
import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Filter } from "../../widgets/Filters/Filter";
import { SearchLine } from "../../widgets/Filters/SearchLine"; // Обновлено имя компонента
import { Grid } from '@mui/material';

export const HomePage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();

    const [tasks, setTasks] = useState<TaskItemProps[]>([
        {
            id: '1',
            header: 'Добавить авторизацию',
            description: 'Реализовать OAuth2 через GitHub',
            category: 'Feature',
            status: 'To Do',
            priority: 'High',
        },
        {
            id: '2',
            header: 'Исправить баг с отображением',
            description: 'Ошибка при загрузке главной страницы',
            category: 'Bug',
            status: 'In Progress',
            priority: 'Medium',
        },
        {
            id: '3',
            header: 'Обновить документацию',
            description: 'Добавить раздел по API',
            category: 'Documentation',
            status: 'Done',
            priority: 'Low',
        },
    ]);

    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [priorityFilter, setPriorityFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>(''); // Состояние для поиска

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            return (
                (categoryFilter === '' || task.category === categoryFilter) &&
                (statusFilter === '' || task.status === statusFilter) &&
                (priorityFilter === '' || task.priority === priorityFilter) &&
                (searchQuery === '' || task.header.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
    }, [tasks, categoryFilter, statusFilter, priorityFilter, searchQuery]);

    const selectedTask = useMemo(() => {
        return tasks.find((task) => task.id === id);
    }, [id, tasks]);

    const handleEditClick = (task: TaskItemProps) => {
        navigate(`/task/${task.id}`);
    };

    const handleCloseDetails = () => {
        navigate('/');
    };

    const handleSaveTask = (editedTask: TaskItemProps) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === editedTask.id ? editedTask : t))
        );
        handleCloseDetails();
    };

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <SearchLine value={searchQuery} onChange={setSearchQuery} />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <Filter
                            label="Категория"
                            options={['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']}
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Filter
                            label="Статус"
                            options={['To Do', 'In Progress', 'Done']}
                            value={statusFilter}
                            onChange={setStatusFilter}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Filter
                            label="Приоритет"
                            options={['Low', 'Medium', 'High']}
                            value={priorityFilter}
                            onChange={setPriorityFilter}
                        />
                    </Grid>
                </Grid>
                <TaskList tasks={filteredTasks} onEdit={handleEditClick} />
            </main>

            {selectedTask && (
                <TaskDetails
                    open={Boolean(selectedTask)}
                    task={selectedTask}
                    onClose={handleCloseDetails}
                    onSave={handleSaveTask}
                />
            )}
        </div>
    );
};