import express from 'express';
const app = express()
import { Server } from 'socket.io'
const port = process.env.PORT || 5000;
import userRoute from './routes/userRoute.js'
import vendorRoute from './routes/vendorRoute.js'
import adminRoute from './routes/adminRoute.js'
import chatRoute from './routes/chatRoute.js'
import MessageRoute from './routes/msgRoutes.js'
import dbConnect from './config/connectDb.js'
dbConnect();
import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
import http from "http"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000"], credentials: true, }));
app.use(cookieParser());
app.use(express.static(path.resolve() + "/public"))


// *****************Socket io****************
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"]
  },
});

let activeUsers = []
io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    // send all active users to new user
    console.log("connected User", activeUsers);
    io.emit("get-users", activeUsers);
  });
  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // send all active users to all users
    console.log("user Disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
})
// *******************************************

app.use('/vendor', vendorRoute)
app.use('/admin', adminRoute)
app.use('/', userRoute)
app.use('/chat', chatRoute);
app.use('/message', MessageRoute)
server.listen(port, () => {
  console.log(`Node Js Server Started at Port ${port}`);
})