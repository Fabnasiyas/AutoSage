import './Chat.css'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Conversation from '../../components/Chat/Conversation';
const Chat = () => {
  const { user } = useSelector((state) => state);
  console.log(user.details,'000000000');

  const [chats,setChats]=useState([])
  return (
    <div className="Chat">
        {/* left side */}
        <div className="Left-side-chat">
        <div className="Chat-container">

            <h2>Chats</h2>
            <div className="Chat-list">
            {chats.map((chat)=>{
                <div>
                  <Conversation data={chat} currentUser={user._id}/>
                </div>
              })}
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
