const mongoose = require("mongoose");
const bcrypt= require("bcryptjs")
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
    },
    email: {
        type: String,
        required:true,
    },
    password: [
      {
        type: String,
        required:true,
      },
    ],
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
  },
  {
    Timestamps: true,
  }
);


const ChatUser= mongoose.model("ChatUser",userSchema);
module.exports=ChatUser;
