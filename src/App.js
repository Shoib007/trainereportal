import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Navbar'
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import { AuthContext } from './authFolder/AuthContext';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const auth = useContext(AuthContext).is_Authenticated;
  return (

    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        {auth && <Sidebar />}
        <div style={{ flex: 1, overflowY: 'auto', height: '100vh' }}>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/dashboard' element={
              <PrivateRoute isSignedIn={auth}> <Dashboard /> </PrivateRoute>
            } />
            <Route path='/profile' element={
              <PrivateRoute isSignedIn={auth}><Profile /></PrivateRoute>
            } />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
