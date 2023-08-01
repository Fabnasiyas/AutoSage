import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from '../../axios';
import profilepic from '../../assets/avatar.png'
const Conversation = ({data,currentUserId}) => {
  const [vendorData,setVendorData]=useState(null)
  useEffect(()=>{
    console.log(data,'ppppppppppppp');
    const vendorId=data.members.find((id)=>id!==currentUserId)
    console.log(vendorId,'werty');
    
      
         axios.get(`/vendor/vendor/${vendorId}`).then((response)=>{

           console.log(response,'wwwwwwwwwwwwww');
           setVendorData(response.data)
         }).catch((err)=>{
          console.log(err);
         })
     
      
    }
   
,[data,currentUserId])
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
