
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Tour from './Components/Tour/Tour';
import AddTour from './Components/Tour/AddTour';
import User from './Components/User/User.js';
import AddUser from './Components/User/AddUser.js';
import EditUser from './Components/User/EditUser.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard/tour' element={<Tour />}></Route>
          <Route path='/dashboard/add_tour' element={<AddTour />}></Route>
          <Route path='/dashboard/user' element={<User />}></Route>
          <Route path='/dashboard/add_user' element={<AddUser />}></Route>
          <Route path='edit_user/:id' element={<EditUser />}></Route>
        </Route>


      </Routes>

    </BrowserRouter>
  );
}

export default App;
