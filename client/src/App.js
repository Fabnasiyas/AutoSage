


import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from './axios';
import { useSelector, useDispatch } from 'react-redux';
 

import Home from './pages/User/HomePage';
import LoginPage from './pages/User/LoginPage';
import RegisterFormPage from './pages/User/RegisterFormPage';
import ResetPass1 from './pages/User/ResetPassPage1';
import OtpPage from './components/User/OtpPage';
import ResetPass2 from './pages/User/ResetPassPage2';
import Newpassword from './components/User/NewPassword';
import UserProfile from './pages/User/UserProfilePage';
import ViewcarDetails from './pages/User/CarDetailsPage'
import UserEditProfilePage from './components/User/EditUserProfile'
import AddDocumentPage from './components/User/DocumentsAdd'
import VendorDashboard from './pages/Vendor/HomePage';
import VendorLoginPage from './pages/Vendor/LoginPage';
import VendorRegister from './pages/Vendor/RegisterPage';
import VendorOtpPage from './components/Vendor/OtpPage';
import VendorProfile from './pages/Vendor/ProfilePage';
import AddCarPage from './pages/Vendor/AddCarPage';
import EditProfile from './pages/Vendor/editProfilePage';
import CarListPage from './pages/Vendor/VendorCarlistpage';
import ViewAllCarsPage from './pages/User/ViewallcarPage'
import PaymentFailPage from './components/User/Paymentfail'
import AdminLogin from './pages/Admin/LoginPage';
import AdminDashboard from './pages/Admin/DashboardPage';
import VendorList from './pages/Admin/VendorManagmentPage';
import UserManagmentPage from './pages/Admin/UserManagmentPage';
import Carmanagment from './pages/Admin/carManagmentPage';
import PaymentsuccessPage from './components/User/Paymentsuccess'
import ErrorPage from './components/User/404'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, vendor, admin, refresh } = useSelector((state) => state);
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
  }, [refresh, dispatch ]);

  const ProtectedUserRoute = ({ element, path }) => {
    return user.login ? element : <Navigate to="/login" />;
  };

  const ProtectedVendorRoute = ({ element, path }) => {
  
    return vendor.vendorLog ? element : <Navigate to="/vendor/login" />;
  };

  const ProtectedAdminRoute = ({ element, path }) => {
    return admin.adminLog ? element : <Navigate to="/admin" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage/> } />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterFormPage />} />
          <Route exact path="/otp" element={<OtpPage />} />
          <Route exact path="/resetpassword" element={<ResetPass1 />} />
          <Route exact path="/resetpassotp" element={<ResetPass2 />} />
          <Route exact path="/SetNewPassword" element={<Newpassword />} />
          {/* <Route exact path='/userprofile' element={<UserProfile/> }/> */}
          {/* <Route exact path='/edituserProfile' element={<UserEditProfilePage/> }/> */}
          {/* <Route exact path='/adddocuments' element={<AddDocumentPage/> }/> */}
          <Route exact path='/viewcardetails/:id' element={<ViewcarDetails/> }/>
          <Route exact path='/allcarsPage' element={<ViewAllCarsPage/> }/>
          <Route exact path="/vendor" element={<VendorLoginPage />} />
          <Route exact path="/vendor/login" element={<VendorLoginPage />} />
          <Route exact path="/vendor/register" element={<VendorRegister />} />
          <Route exact path="/vendor/otp" element={<VendorOtpPage />} />



          <Route
            exact
            path="/userprofile"
            element={<ProtectedUserRoute element={<UserProfile />} />}
          />
          <Route
            exact
            path="/edituserProfile"
            element={<ProtectedUserRoute element={<UserEditProfilePage />} />}
          />
           <Route
            exact
            path="/adddocuments"
            element={<ProtectedUserRoute element={<AddDocumentPage />} />}
          />
          <Route
            exact
            path="/payment-failure"
            element={<ProtectedUserRoute element={<PaymentFailPage />} />}
          />
          <Route
            exact
            path="/success"
            element={<ProtectedUserRoute element={<PaymentsuccessPage />} />}
          />
          


          <Route
            exact
            path="/admin"
            element={<AdminLogin />}
          />
          <Route
            exact
            path="/admin/home"
            element={<ProtectedAdminRoute element={<AdminDashboard />} />}
          />
          <Route
            exact
            path="/admin/usermanagment"
            element={<ProtectedAdminRoute element={<UserManagmentPage />} />}
          />
          <Route
            exact
            path="/admin/vendormanagment"
            element={<ProtectedAdminRoute element={<VendorList />} />}
          />
          <Route
            exact
            path="/admin/carManagment"
            element={<ProtectedAdminRoute element={<Carmanagment />} />}
          />



          <Route
            exact
            path="/vendor/vendorhome"
            element={<ProtectedVendorRoute element={<VendorDashboard />} />}
          />
          <Route
            exact
            path="/vendor/vendorprofile"
            element={<ProtectedVendorRoute element={<VendorProfile />} />}
          />
          <Route
            exact
            path="/vendor/addcar"
            element={<ProtectedVendorRoute element={<AddCarPage />} />}
          />
          <Route
            exact
            path="/vendor/editprofile"
            element={<ProtectedVendorRoute element={<EditProfile />} />}
          />
          <Route
            exact
            path="/vendor/carlist"
            element={<ProtectedVendorRoute element={<CarListPage />} />}
          />
          
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
