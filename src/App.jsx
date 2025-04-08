import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/Home/HomePage";
import { AboutPage } from "./pages/About/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Login } from "./auth/Login";
import { SignUp } from "./auth/SignUp";
import { Profile } from "./pages/Profile/Profile";
import { ProtectedRoutes } from "./auth/ProtectedRoutes";
import { checkAuth } from "./auth/AuthService";
import React, { useState, useEffect } from "react";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/:animeId" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
