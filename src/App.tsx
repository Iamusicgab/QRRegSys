import { Login } from "./components/Login";
// import { useState } from "react";
// import { loginGoogle, signOutUser, onAuthChange } from "./components/Firebase";

import "./index.css";
import { Dashboard } from "./components/Dashboard";
import { Admin } from "./components/Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
