import { Login } from "./components/Login";
// import { useState } from "react";
// import { loginGoogle, signOutUser, onAuthChange } from "./components/Firebase";

import "./index.css";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
