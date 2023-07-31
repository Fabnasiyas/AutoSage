import React,  { useEffect, useState } from 'react'
import axios from '../../axios';


const ChatBox = ({chat,currentVendor}) => {
    const [vendorData,setVendorData]=useState(null)
   useEffect(()=>{
    const vendorId=chat?.members?.find((id)=>id!==currentVendor)
    const getVendorData=async()=>{
        try {
          const {data}=await axios.get(`/vendor/vendor/${vendorId}`);
          console.log(data,'datatata');
          setVendorData(data) 
        } catch (error) {
          console.log(error);
        }
        
   };
   if(chat!==null){
    getVendorData();
   }
},[currentVendor])
   
   
    return (
    <>
    <div className="ChatBox-container">

    </div>
    </>
  )
}

export default ChatBox
