


import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import  Axios  from 'axios';

// const mapToken = process.env.MAP_TOKEN;
const RegisterForm = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

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
      location:'',
      coordinates: [],
    },
    validationSchema,
    onSubmit: (values) => {
      axios.post('/vendor/signup', values).then((response) => {
        console.log("*******************************", response.data);
        if (!response.data.err) {
          dispatch({ type: 'refresh' });
          console.log(response.data);
          const data = {
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            pincode: values.pincode,
            password: values.password,
            location: searchValue, // Use searchValue directly
      coordinates: coordinates // Use coordinates state variable
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
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchSuggestions(value);
  }
   
const fetchSuggestions=async(value)=>{

  try {
    const response = await Axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=`
    );
    console.log(response);
    const suggestions = response.data.features.map((feature) => ({
      location: feature.place_name,
      coordinates: feature.center
    }));

    setSuggestions(suggestions);
    setCoordinates(response.data.features[0].center); // Store coordinates in state

  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};
console.log("+++++++++++++++++",suggestions)
const handleSuggestionClick = (suggestion) => {
  // When a suggestion is clicked, update the search value and clear the suggestions list
  setSearchValue(suggestion);
  setSuggestions([]);
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Vendor Registration
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phoneNumber"
                  type="text"
                  required
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              required
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <div style={{ position: 'relative' }}>
  <input
    type="text"
    placeholder="Location"
    value={searchValue}
    onChange={handleSearchChange}
    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />
  {suggestions.length > 0 && (
    <div className="suggestion-box">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion}
          onClick={() => handleSuggestionClick(suggestion)}
          // style={{ cursor: 'pointer' }}
        >
          {suggestion.location.substring(0, 20)}
        </div>
      ))}
    </div>
  )}
</div>


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
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmpassword"
                  name="confirmPassword"
                  type="password"
                  required
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
