import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteTask } from "../model/taskSlice";
import { Task } from "../model/types";

interface DeleteTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const DeleteTaskDialog = ({
  isOpen,
  onClose,
  task,
}: DeleteTaskDialogProps) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">Подтверждение удаления</DialogTitle>
      <DialogContent>
        <Typography>
          Вы уверены, что хотите удалить задачу "{task.title}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleConfirm} color="error">
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
