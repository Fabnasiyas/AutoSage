import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import {  FiFolder} from "react-icons/fi";

import { Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'



const Home = () => {
  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard , margin: true },
    { name: "Profile", link: "/vendor/vendorprofile", icon: AiOutlineUser },
    { name: "Bookings", link: "/vendor/bookings", icon: TbReportAnalytics},
    { name: "My Cars", link: "/vendor/carlist", icon: FiFolder },

    { name: "Logout", link: "/vendor/logout", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);

  const {vendor} = useSelector(state => state); 
  console.log("*******************",vendor);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  // const {users} =useSelector((state)=>{
  //   return state
  // })
  const handleLogout=()=>{
    axios.get('/vendor/logout').then((response)=>{
      if(!response.data.err){
        console.log(response.data);
        dispatch({type:'refresh'})
        return navigate('/vendor')
      }
    })
  }

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`} style={{backgroundColor:'black'}}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
<button className="text-gray-300 hover:bg-gray-700 hover:text-white  py-2 rounded-md text-sm font-semibold"  onClick={handleLogout}>
      Logout
    </button>
        </div>
      </div>
      <div className="m-3 text-4xl text-gray-900 font-semibold flex justify-between">
        <h1>AutoSage</h1>
      
      </div>
    </section>
  );
};

export default Home;