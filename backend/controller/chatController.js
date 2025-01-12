const asyncHandler = require("express-async-handler");
const Chat = require("../models/ChatModel");
const ChatUser = require("../models/UserModel");
const { Mongoose } = require("mongoose");

module.exports.accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400);
    throw new Error("UserId param not sent with request");
  }
  
  var isChat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user._id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await ChatUser.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat) {
    res.status(200).send(isChat);
  }
  if (!isChat) {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userId, req.user._id],
    };

    console.log(chatData);

    try {
      const creatChat = await Chat.create(chatData);
      const FullChat = await Chat.findById(creatChat._id).populate(
        "users",
        "-password"
      );
      // .populate("lastestMessage");
      res.status(201).send(FullChat);
    } catch (error) {
      res.status(500);
      console.log("Failed to create chat", error);
      throw new Error("Failed to create chat", error);
    }
  }
});

module.exports.fetchChat = asyncHandler(async (req, res) => {
  try {
    const chat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    res.send(chat);
    // console.log(chat, "all chats of a perticular user");
  } catch (error) {
    console.log("error in fetching chat", error);
    res.status(500);
  }
});

module.exports.createGroupChat = asyncHandler(async (req, res) => {
  const { chatname, users } = req.body;

  if (!chatname || !users) {
    res.status(400);
    throw new Error("Chatname or users not sent with request");
  }
  var allusers = JSON.parse(users);
  const groupAdmin = req.user._id;

  if (allusers.length < 2) {
    res.status(400);
    throw new Error("Please add atleast 2 users in group");
  }

  allusers.push(req.user._id);

  try {
    const groupchatData = await Chat.create({
      chatname,
      isGroupChat: true,
      users: allusers,
      groupAdmin,
    });

    const FullGroupChat = await Chat.findById(groupchatData._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");

    res.status(201).send(FullGroupChat);
  } catch (error) {
    res.status(500);
    console.log("Failed to create chat", error);
    throw new Error("Failed to create chat", error);
  }
});
module.exports.renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatname } = req.body;

  if (!chatId || !chatname) {
    res.status(400);
    throw new Error("ChatId or chatname not sent with request");
  }

  try {
    const groupChat = await Chat.findById(chatId);

    if ((groupChat.groupAdmin = req.user._id)) {
      groupChat.chatname = chatname;
      await groupChat.save();
      res.status(200).send(groupChat);
      console.log("Group chat renamed successfully");

    } else {
      res.status(401);
      throw new Error("You are not authorized to rename this group");
    }
  } catch (error) {
    res.status(500);
    console.log("Failed to rename chat", error);
    throw new Error("Failed to rename chat", error);
  }
});

module.exports.removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId} = req.body;

  if (!chatId || !userId) {
    res.status(400);
    throw new Error("ChatId  not sent with request");
  }

  try {
    const groupChat = await Chat.findById(chatId);

    if ((groupChat.groupAdmin = req.user._id)) {
      groupChat.users.pull(userId);
      await groupChat.save();
      res.status(200).send(groupChat);
      console.log("User removed from group successfully");
    } else {
      res.status(401);
      throw new Error("You are not authorized to remove user from this group");
    }
  } catch (error) {
    res.status(500);
    console.log("Failed to remove user from group", error);
    throw new Error("Failed to remove user from group", error);
  }
});

module.exports.addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.status(400);
    throw new Error("ChatId  not sent with request");
  }

  try {
    const groupChat = await Chat.findById(chatId);

    if ((groupChat.groupAdmin = req.user._id)) {
      groupChat.users.push(userId);
      await groupChat.save();
      res.status(200).send(groupChat);
      console.log("User added to group successfully");
    } else {
      res.status(401);
      throw new Error("You are not authorized to add user to this group");
    }
  } catch (error) {
    res.status(500);
    console.log("Failed to add user to group", error);
    throw new Error("Failed to add user to group", error);
  }
});