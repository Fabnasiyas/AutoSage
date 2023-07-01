import React from 'react';
import Home from './pages/User/HomePage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoginPage from './pages/User/LoginPage';
import RegisterFormPage from './pages/User/RegisterFormPage';
import ResetPass1 from './pages/User/ResetPassPage1'
import OtpPage from './components/User/OtpPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import VendorDashboard from './pages/Vendor/HomePage'
import VendorLoginPage from './pages/Vendor/LoginPage'
import axios from './axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ResetPass2 from './pages/User/ResetPassPage2'
import VendorLogin from './pages/Vendor/LoginPage'
import VendorRegister from './pages/Vendor/RegisterPage'
import VendorOtpPage from './components/Vendor/OtpPage';
import AdminLogin from './pages/Admin/LoginPage'
import AdminDashboard from './pages/Admin/DashboardPage';
import VendorList from './pages/Admin/VendorManagmentPage'
import UserManagmentPage from './pages/Admin/UserManagmentPage';
// import VerifRestOtp from './pages/User/ResetPassPage2'
import Newpassword from './components/User/NewPassword'; 
import VendorProfile from './pages/Vendor/ProfilePage' ;
import AddCarPage from './pages/Vendor/AddCarPage';
import EditProfile from './pages/Vendor/editProfilePage';
import CarListPage from './pages/Vendor/VendorCarlistpage'
import Carmanagment from './pages/Admin/carManagmentPage'
function App() {
  const { user,vendor,admin,refresh} = useSelector((state) => state);
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/auth/').then((response) => {
      console.log("USER:", response.data);
      dispatch({ type: 'user', payload: { login: response.data.logged, details: response.data.details } });
    }); 
    axios.get('/vendor/auth').then((response) => {
      console.log("VENDOR: ", response.data);
      dispatch({ type: 'vendor', payload: { vendorLog: response.data.logged, details: response.data.details } });
    });
    axios.get('/admin/auth').then((response) => {
      console.log("ADMIN: ", response.data);
      dispatch({ type: 'admin', payload: { adminLog: response.data.logged, details: response.data.details } });
    });
  }, [refresh, dispatch]);
  return (
    <div className="App">
<Router>
  <Routes>
<Route exact path="/" element={<Home/>} />
<Route exact path="/login" element={<LoginPage/>} />
<Route exact path="/register" element={<RegisterFormPage/>} />
<Route exact path="/otp" element={<OtpPage/>} />
<Route exact path="/resetpassword" element={<ResetPass1/>} />
<Route exact path='/resetpassotp' element={<ResetPass2/>} />
{/* <Router exact path='/verify-otp' element={<VerifRestOtp/>}/> */}
<Route exact path="/vendor" element={<VendorLogin/>} />
<Route exact path="/vendor/login" element={<VendorLoginPage/>} />
<Route exact path="/vendor/register" element={<VendorRegister/>} />
<Route exact path="/vendor/otp" element={<VendorOtpPage/>} />
<Route exact path='/vendor/vendorhome' element={<VendorDashboard/>} />
<Route exact path='/SetNewPassword' element={<Newpassword/>} />
<Route exact path="/admin" element={<AdminLogin/>} />
<Route exact path="/admin/home" element={<AdminDashboard/>} />
<Route exact path="/admin/usermanagment" element={<UserManagmentPage/>} />
<Route exact path="/admin/vendormanagment" element={<VendorList/>} />
<Route exact path="/vendor/vendorprofile" element={<VendorProfile/>} />
<Route exact path="/vendor/addcar" element={<AddCarPage/>} />
<Route exact path="/vendor/editprofile" element={<EditProfile/>} />
<Route exact path="/vendor/carlist" element={<CarListPage/>} />
<Route exact path="/admin/carManagment" element={<Carmanagment/>} />

</Routes>
<ToastContainer />

</Router>
      
      
    </div>
  );
}

export default App;
