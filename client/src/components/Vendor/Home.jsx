import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FaCar, FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'

const Home = () => {
  const menus = [
    { name: " Dashboard", link: "/vendor/vendorhome", icon: MdOutlineDashboard, },
    { name: " Profile", link: "/vendor/vendorprofile", icon: AiOutlineUser },
    { name: " Bookings", link: "/vendor/bookings", icon: TbReportAnalytics },
    { name: " My Cars", link: "/vendor/carlist", icon: FaCar },
    { name: " Add Car", link: "/vendor/addcar", icon: FaPlus },
  ];
  const [open, setOpen] = useState(true);
  const { vendor } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('/vendor/logout').then((response) => {
      if (!response.data.err) {
        console.log(response.data);
        dispatch({ type: 'refresh' });
        return navigate('/vendor');
      }
    });
  }

  return (
    <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`} style={{ backgroundColor: 'black' }}>
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-7 relative">
        {menus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i}
            className={`group flex items-center text-sm font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ml-5 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
            >
              {menu.name}
            </h2>
            <h2
              className={`${open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {menu.name}
            </h2>
          </Link>
        ))}
        <button className="text-gray-300 hover:bg-gray-700 hover:text-white  rounded-md text-sm font-semibold" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;



