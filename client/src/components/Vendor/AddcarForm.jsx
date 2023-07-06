
import React, { useState } from 'react';
import axios from '../../axios'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';
const CarRegistrationPage = () => {

      axios.defaults.withCredentials = true;
      const navigate = useNavigate();
      const dispatch=useDispatch();
     const {vendor} =useSelector(state=>state)
     console.log("aaaaaaaaaaaaaaaaa",vendor);
     const vendorId=vendor.details._id
     console.log("rrrrrrrrrrrrr",vendorId);
      const [model,setModel]=useState('');
      const [err, setErr] = useState(null)
      const [year,setYear]=useState('');
      const [mileage,setMileage]=useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmissionMode, setTransmissionMode] = useState('');
  const [specifications, setSpecifications] = useState('');
const [rentPerDay,setRent]=useState('');
const [rcImage,setRcimage]=useState([]);
const [carImages,setcarImages]=useState([]);
const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(rcImage);
    console.log(carImages);
    let formData= new FormData();
    formData.append('vendorId',vendorId)
    formData.append('model', model)
    formData.append('year', year)
    formData.append('mileage', mileage)
    formData.append('fuelType', fuelType)
    formData.append('transmissionMode', transmissionMode)
    formData.append('specifications', specifications)
    formData.append('rentPerDay', rentPerDay)
    rcImage.forEach((item)=>{
      formData.append('rcImage', item)
    })
    carImages.forEach((item)=>{
      formData.append('carImages', item)
    })
axios.post('/vendor/addcardetails',formData,{headers: {
  "Content-Type": "multipart/form-data",
}}).then((response)=>{
  if(!response.data.err){
    dispatch({type:'refresh'})
    console.log(response.data); 
    return navigate('/vendor/vendorhome')
  }else{
    setErr(response.data.message)
      toast.error(response.data.message, {
        position :"top-center"
      });
    }
  
})
}
const handleRcimage = (e) => {
  const selectedFiles = e.target.files;
setRcimage([...selectedFiles]);
};
const handleCarImages=(e)=>{
  const selectedImages=e.target.files;
  setcarImages([...selectedImages]);
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
       <h1>{err}</h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Car Registration</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
            {/* Car Make */}
            <div>
              <h1>{err}</h1>
              <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                Car Model
              </label>
              <div className="mt-1">
                <input
                  id="carModel"
                  name="carModel"
                  type="text"
                  value={model}
                  autoComplete="car-make"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={e=>setModel(e.target.value)}
                />
              </div>
            </div>
            {/* Car Year */}
            <div>
              <label htmlFor="carYear" className="block text-sm font-medium text-gray-700">
                Car Year
              </label>
              <div className="mt-1">
                <input
                  id="carYear"
                  name="carYear"
                  type="number"
                  autoComplete="car-year"
                  required
                  value={year}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={e=>setYear(e.target.value)}
                />
              </div>
            </div>
            {/* Car Mileage */}
            <div>
              <label htmlFor="carMileage" className="block text-sm font-medium text-gray-700">
                Car Mileage
              </label>
              <div className="mt-1">
                <input
                  id="carMileage"
                  name="carMileage"
                  type="number"
                  autoComplete="car-mileage"
                  required
                  value={mileage}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={e=>setMileage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
                Type of Fuel
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a value</option>
                <option value="petrol">Petrol</option>
                <option value="diesal">Diesal</option>
                <option value="electric">Electric</option>
              </select>
            </div>

            <div>
              <label htmlFor="transmissionMode" className="block text-sm font-medium text-gray-700">
                Transmission Mode
              </label>
              <select
                id="transmissionMode"
                name="transmissionMode"
                value={transmissionMode}
                onChange={(e) => setTransmissionMode(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a value</option>
                <option value="mannual">Mannual Transmissin</option>
                <option value="automatic">Automatic Transmissin</option>
              </select>
            </div>

            <div>
              <label htmlFor="specifications" className="block text-sm font-medium text-gray-700">
                Specifications
              </label>
              <select
                id="specifications"
                name="specifications"
                value={specifications}
                onChange={(e) => setSpecifications(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a value</option>
                <option value="basemodel">Base Model</option>
                <option value="semioption">Semi Option</option>
                <option value="fulloption">Full Option</option>
              </select>
            </div>

            {/* Rent Per Day */}
            <div>
              <label htmlFor="rentPerDay" className="block text-sm font-medium text-gray-700">
                Rent Per Day
              </label>
              <div className="mt-1">
                <input
                  id="rentPerDay"
                  name="rentPerDay"
                  type="number"
                  autoComplete="rent-per-day"
                  required
                  value={rentPerDay}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={e => setRent(parseFloat(e.target.value))}

                />
              </div>
            </div>
            {/* RC Image */}
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
                  onChange={handleRcimage}
                />
              </div>
            </div>
            {/* Images */}
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
                  onChange={handleCarImages}
                />
              </div>
            </div>

            {/* Submit Button */}
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

export default CarRegistrationPage;
