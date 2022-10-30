const express = require("express");
const { chats } = require("./data/data");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("../backend/routes/chatRoutes");
const messageRoutes = require("../backend/routes/messageRoutes");
const app = express();
app.use(cors());
connectDB();
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { Socket } = require("socket.io");
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Listening at Port ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room:" + room);
  });

  socket.on("typing",(room)=>socket.in(room).emit("typing"))
  socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) {
        return;
      }
      socket.in(user._id).emit("message recievied", newMessageRecieved);
    });
  });

  socket.off("setup",()=>{
    console.log("User disconnected");
    socket.leave(userData._id)
  })


});
