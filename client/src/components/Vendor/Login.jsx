// import { React, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../../axios';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import img from '../../assets/car3.webp';
// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (email.trim() && password.trim()) {
  //     try {
  //       const response = await axios.post('/vendor/login', { email, password });
  //       console.log(response.data);
  //       if (!response.data.err) {
  //         dispatch({ type: 'refresh' });
  //         return navigate('/vendor/vendorhome');
  //       } else {
  //         if (response.data.message === 'Vendor banned.') {
  //           document.cookie = 'vendorToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  //         }
  //         toast.error(response.data.message, {
  //           position: "top-center"
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     toast.error('All Fields are required', {
  //       position: "top-center"
  //     });
  //   }
  // };

//   return (
   
//     <div
//     className="min-h-screen flex flex-col items-center justify-center"
//     style={{
//       background: `url(${img})`,
//       backgroundSize: '100% auto',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//     }}
//   >
     
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10 loginbox">
          
//           <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit} >
//             {/* Email input */}
//             <div className="sm:mx-auto sm:w-full sm:max-w-md pb-8">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Vendor Login
//         </h2>
//       </div>
//             <div>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   placeholder='Email address'
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             {/* Password input */}
//             <div>
              
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   placeholder='Password'
//                   value={password}
//                   onChange={(e) => setpassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             {/* Sign in button */}
//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//           {/* Register link */}
//           <div className="mt-4 text-center">
//             <span className="text-sm text-gray-200">
//               Don't have an account?{' '}
//               <Link to="/vendor/register" className="text-indigo-600 hover:text-indigo-500">
//                 Register
//               </Link>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import img from '../../assets/car3.webp';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      try {
        const response = await axios.post('/vendor/login', { email, password });
        console.log(response.data);
        if (!response.data.err) {
          dispatch({ type: 'refresh' });
          return navigate('/vendor/vendorhome');
        } else {
          if (response.data.message === 'Vendor banned.') {
            document.cookie = 'vendorToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          }
          toast.error(response.data.message, {
            position: "top-center"
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('All Fields are required', {
        position: "top-center"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img})` }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10 loginbox">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md pb-8">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Vendor Login</h2>
            </div>
            <div className="mt-4">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-200">
              Don't have an account?{' '}
              <Link to="/vendor/register" className="text-indigo-600 hover:text-indigo-500">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
