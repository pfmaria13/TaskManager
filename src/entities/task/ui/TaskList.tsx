import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFilteredTasks } from "@entities/task/model/selectors";
import { TaskItem } from "./TaskItem";

/**
 * Компонент списка отфильтрованных задач
 * @return {JSX.Element} - сетка с компонентами задач TaskItem
 */
export const TaskList = () => {
  const tasks = useSelector(selectFilteredTasks);

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          key={task.id}
          sx={{ display: "flex" }}
        >
          <TaskItem {...task} />
        </Grid>
      ))}
    </Grid>
  );
};
