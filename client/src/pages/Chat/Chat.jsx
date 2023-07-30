import './Chat.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Conversation from '../../components/Chat/Conversation';
import axios from '../../axios';

const Chat = () => {
  const { vendor } = useSelector((state) => state);
  console.log(vendor.details,'000000000');
const vendorId=vendor.details._id;
  const [chats,setChats]=useState([])
  useEffect(()=>{
    const getChats=async ()=>{
      try {
        const {data}=await axios.get(`/chat/${vendorId}`);
        setChats(data)
        console.log(data,'dataaa');
      } catch (error) {
        console.log(error);
      }
    }
    getChats()
  },[vendor])
  return (
    <div className="Chat">
        {/* left side */}
        <div className="Left-side-chat">
        <div className="Chat-container">

            <h2>Chats</h2>
            <div className="Chat-list">
            {chats.map((chat) => (
  <div key={chat.id}>
    <Conversation data={chat} currentVendorId={vendor.details._id}/>
  </div>
))}

          </div>
            </div>
        </div>
    {/* right side */}
    <div className="Right-side-chat">
<h2>rightside</h2>
    </div>
    </div>
  )
}

export default Chat
