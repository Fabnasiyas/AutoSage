

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from '../../axios';

// const AddDocumentPage = () => {
//   axios.defaults.withCredentials = true;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user.details);
//   const userId = user._id;


//   const [drivingLicense, setDrivingLicense] = useState([]);
//   const [aadharCard, setAadharCard] = useState([]);

//   const handleDrivingLicenseChange = (e) => {
//     const img = e.target.files;
//     setDrivingLicense([...img]);
//   };

//   const handleAadharCardChange = (e) => {
//     const img = e.target.files;
//     setAadharCard([...img]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     if (drivingLicense) {
//       drivingLicense.forEach((item) => {
//         formData.append('drivingLicense', item);
//       });
//     }
//     if (aadharCard) {
//       aadharCard.forEach((item) => {
//         formData.append('aadharCard', item);
//       });
//     }

//     formData.append('userId', userId);
//     console.log(formData,'******************');

//     try {
//       const response = await axios.post('/uploadDocuments', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (!response.data.err) {
//         dispatch({ type: 'refresh' });
//         console.log(response.data);
//         return navigate('/userprofile');
//       }
//     } catch (error) {
//       if (error.response) {
//         const errorMessage = error.response.data.message;
//         toast.error(errorMessage, {
//           position: 'top-center',
//         });
//       } else {
//         toast.error('An error occurred. Please try again later.', {
//           position: 'top-center',
//         });
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add Documents</h2>
//       </div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="drivingLicense" className="text-gray-700 font-medium">
//                 Driving License:
//               </label>
//               <input
//                 type="file"
//                 id="drivingLicense"
//                 name='drivingLicense'
//                 accept="image/*"
//                 multiple
//                 required
//                 onChange={handleDrivingLicenseChange}
//                 className="mt-1"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="aadharCard" className="text-gray-700 font-medium">
//                 Aadhaar Card:
//               </label>
//               <input
//                 type="file"
//                 id="aadharCard"
//                 name='aadharCard'
//                 accept="image/*"
//                 multiple
//                 required
//                 onChange={handleAadharCardChange}
//                 className="mt-1"
//               />
//             </div>
//             <div className="flex justify-center">
//               <button


//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Upload
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDocumentPage;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../axios';

const AddDocumentPage = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.details);
  const userId = user._id;


  const [drivingLicense, setDrivingLicense] = useState([]);
  const [aadharCard, setAadharCard] = useState([]);

  const handleDrivingLicenseChange = (e) => {
    const img = e.target.files;
    setDrivingLicense([...img]);
  };

  const handleAadharCardChange = (e) => {
    const img = e.target.files;
    setAadharCard([...img]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (drivingLicense) {
      drivingLicense.forEach((item) => {
        formData.append('drivingLicense', item);
      });
    }
    if (aadharCard) {
      aadharCard.forEach((item) => {
        formData.append('aadharCard', item);
      });
    }

    formData.append('userId', userId);
    console.log(formData, '******************');

    try {
      const response = await axios.post('/uploadDocuments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.data.err) {
        dispatch({ type: 'refresh' });
        console.log(response.data);
        return navigate(-1);

      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, {
          position: 'top-center',
        });
      } else {
        toast.error('An error occurred. Please try again later.', {
          position: 'top-center',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add Documents</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="drivingLicense" className="text-gray-700 font-medium">
                Driving License:
              </label>
              <input
                type="file"
                id="drivingLicense"
                name='drivingLicense'
                accept="image/*"
                multiple
                required
                onChange={handleDrivingLicenseChange}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="aadharCard" className="text-gray-700 font-medium">
                Aadhaar Card:
              </label>
              <input
                type="file"
                id="aadharCard"
                name='aadharCard'
                accept="image/*"
                multiple
                required
                onChange={handleAadharCardChange}
                className="mt-1"
              />
            </div>
            <div className="flex justify-center">
              <button


                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentPage;
