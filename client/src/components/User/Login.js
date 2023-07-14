

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import img from '../../assets/car3.webp';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      if (values.email.trim() && values.password.trim()) {
        try {
          const response = await axios.post('/login', values);
          console.log(response.data);
          if (!response.data.err) {
            dispatch({ type: 'refresh' });
            toast.success(response.data.message, {
              position: 'top-center'
            });
            return navigate('/');
          } else {
            toast.error(response.data.message, {
              position: 'top-center'
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error('All fields are required', {
          position: 'top-center'
        });
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{
      background: `url(${img})`,
      backgroundSize: '100% auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User Login</h2>
      </div>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  {...formik.getFieldProps('email')}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            {/* Password input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  {...formik.getFieldProps('password')}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
            {/* Sign in button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          {/* Register link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
                Register
              </Link>
            </span>
          </div>
          <div className="mt-1 text-center">
            <span className="text-sm text-gray-600">
              Forgot Password?{' '}
              <Link to="/resetpassword" className="text-indigo-600 hover:text-indigo-500">
                Reset
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
