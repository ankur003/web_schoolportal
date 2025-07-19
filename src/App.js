import '././assets/scss/main.scss';
import React from 'react';
import './i18n';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
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
import AttendanceCalendarPage from './container/EntityCalender';
import LeaveRequest from './container/LeaveRequest';
import FeeSetUpModule from './container/FeeManagementModule/FeeSetUpModule';
import PaymentDetails from './container/PaymentDetails';
import TimeTable from './container/TimeTable';
import ParentsPage from './container/ParentsPage';
import Dashboard from './container/Dashboard';
import FeePaymentModule from './container/FeeManagementModule/FeePaymentModule';

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
    console.log("User Role:", role);
    if (role === 'SUPER_ADMIN') return (<Navigate to="/Dashboard" replace />);
    if (role === 'TEACHER') return <Navigate to="/Dashboard" replace />;
    if (role === 'STUDENT') return <Navigate to="/Dashboard" replace />;
    if (role === 'PARENT') return <Navigate to="/Dashboard" replace />;
    // Default fallback
    return <Navigate to="/ManageClasses" replace />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route
            path="/redirect"
            element={<RoleBasedRedirect />}
          />
          <Route element={<ProtectedRoute />} >
            <Route element={<Dashboard />} path="/Dashboard" />
            <Route element={<ManageClasses />} path="/ManageClasses" />
            <Route element={<EntityPage />} path="/EntityPage" />
            <Route element={<ChangePassword />} path="/ChangePassword" />
            <Route element={<StudentPage />} path="/StudentPage" />
            <Route element={<TeacherPage />} path="/TeacherPage" />
            <Route element={<ProfileDetailsPage />} path="/ProfileDetailsPage" />
            <Route element={<AttendanceCalendarPage />} path="/AttendanceCalendarPage" />
            <Route element={<LeaveRequest />} path="/LeaveRequest" />
            <Route element={<FeeSetUpModule />} path="/FeeSetUpModule" />
            <Route element={<FeePaymentModule />} path="/FeePaymentModule" />
            <Route element={<TimeTable />} path="/TimeTable" />
            <Route element={<ParentsPage />} path="/ParentsPage" />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;
