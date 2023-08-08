import './Chat.css'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Conversation from '../../components/Chat/Conversation';
import axios from '../../axios';
import ChatBox from '../../components/Chat/chatBox';
import { io } from 'socket.io-client'
const socket = io.connect("ws://localhost:5000")

const Chat = () => {
  const { user } = useSelector((state) => state);
  const userId = user.details._id;
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    socket.emit("new-user-add", user._id)
    socket.on('get-users', (users) => {
      console.log(users)
      setOnlineUsers(users)
      console.log(onlineUsers);
    })
  }, [user])
  console.log(currentChat, 'sdsdss');
  // Get the chat in chat section
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

// Send Message to socket server
useEffect(() => {
  if (sendMessage !== null) {
    socket.current.emit("send-message", sendMessage);
  }
}, [sendMessage]);

// Get the message from socket server
useEffect(() => {
  socket.current.on("recieve-message", (data) => {
    setReceivedMessage(data);
  });
}, []);

const checkOnlineStatus = (chat) => {
  const chatMember = chat.members.find((member) => member !== user._id);
  const online = onlineUsers.find((user) => user.userId === chatMember);
  return online ? true : false;
};

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
                <Conversation data={chat} currentUserId={user.details._id}  online={checkOnlineStatus(chat)} />
              </div>
            ))}

          </div>
        </div>
      </div>
      {/* right side */}
      <div className="Right-side-chat">
        <ChatBox chat={currentChat} currentUser={user.details._id} setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            setReceiver={setReceiver} />
      </div>
    </div>
  )
}

export default Chat
