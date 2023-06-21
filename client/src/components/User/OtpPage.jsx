// // // // import React from 'react';

// // // // const OtpPage = () => {
// // // //   return (
// // // //     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
// // // //       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
// // // //         <h2 className="text-2xl font-bold text-center mb-6">Enter OTP</h2>
// // // //         <div className="flex gap-2 mb-6">
// // // //           <input
// // // //             type="text"
// // // //             className="w-1/5 p-2 text-center border border-gray-300 rounded"
// // // //             maxLength={1}
// // // //           />
// // // //           <input
// // // //             type="text"
// // // //             className="w-1/5 p-2 text-center border border-gray-300 rounded"
// // // //             maxLength={1}
// // // //           />
// // // //           <input
// // // //             type="text"
// // // // //             className="w-1/5 p-2 text-center border border-gray-300 rounded"
// // // // //             maxLength={1}
// // // // //           />import React from 'react';
// // // // //           <input
// // // // //             type="text"
// // // // //             className="w-1/5 p-2 text-center border border-gray-300 rounded"
// // // // //             maxLength={1}
// // // // //           />
// // // // //         </div>
// // // // //         <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
// // // // //           Verify
// // // // //         </button>
// // // // //         <div className="flex justify-center mb-4">
// // // // //           <button className="text-blue-500 hover:underline">Resend OTP</button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default OtpPage;

// // import React, { useState, useEffect } from 'react';
// // import OTPInput from 'otp-input-react';
// // import axios from '../../axios';
// // import { useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // // import ResetPassword from '../ResetPassword/ResetPassword';

// // function OtpPage(props) {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [OTP, setOTP] = useState('');
// //   const [timer, setTimer] = useState(60);
// //   const [resendAttempts, setResendAttempts] = useState(0);
// //   // const [showReset, setshowReset] = useState(false)

// //   useEffect(() => {
// //     let intervalId;

// //     if (timer > 0) {
// //       intervalId = setInterval(() => {
// //         setTimer((prevTimer) => prevTimer - 1);
// //       }, 1000);
// //     }

// //     return () => {
// //       clearInterval(intervalId);
// //     };
// //   }, [timer]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log(props.data.reset);
// //     // if (props.data.reset==='forgotpassword') {
// //     //   axios.post('/user/verifyResetOtp', { OTP }).then((response) => {
// //     //     if (!response.data.err) {
// //     //       setshowReset(true)
// //     //     } else {
// //     //       console.log(response.data.message);
// //     //     }
// //     //   });
// //     // } else
// //      if(props.data.reset==='signup') {
// //       axios.post('/verifySignup', { OTP, ...props.data }).then((response) => {
// //         if (!response.data.err) {
// //           dispatch({ type: 'refresh' });
// //           navigate('/');
// //         } else {
// //           console.log(response.data.message);
// //         }
// //       });
// //     }
// //   };

// //   const handleResendOTP = () => {
// //     if (resendAttempts < 3) {
// //       setResendAttempts((prevAttempts) => prevAttempts + 1);
// //       setTimer(60);
// //       axios.post('/resendOtp', { ...props.data }).then((response) => {
// //         console.log(response.data);
// //       });
// //     }
// //   };

// //   return (
// //     // !showReset ?
// //     <div>
// //       <div className="gray-background">
// //         <div className="signup">
// //           <div className="signup-connect-otp"></div>
// //           <div className="signup-classic">
// //             <form className="form" onSubmit={handleSubmit}>
// //               <p className="paraStyle">Please enter the OTP.</p>
// //               <OTPInput
// //                 value={OTP}
// //                 onChange={setOTP}
// //                 autoFocus
// //                 OTPLength={5}
// //                 otpType="number"
// //                 disabled={false}
// //                 secure
// //                 className="textfield"
// //               />
// //               <button
// //                 type="submit"
// //                 style={{
// //                   color: 'white',
// //                   height: '53px',
// //                   paddingTop: '8px',
// //                   marginTop: '33px',
// //                 }}
// //                 className="btn"
// //               >
// //                 Continue
// //               </button>
// //               {timer === 0 && resendAttempts < 3 && (
// //                 <button
// //                   type="submit"
// //                   className="resend-btn"
// //                   style={{ color: 'white' }}
// //                   onClick={handleResendOTP}
// //                 >
// //                   Resend OTP
// //                 </button>
// //               )}
// //               {timer > 0 && (
// //                 <p className="timer timer-style">Resend OTP in {timer} s</p>
// //               )}
// //               {resendAttempts >= 3 && (
// //                 <p className="error-msg">Maximum resend attempts reached</p>
// //               )}
// //             </form>
// //           </div>
// //         </div>
// //       </div>
     
// //     </div>
   
// // //    :<ResetPassword data={{...props.data}}/>

// //   );
// // }

// // export default OtpPage;
// import React from 'react';
// import OTPInput from 'otp-input-react';

// const OtpPage = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="otp"
//           >
//             Enter OTP:
//           </label>
//           <OTPInput
//             className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             onChange={(otp) => console.log(otp)}
//             autoFocus
//             OTPLength={6}
//             otpType="number"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default OtpPage;
import React, { useState, useEffect } from 'react';
import OTPInput from 'otp-input-react';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';



function OtpPage() {
  const location = useLocation();
  const data = location.state.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendAttempts, setResendAttempts] = useState(0);
  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(OTP);
    axios.post('/verifySignup', { OTP, ...data }).then((response) => {
      if (!response.data.err) {
        dispatch({ type: 'refresh' });
        console.log(response.data.message);
        toast.error(response.data.message, {
          position :"top-center"
        });
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    });
  };

  const handleResendOTP = () => {
    
    if (resendAttempts < 3) {
      setResendAttempts((prevAttempts) => prevAttempts + 1);
      setTimer(60);
      axios.post('/resendOtp',{...data}).then((response) => {
        console.log(response.data);
        toast.error(response.data, {
          position :"top-center"
        });
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded p-8">
        <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
          <p className="mb-4 text-center">Please enter the OTP.</p>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
            secure
            className="w-full border rounded py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue
          </button>
          {timer === 0 && resendAttempts < 3 && (
            <button
              type="submit"
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm focus:outline-none"
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          )}
          {timer > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Resend OTP in {timer} s
            </p>
          )}
          {resendAttempts >= 3 && (
            <p className="text-red-500 text-sm mt-2">
              Maximum resend attempts reached
            </p>
          )}
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default OtpPage;

// import React, { useState, useEffect } from 'react';
// import OTPInput from 'otp-input-react';
// import axios from '../../axios';
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';

// function OtpPage() {
//   const location=useLocation()
//   const data=location.state.data
//   console.log(location)
//   console.log("--------------",data)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [OTP, setOTP] = useState('');
//   const [timer, setTimer] = useState(60);
//   const [resendAttempts, setResendAttempts] = useState(0);

//   useEffect(() => {
//     let intervalId;

//     if (timer > 0) {
//       intervalId = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [timer]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(OTP)
//     axios.post('/verifySignup', { OTP,...data }).then((response) => {
//       if (!response.data.err) {
//         dispatch({ type: 'refresh' });
//         navigate('/');
//       } else {
//         console.log(response.data.message);
//       }
//     });
//   };

//   const handleResendOTP = () => {
//     if (resendAttempts < 3) {
//       setResendAttempts((prevAttempts) => prevAttempts + 1);
//       setTimer(60);
//       axios.post('/resendOtp').then((response) => {
//         console.log(response.data);
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-200">
//       <div className="bg-white shadow-md rounded p-8">
//         <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
//           <p className="mb-4 text-center">Please enter the OTP.</p>
//           <OTPInput
//             value={OTP}
//             onChange={setOTP}
//             autoFocus
//             OTPLength={6}
//             otpType="number"
//             disabled={false}
//             secure
//             className="w-full border rounded py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Continue
//           </button>
//           {timer === 0 && resendAttempts < 3 && (
//             <button
//               type="submit"
//               className="mt-2 text-blue-500 hover:text-blue-700 text-sm focus:outline-none"
//               onClick={handleResendOTP}
//             >
//               Resend OTP
//             </button>
//           )}
//           {timer > 0 && (
//             <p className="text-sm text-gray-500 mt-2">
//               Resend OTP in {timer} s
//             </p>
//           )}
//           {resendAttempts >= 3 && (
//             <p className="text-red-500 text-sm mt-2">
//               Maximum resend attempts reached
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default OtpPage;
