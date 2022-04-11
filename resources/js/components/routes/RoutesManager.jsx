import React from "react";
import {Route, Routes} from "react-router-dom";
import Questions from "../pages/Questions";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Register from "../pages/auth/Register";
import Checker from "./Checker";

export default function RouteManager() {

  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<Questions />} />
            <Route path="/logout" element={<Checker> <Logout/> </Checker>} />
        </Routes>
    </>
  );
}
