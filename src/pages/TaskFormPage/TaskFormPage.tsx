import { useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import { selectTaskById } from "@entities/task/model/selectors";
import { TaskForm } from "@features/task/ui/TaskForm";
import { useAppSelector } from "@/app/hooks";

export const TaskFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const task = useAppSelector((state) => selectTaskById(id || "")(state));
  const isNewTask = !id;

  return (
    <Dialog
      open={true}
      onClose={() => window.history.back()}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <TaskForm task={task} isNewTask={isNewTask} />
      </DialogContent>
    </Dialog>
  );
};
