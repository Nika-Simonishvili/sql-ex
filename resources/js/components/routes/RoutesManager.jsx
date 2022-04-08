import React from "react";
import {Route, Routes} from "react-router-dom";
import Questions from "../pages/Questions";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Register from "../pages/auth/Register";

export default function RouteManager() {

  return (
    <>
        <Routes>
            <Route exac path="/" element={<Questions />} />
            <Route exac path="/login" element={<Login />} />
            <Route exac path="/logout" element={<Logout />} />
            <Route exac path="/register" element={<Register />} />
        </Routes>
    </>
  );
}
