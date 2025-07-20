import { useState } from 'react'
import {HomePage} from "./pages/HomePage/HomePage";
import {BrowserRouter} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/task/:id" element={<HomePage />} />
        </Routes>
    </>
  )
}

export default App
