import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState(null);
  
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const {user} = useSelector(state => state); 
  console.log("*******************",user);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  // const {users} =useSelector((state)=>{
  //   return state
  // })
  const handleLogout=()=>{
    axios.get('/logout').then((response)=>{
      if(!response.data.err){
        console.log(response.data);
        dispatch({type:'refresh'})
        return navigate('/')
      }
    })
  }
  return (
    
    <nav className="bg-blue-900  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-lg">AutoSage</span>
            </div>
          </div>

          <div className="hidden md:block">
           
            <div>
              
             
              
               {user.login ? (
              
              <>
  <div className="inline-flex">
    <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
      <Link to='/userprofile'> {user.details.name}
      </Link> {/* Display the name from the user state */}
    </p>
    {/* <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login</button> */}
    {/* <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>
      Logout
    </button> */}
        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleLogout}>Logout</button>


  </div>
</>

                  
                 
                ) : (
                  // <Link to={'/login'}>
                  //   <p className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
                  //     Login
                  //   </p>
                  // </Link>
                  <>
                  <Link to={'/login'}>
                  <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 " >  Login  </button>
                  </Link>
                  <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >  Register  </button>

                  </>
                )}
              
            </div>
          
            </div>
            
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    className="fill-current text-white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                  />
                ) : (
                  <path
                    className="fill-current text-white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            
            
          </div>
        )}
      
    </nav>
  );
};

export default Navbar;