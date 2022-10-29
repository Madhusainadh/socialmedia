 const asyncHandler = require("express-async-handler");
const chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

 const sendMessage = asyncHandler(async(req,res)=>{

    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
      console.log("1",message)

      message = await message.populate("sender", "name pic")
      console.log("2",message)

      // message = await message.populate("chat.users")
      // console.log("3",message)

      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
  console.log(message)
      await chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }

 })

 module.exports={sendMessage}