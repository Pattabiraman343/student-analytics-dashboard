import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ArticlesList from "../pages/student/ArticleList";
import ArticleReader from "../pages/student/ArticleReader";
import StudentDashboard from "../pages/student/StudentDashboard";
import Home from "../pages/home";

import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import CreateArticle from "../pages/teacher/CreateArticle";
import TeacherArticles from "../pages/teacher/TeacherArticles";
import TeacherAnalytics from "../pages/teacher/TeacherStudentAnalytics"; // <-- New
import EditArticle from "../pages/teacher/EditArticle";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
<Route path="/" element={<Home />} />      <Route path="/register" element={<Register />} />
      {/* <Route path="/home" element={<Home />} /> */}
      {/* Student Routes */}
      <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
      <Route path="/articles" element={<ProtectedRoute role="student"><ArticlesList /></ProtectedRoute>} />
      <Route path="/article/:id" element={<ProtectedRoute role="student"><ArticleReader /></ProtectedRoute>} />
      <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />

      {/* Teacher Routes */}
      <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/analytics" element={<ProtectedRoute role="teacher"><TeacherAnalytics /></ProtectedRoute>} /> {/* <-- New */}
      <Route path="/teacher/create" element={<ProtectedRoute role="teacher"><CreateArticle /></ProtectedRoute>} />
      <Route path="/teacher/articles" element={<ProtectedRoute role="teacher"><TeacherArticles /></ProtectedRoute>} />
      <Route
  path="/teacher/edit/:id"
  element={<EditArticle />}
/>
      {/* <Route
  path="/teacher/edit/:id"
  element={
    <ProtectedRoute role="teacher">
      <CreateArticle />
    </ProtectedRoute>
  }
/> */}
    </Routes>
  );
}

export default AppRoutes;