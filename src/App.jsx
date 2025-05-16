import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/Home/HomePage";
import { AboutPage } from "./pages/About/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Login } from "./auth/Login";
import { SignUp } from "./auth/SignUp";
import { Profile } from "./pages/Profile/Profile";
import { CreatePost } from "./pages/Posts/CreatePost";
import { EditPost } from "./pages/Posts/EditPost";
import { ViewMyPosts } from "./pages/Posts/ViewMyPosts";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "./auth/ProtectedRoutes";
import { ViewAllPosts } from "./pages/Posts/ViewAllPosts";
import ChatBot from "./pages/ChatBot/ChatBot";
const steps = [
    {
        id: '0',
        message: 'Hey! Ask me for an anime recommendation!',
        end: true
    }
];

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/:animeId" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/my-posts"
          element={
            <ProtectedRoute>
              <ViewMyPosts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/all-posts"
          element={
            <ProtectedRoute>
              <ViewAllPosts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/edit-post/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
