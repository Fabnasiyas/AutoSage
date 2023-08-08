import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Axios from 'axios';
import img from '../../assets/car3.webp';

const RegisterForm = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be a 10-digit number')
      .required('Phone number is required'),
    pincode: Yup.string()
      .matches(/^\d{6}$/, 'Pincode must be a 6-digit number')
      .required('Pincode is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      pincode: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      axios.post('/vendor/signup', values).then((response) => {
        if (!response.data.err) {
          dispatch({ type: 'refresh' });
          console.log(response.data);
          const data = {
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            pincode: values.pincode,
            password: values.password,
          };
          toast.error(response.data.message, {
            position: 'top-center',
          });
          return navigate('/vendor/otp', { state: { data } });

        } else {
          toast.error(response.data.message, {
            position: 'top-center',
          });
        }
      });
    },
  });


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        background: `url(${img})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-9">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Vendor Registration
            </h2>
          </div>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder='Name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder='Email address'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phoneNumber"
                  type="text"
                  required
                  placeholder='Phone number'
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.phoneNumber}</p>
              )}
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700">
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  placeholder='Pincode'
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.pincode && formik.errors.pincode && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.pincode}</p>
              )}
            </div>
            <div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
            <div>
              <div className="mt-1">
                <input
                  id="confirmpassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder=' Confirm Password'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
