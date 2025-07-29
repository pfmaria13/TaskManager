import {
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import styles from "./TaskItem.module.css";
import { Task } from "@entities/task/model/types";

export const TaskItem = (props: Task) => {
  const { id, title, description, category, status, priority, createdAt } =
    props;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const statusColor: Record<Task["status"], string> = {
    "To Do": "default",
    "In Progress": "#c9dffd",
    Done: "#dcf3d8",
  };

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "Low":
        return "Low •";
      case "Medium":
        return "Medium ••";
      case "High":
        return "High •••";
    }
  };

  return (
    <Card
      className={styles.taskItem}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardContent>
        <h2 className={styles.header}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Typography variant="caption" color="text.secondary">
          Создано: {new Date(createdAt).toLocaleDateString("ru-RU")}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          className={styles.chips}
        >
          <Chip
            label={category}
            size="small"
            sx={{ fontSize: "0.7rem", height: 20, px: 1 }}
          />
          <Chip
            label={status}
            size="small"
            sx={{
              fontSize: "0.7rem",
              height: 20,
              px: 1,
              backgroundColor: statusColor[status],
            }}
          />
          <Chip
            label={getPriorityLabel(priority)}
            size="small"
            sx={{ fontSize: "0.7rem", height: 20, padding: "0 6px" }}
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: "4px 16px 16px 16px", mt: "auto" }}>
        <Button
          variant="outlined"
          size="small"
          component={Link}
          to={`/task/${id}`}
          sx={{
            fontSize: "0.7rem",
            color: "#6c757d",
            borderColor: "#6c757d",
            height: 28,
            transition: "color 0.25s, border-color 0.25s",
            "&:hover": {
              color: "#000",
              borderColor: "#000",
              backgroundColor: "transparent",
            },
          }}
        >
          Редактировать
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleDeleteClick}
          sx={{
            fontSize: "0.7rem",
            color: "#dc3545",
            borderColor: "#dc3545",
            height: 28,
            transition: "color 0.25s, border-color 0.25s",
            "&:hover": {
              color: "#a71d2a",
              borderColor: "#a71d2a",
              backgroundColor: "transparent",
            },
          }}
        >
          Удалить
        </Button>
      </CardActions>
      <DeleteTaskDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        task={props}
      />
    </Card>
  );
};
