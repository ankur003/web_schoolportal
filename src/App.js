import logo from './logo.svg';
import '././assets/scss/main.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateClass from './container/CreateClass';
import CreateSectionName from './container/CreateSectionName';
import LinkClass from './container/LinkClass';
import ProtectedRoute from './container/ProtectedRoute';
import Login from './components/Login';

function App() {
    const isAuthenticated = sessionStorage.getItem("token")
  return (
    <>
        <Router>
          <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<CreateClass />} path="/CreateClass" />
                <Route element={<CreateSectionName />} path="/CreateSectionName" />
                <Route element={<LinkClass />} path="/LinkClass" />
            </Route>
            <Route element={isAuthenticated ?  <Navigate to="/CreateClass"/> : <Login/>  } path="/"/>
          </Routes>
      </Router>
    </>
  );
}

export default App;