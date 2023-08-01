import React,  { useEffect, useState } from 'react'
import axios from '../../axios';
import profilepic from '../../assets/avatar.png'
import {format} from "timeago.js"
import InputEmoji from 'react-input-emoji';

const ChatBox = ({chat,currentUser}) => {
    const [vendorData,setVendorData]=useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewmessage]=useState('')

   useEffect(()=>{
    console.log(chat,'kkkkkkkkk');
    const vendorId=chat?.members?.find((id)=>id!==currentUser)
    console.log(chat,'chats');
    console.log(vendorId,'vendorid');
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
},[currentUser])
   console.log(messages,'1234567890');
useEffect(()=>{
  const fetchMsgs=async()=>{
    try {
      const {data}=await axios.get(`/message/${chat._id}`)
      console.log(data,'messagesssss');
      setMessages(data)
    } catch (error) {
      console.log(error);
    }
  }
  if(chat !==null){ 
    fetchMsgs()
  }
},[chat])
   const handleChange=(newMessage)=>{
    setNewmessage(newMessage)
   }
   const handlesend=async(e)=>{
    e.preventDefault();
    const message={
      senderId:currentUser,
      text:newMessage,
      chatId:chat._id,
    }
    console.log(message);
    // if(newMessage.length>0){

    // }

    try {
      const {data}=await axios.post(`/message/`,message)
      console.log(data,'6666666');
      setMessages(...messages,data)
      setNewmessage('')
    } catch (error) {
      console.log(error);
    }
   }
    return (
    <>
    <div className="ChatBox-container">
      {chat ? (
            <>
            <div className='chat-header's>
              <div className='follower'>
                <div>
                  <div className='online-dot'></div>
                  <img src={profilepic} alt=""  className='followerImage' style={{width:'50px',height:'50px'}}/>
                  <div className='name' style={{fontSize:'0.8rem'}}>
                    <span>{vendorData ?.name}</span>
                  </div>
                </div>
      
              </div>
                    <hr />
      
            </div>
           <div className="chat-body">
             {messages.map((message)=>{
        <>
        <div className={message.vendorId ===currentUser?'message own' :'message'}>
      <span>
        {message.text}
        <span>{format(message.createdAt)}</span>
      </span>
        </div>
        </>
             })}
           </div>
      <div className="chat-sender">
        <div>+</div>
        <InputEmoji value={newMessage}
        onChange={handleChange}/> 
        <div className="send-button button" onClick={handlesend}>Send</div>
      </div>
            </>
      ):(
        <span className='chatbox-empty-message'>
          Tap on a Chat to Start Conversation...
        </span>
      )}
  

    </div>
    </>
  )
}

export default ChatBox
