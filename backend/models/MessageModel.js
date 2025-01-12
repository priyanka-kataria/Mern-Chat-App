const mongoose = require("mongoose");
const MessageModel = mongoose.Schema(
  {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatUser",
    },
    content: {
      type: String,
      trim:true,
    },
    chat: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ]
  },
  {
    Timestamps: true,
  }
);
const Message= mongoose.model("Message",MessageModel);
module.exports=Message
  