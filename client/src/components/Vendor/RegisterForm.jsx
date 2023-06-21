import React, { useState } from 'react'
import axios from '../../axios'
import {  useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
const RegisterForm = () => {
    axios.defaults.withCredentials = true;
const navigate = useNavigate();
const dispatch=useDispatch();


const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword,setConfirmPassword]=useState('')
const [phoneNumber,setPhoneNumber]=useState('')
// const [err, setErr] = useState(null)
const handleSubmit=(e)=>{
  e.preventDefault();
  if(name.trim()&& phoneNumber.trim()&& email.trim()&&password.trim()){
    axios.post('/vendor/signup',{name,email,phoneNumber,password,confirmPassword}).then((response)=>{
        console.log("*******************************",response.data);
    if(!response.data.err){ 
      dispatch({type:'refresh'})
      console.log(response.data);
      const data={
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        password:password
      }

     return navigate('/vendor/otp',{state:{data}})
    }else{
     
      // setErr(response.data.message)
      toast.error(response.data.message, {
        position :"top-center"
      });
    }
    })
  }else{
    // setErr("All fields are required")
    
    toast.error('All Fields are Required', {
      position :"top-center"
      
    });
  }
}
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Vendor Registeration
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={e=>setName(e.target.value)}
                />
              </div>
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
                  value={email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={e=>setEmail(e.target.value)}
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
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={e => setPhoneNumber(e.target.value)}
    />
  </div>
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
                  value={password}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={e=>setPassword(e.target.value)}
               />
              </div>
            </div>
            <div>
              <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  required
                  value={confirmPassword}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={e=>setConfirmPassword(e.target.value)}
                />
              </div>
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