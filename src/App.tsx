import { HomePage } from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import { TaskFormPage } from "@/pages/TaskFormPage/TaskFormPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/new" element={<TaskFormPage />} />
        <Route path="/task/:id" element={<TaskFormPage />} />
      </Routes>
    </>
  );
}

export default App;
