import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Navbar'
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import { AuthContext } from './authFolder/AuthContext';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

function App() {
  const auth = useContext(AuthContext);
  return (
    <div style={{display:'flex'}}>
      
      <Router>
        {auth.is_Authenticated && <Sidebar />}
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
