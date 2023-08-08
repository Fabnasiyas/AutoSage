import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

const CarRegistrationPage = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vendor } = useSelector(state => state);
  const vendorId = vendor.details._id;
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('vendorId', vendorId);
    formData.append('model', values.model);
    formData.append('year', values.year);
    formData.append('mileage', values.mileage);
    formData.append('fuelType', values.fuelType);
    formData.append('transmissionMode', values.transmissionMode);
    formData.append('specifications', values.specifications);
    formData.append('rentPerDay', values.rentPerDay);
    values.rcImage.forEach((item) => {
      formData.append('rcImage', item);
    });
    values.carImages.forEach((item) => {
      formData.append('carImages', item);
    });
    formData.append('location', searchValue);
    formData.append('coordinates', JSON.stringify(coordinates));

    axios.post('/vendor/addcardetails', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      if (!response.data.err) {
        dispatch({ type: 'refresh' });
        console.log(response.data);
        navigate('/vendor/vendorhome');
      } else {
        toast.error(response.data.message, {
          position: 'top-center'
        });
      }
    });
  };

  const initialValues = {
    model: '',
    year: '',
    mileage: '',
    fuelType: '',
    transmissionMode: '',
    specifications: '',
    rentPerDay: '',
    rcImage: [],
    carImages: []
  };

  const validationSchema = Yup.object().shape({
    model: Yup.string().required('Car model is required'),
    year: Yup.number().required('Year is required').integer('Invalid year'),
    mileage: Yup.number().required('Mileage is required').integer('Invalid mileage'),
    fuelType: Yup.string().required('Fuel type is required'),
    transmissionMode: Yup.string().required('Transmission mode is required'),
    specifications: Yup.string().required('Specifications are required'),
    rentPerDay: Yup.number().required('Rent per day is required').integer('Invalid rent per day'),
    rcImage: Yup.array().required('RC image is required').min(1, 'RC image is required'),
    carImages: Yup.array().required('Car images are required').min(1, 'Car images are required')
  });

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await Axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`
      );
      const suggestions = response.data.features.map((feature) => ({
        location: feature.place_name,
        coordinates: feature.center,
      }));
      setSuggestions(suggestions);
      setCoordinates(response.data.features[0].center);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.location);
    setSuggestions([]);
    setCoordinates(suggestion.coordinates);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Car Registration</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6" encType="multipart/form-data">
                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                    Car Model
                  </label>
                  <div className="mt-1">
                    <Field
                      id="carModel"
                      name="model"
                      type="text"
                      autoComplete="car-make"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="model" component="div" className="text-red-500 mt-1" />
                  </div>
                </div>
                {/* Location */}
                <div style={{ position: 'relative' }}>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="mt-1">
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={searchValue}
                      onChange={handleSearchChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                        {suggestions.map((suggestion) => (
                          <li
                            key={suggestion.location}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion.location}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="carYear" className="block text-sm font-medium text-gray-700">
                    Car Year
                  </label>
                  <div className="mt-1">
                    <Field
                      id="carYear"
                      name="year"
                      type="number"
                      autoComplete="car-year"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="year" component="div" className="text-red-500 mt-1" />
                  </div>
                </div>
                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                    Mileage
                  </label>
                  <Field
                    id="carMileage"
                    name="mileage"
                    type="number"
                    autoComplete="car-mileage"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="mileage" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                    Fuel Type
                  </label>
                  <Field
                    as="select"
                    id="fuelType"
                    name="fuelType"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a value</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesal">Diesal</option>
                    <option value="electric">Electric</option>
                  </Field>
                  <ErrorMessage name="fuelType" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                    Transmission Mode
                  </label>
                  <Field
                    as="select"
                    id="transmissionMode"
                    name="transmissionMode"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a value</option>
                    <option value="mannual">Mannual Transmission</option>
                    <option value="automatic">Automatic Transmission</option>
                  </Field>
                  <ErrorMessage name="transmissionMode" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                    Specifications
                  </label>
                  <Field
                    as="select"
                    id="specifications"
                    name="specifications"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a value</option>
                    <option value="basemodel">Base Model</option>
                    <option value="semioption">Semi Option</option>
                    <option value="fulloption">Full Option</option>
                  </Field>
                  <ErrorMessage name="specifications" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                    Rent Per Day
                  </label>
                  <Field
                    id="rentPerDay"
                    name="rentPerDay"
                    type="number"
                    autoComplete="rent-per-day"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="rentPerDay" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="rcImage" className="block text-sm font-medium text-gray-700">
                    RC Image
                  </label>
                  <div className="mt-1">
                    <input
                      id="rcImage"
                      name="rcImage"
                      type="file"
                      accept="image/*"
                      required
                      multiple
                      className="appearance-none block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(event) => setFieldValue('rcImage', [...event.target.files])}
                    />
                    <ErrorMessage name="rcImage" component="div" className="text-red-500 mt-1" />
                  </div>
                </div>
                <div>
                  <label htmlFor="carImages" className="block text-sm font-medium text-gray-700">
                    Car Images
                  </label>
                  <div className="mt-1">
                    <input
                      id="carImages"
                      name="carImages"
                      type="file"
                      accept="image/*"
                      multiple
                      required
                      className="appearance-none block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(event) => setFieldValue('carImages', [...event.target.files])}
                    />
                    <ErrorMessage name="carImages" component="div" className="text-red-500 mt-1" />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register Car
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CarRegistrationPage;
