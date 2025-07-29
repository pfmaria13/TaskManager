export interface Task {
  id: string;
  title: string;
  description: string;
  category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
}

export interface TaskState {
  tasks: Task[];
  filters: {
    category: string;
    status: string;
    priority: string;
    searchQuery: string;
  };
}
