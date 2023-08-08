import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import img from '../../assets/car3.webp';

const RegisterForm = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
  const handleSubmit = (values) => {
    axios
      .post('/signup', values)
      .then((response) => {
        if (!response.data.err) {
          dispatch({ type: 'refresh' });
          console.log(response.data);
          const data = {
            name: values.name,
            email: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber
          };
          return navigate('/otp', { state: { data } });
        } else {
          toast.success(response.data.message, {
            position: 'top-center'
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error occurred during registration.', {
          position: 'top-center'
        });
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{
      background: `url(${img})`,
      backgroundSize: '100% auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="mt-8 sm:mx-auto sm:w-full md:max-w-xl lg:max-w-2xl xl:max-w-xl">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10 loginbox mx-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
          </div>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              phoneNumber: ''
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Name is required';
              }
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'Required';
              } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
              } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords do not match';
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = 'Required';
              } else if (!/^\d{10}$/.test(values.phoneNumber)) {
                errors.phoneNumber = 'Invalid phone number';
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">
              <div>

                <div className="mt-1">
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:py-3"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500" />
                </div>
              </div>
              <div>

                <div className="mt-1">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder=' Email address'
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  md:py-3"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>
              </div>
              <div>
                <div className="mt-1">
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder='Phone Number'
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  md:py-3"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
                </div>
              </div>
              <div>
                <div className="mt-1 relative">
                  <Field
                    id="password"
                    name="password"
                    placeholder='Password'
                    type={passwordVisible ? 'text' : 'password'}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:py-3"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  >
                    {passwordVisible ? (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 4C14.4183 4 18 7.58172 18 12C18 16.4183 14.4183 20 10 20C5.58172 20 2 16.4183 2 12C2 7.58172 5.58172 4 10 4ZM10 14C12.7614 14 15 11.7614 15 9C15 6.23858 12.7614 4 10 4C7.23858 4 5 6.23858 5 9C5 11.7614 7.23858 14 10 14ZM10 12C11.6569 12 13 10.6569 13 9C13 7.34315 11.6569 6 10 6C8.34315 6 7 7.34315 7 9C7 10.6569 8.34315 12 10 12Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16ZM10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
              </div>
              <div>

                <div className="mt-1 relative">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder='Confirm Password'
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:py-3"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  >
                    {confirmPasswordVisible ? (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 4C14.4183 4 18 7.58172 18 12C18 16.4183 14.4183 20 10 20C5.58172 20 2 16.4183 2 12C2 7.58172 5.58172 4 10 4ZM10 14C12.7614 14 15 11.7614 15 9C15 6.23858 12.7614 4 10 4C7.23858 4 5 6.23858 5 9C5 11.7614 7.23858 14 10 14ZM10 12C11.6569 12 13 10.6569 13 9C13 7.34315 11.1046 12 10 12C8.34315 12 7 10.6569 7 9C7 7.34315 8.34315 6 10 6Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16ZM10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  md:py-3"
                >
                  Register
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
