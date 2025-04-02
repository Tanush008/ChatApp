// import { log } from "console";
import { Conversation } from "../models/conversationModels.js";
import { Message } from "../models/messageModels.js";
import { getRecievedSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    console.log(receiverId);
    console.log(senderId);

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let newConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!newConversation) {
      newConversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    newConversation.messages.push(newMessage._id);
    await newConversation.save();
    const recieverSocketId = getRecievedSocketId(receiverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("getMessage", newMessage);
    }
    res.status(200).json({ success: true, newMessage });
  } catch (error) {
    console.log(error);
  }
};
export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    // console.log(receiverId);
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    console.log(error);
  }
};
