import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState } from "./types";
import { v4 as uuidv4 } from "uuid";

const isValidTask = (task: unknown): task is Task => {
  if (typeof task !== "object" || task === null) return false;

  const t = task as Record<string, unknown>;

  return (
      typeof t.id === "string" &&
      typeof t.title === "string" &&
      typeof t.description === "string" &&
      ["Bug", "Feature", "Documentation", "Refactor", "Test"].includes(t.category as string) &&
      ["To Do", "In Progress", "Done"].includes(t.status as string) &&
      ["Low", "Medium", "High"].includes(t.priority as string) &&
      typeof t.createdAt === "string"
  );
};


const getInitialTasks = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return [];
    const parsedTasks = JSON.parse(storedTasks);
    if (!Array.isArray(parsedTasks)) {
      console.error("Данные в localStorage не являются массивом:", parsedTasks);
      localStorage.setItem("tasks", JSON.stringify([]));
      return [];
    }
    const validTasks = parsedTasks.filter(isValidTask);
    if (validTasks.length !== parsedTasks.length) {
      localStorage.setItem("tasks", JSON.stringify(validTasks));
    }
    return validTasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch (error) {
    console.error("Ошибка при парсинге tasks из localStorage:", error);
    localStorage.setItem("tasks", JSON.stringify([]));
    return [];
  }
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  if (!Array.isArray(tasks)) {
    console.error("Попытка сохранить не массив в localStorage:", tasks);
    localStorage.setItem("tasks", JSON.stringify([]));
    return;
  }
  console.log("Saving to localStorage:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState: TaskState = {
  tasks: getInitialTasks(),
  filters: {
    category: "",
    status: "",
    priority: "",
    searchQuery: "",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask(state, action: PayloadAction<Omit<Task, "id" | "createdAt">>) {
      const newTask: Task = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      state.tasks.unshift(newTask);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.tasks.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    setFilter(state, action: PayloadAction<Partial<TaskState["filters"]>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { createTask, updateTask, deleteTask, setFilter } =
  taskSlice.actions;
export default taskSlice.reducer;
