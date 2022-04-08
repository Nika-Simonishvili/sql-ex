import React from "react";
import {Route, Router, Routes} from "react-router-dom";
import Questions from "../Questions";
import Login from "../pages/auth/Login";

export default function RouteManager() {

  return (
    <Router>
        <Routes>
            <Route exac path="/" element={<Questions />} />
            <Route exac path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}