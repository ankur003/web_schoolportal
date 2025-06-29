import '././assets/scss/main.scss';
import React from 'react';
import './i18n'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './container/ProtectedRoute';
import Login from './components/Login';
import ManageClasses from './container/ManageClasses';
import EntityPage from './container/EntityPage';
import StudentPage from './container/StudentPage';
import TeacherPage from './container/TeacherPage';
import ProfileDetailsPage from './container/ProfileDetailsPage';
import ForgetPassword from './components/ForgetPassword';
import ChangePassword from './components/ChangePassword';
import { Navigate, useLocation } from 'react-router-dom';

const App = () => {
  // Assume you have a way to get the user's role, e.g., from localStorage or context
  // Example: const userRole = localStorage.getItem('role');
  // For demonstration, let's use a placeholder function:
  const getUserRole = () => {
    // Replace this with your actual logic to get the user's role
    return localStorage.getItem('role');
  };

  // Role-based redirect component

  const RoleBasedRedirect = () => {
    const role = getUserRole();
    if (role === 'SUPER_ADMIN') return <Navigate to="/ManageClasses" replace />;
    if (role === 'TEACHER') return <Navigate to="/ProfileDetailsPage" replace />;
    if (role === 'STUDENT') return <Navigate to="/ProfileDetailsPage" replace />;
    // Default fallback
    return <Navigate to="/ManageClasses" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route
          path="/redirect"
          element={<RoleBasedRedirect />}
        />
        <Route element={<ProtectedRoute />} >
          <Route element={<ManageClasses />} path="/ManageClasses" />
          <Route element={<EntityPage />} path="/EntityPage" />
          <Route element={<ChangePassword />} path="/ChangePassword" />
          <Route element={<StudentPage />} path="/StudentPage" />
          <Route element={<TeacherPage />} path="/TeacherPage" />
          <Route element={<ProfileDetailsPage />} path="/ProfileDetailsPage" />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
