import '././assets/scss/main.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './container/ProtectedRoute';
import Login from './components/Login';
import ManageClasses from './container/ManageClasses';
import EntityPage from './container/EntityPage';
import ForgetPassword from './components/ForgetPassword';
import ChangePassword from './components/ChangePassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route element={<ProtectedRoute />} >
          <Route element={<ManageClasses />} path="/ManageClasses" />
          <Route element={<EntityPage />} path="/EntityPage" />
          <Route element={<ChangePassword />} path="/ChangePassword" />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
