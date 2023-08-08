import './Chat.css'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Conversation from '../../components/Chat/Conversation';
import axios from '../../axios';
import ChatBox from '../../components/Chat/chatBox';
import { io } from 'socket.io-client'

const Chat = () => {
  const { user } = useSelector((state) => state);
  const userId = user.details._id;
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)
  const socket = useRef()
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    socket.current = io('http://localhost:3000')
    socket.current.emit("new-user-add", user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
      console.log(onlineUsers);
    })
  }, [user])
  console.log(currentChat, 'sdsdss');

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(`/chat/${userId}`);
        setChats(data)
        console.log(data, 'dataaa');
      } catch (error) {
        console.log(error);
      }
    }
    getChats()
  }, [user])
  return (
    <div className="Chat">
      {/* left side */}
      <div className="Left-side-chat">
        <div className="Chat-container">

          <h2>Chats</h2>
          <div className="Chat-list"
          >
            {chats.map((chat, i) => (
              <div key={chat.id} onClick={() =>
                setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user.details._id} />
              </div>
            ))}

          </div>
        </div>
      </div>
      {/* right side */}
      <div className="Right-side-chat">
        <ChatBox chat={currentChat} currentUser={user.details._id} />
      </div>
    </div>
  )
}

export default Chat
