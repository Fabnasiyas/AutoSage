import React from 'react';
import Home from './pages/User/HomePage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoginPage from './pages/User/LoginPage';
import RegisterFormPage from './pages/User/RegisterFormPage';
import ResetPass1 from './pages/User/ResetPassPage1'
import OtpPage from './components/User/OtpPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import VendorHome from './pages/Vendor/HomePage'
import VendorLoginPage from './pages/Vendor/LoginPage'
import axios from './axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ResetPass2 from './pages/User/ResetPassPage2'
import VendorLogin from './pages/Vendor/LoginPage'
import VendorRegister from './pages/Vendor/RegisterPage'
import VendorOtpPage from './components/Vendor/OtpPage';

function App() {
  const { user,vendor,refresh} = useSelector((state) => state);
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
<Route exact path="/vendor" element={<VendorLogin/>} />
<Route exact path="/vendor/login" element={<VendorLoginPage/>} />
<Route exact path="/vendor/register" element={<VendorRegister/>} />
<Route exact path="/vendor/otp" element={<endorOtpPage/>} />


</Routes>
<ToastContainer />

</Router>
      
      
    </div>
  );
}

export default App;
