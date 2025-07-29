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

/**
 * Интерфейс пропсов для компонента модального окна подтверждения удаления задачи
 * @interface DeleteTaskDialogProps
 * @property {boolean} isOpen - Флаг открытого состояния окна
 * @property {() => void} onClose - Функция для закрытия окна
 * @property {Task} task - Задача, которую нужно удалить
 */
interface DeleteTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

/**
 * Компонент модального окна для подтверждения удаления задачи
 * @param {DeleteTaskDialogProps} props - Пропсы компонента
 * @returns {JSX.Element} - Модальное окно с подтверждением
 */
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
