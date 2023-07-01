// import React from 'react';
// import  { useState } from 'react'
// import axios from '../../axios'
// import {  useNavigate } from 'react-router-dom'
// import { useDispatch} from 'react-redux';
// import { toast } from 'react-toastify';
// const EditProfile = () => {

//     axios.defaults.withCredentials = true;
// const navigate = useNavigate();
// const dispatch=useDispatch();
// const [name, setName] = useState('')
// const [phoneNumber,setPhoneNumber]=useState('')
//  const handleSubmit=(e)=>{
//       e.preventDefault();
//       if(name.trim()&& phoneNumber.trim()){
//             axios.post('/vendor/editprofile',{name,phoneNumber}).then((response)=>{
//         console.log("*******************************",response.data);
//     if(!response.data.err){ 
//       dispatch({type:'refresh'})
//       console.log(response.data);
     

//      return navigate('/vendor/otp',{state:{data}})
//     }
//       })
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//           <div className="sm:mx-auto sm:w-full sm:max-w-md">
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//               Edit Profile
//             </h2>
//           </div>
//           <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//             <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//               <form className="space-y-6" >
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                     Name
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       required
//                       value={name}
//                       onChange={e=>setName(e.target.value)}
//                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
                  
//                     <p className="mt-2 text-sm text-red-500"></p>
                  
//                 </div>
                
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                     Phone number
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       id="phone"
//                       name="phoneNumber"
//                       type="text"
//                       required
//                      onChange={e => setPhoneNumber(e.target.value)}
//                         value={phoneNumber}
//                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
             
//                     <p className="mt-2 text-sm text-red-500"></p>
                  
//                 </div>
                
                
//                 <div>
//                   <button
//                     type="submit"
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       );
//    };
//       export default EditProfile;


import React, { useState } from 'react';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const EditProfile = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {vendor}=useSelector(state=>state)
  const vendorId=vendor.details._id;
  const [name, setName] = useState(vendor.details.name);
  const [phoneNumber, setPhoneNumber] = useState(vendor.details.phoneNumber);
  const [pincode,setPincode]= useState(vendor.details.pincode)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && phoneNumber.trim()) {
      axios
        .post("/vendor/editprofile", { name,vendorId, phoneNumber,pincode })
        .then((response) => {
          if (!response.data.err) {
            dispatch({ type: 'refresh' });
            console.log(response.data);

            navigate('/vendor/vendorhome', { state: { data: response.data } });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit Profile</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
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
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <div className="mt-1">
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
