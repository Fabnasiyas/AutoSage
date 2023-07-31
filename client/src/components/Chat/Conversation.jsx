import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from '../../axios';
import profilepic from '../../assets/avatar.png'
const Conversation = ({data,currentVendorId}) => {
  const [vendorData,setVendorData]=useState(null)
  useEffect(()=>{
    const vendorId=data.members.find((id)=>id!==currentVendorId)
    console.log(vendorId,'werty');
    const getVendorData=async()=>{
      try {
        const {data}=await axios.get(`/vendor/vendor/${vendorId}`);
        console.log(data,'11111111111');
        setVendorData(data) 
      } catch (error) {
        console.log(error);
      }
      
    }
    getVendorData()
  },[])
  return (
    <>
    <div className="follower conversation">
      <div>
        <div className="online-dot"></div>
        <img src={profilepic} alt="" className='followerImage' style={{width:'50px',height:'50px'}} />
      <div className="name" style={{fontSize:'0.8rem'}}>
        <span>{vendorData ?.name}</span>
        <span>Online</span>
      </div>
      </div>
    </div>
<hr />
    </>

  )
}

export default Conversation
