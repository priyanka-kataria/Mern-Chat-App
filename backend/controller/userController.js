const asyncHandler = require("express-async-handler");
const ChatUser = require("../models/UserModel");
const generatetoken = require("../Dbconnect/generateToken");
const bcrypt = require("bcryptjs");

module.exports.registerUser = asyncHandler(async (req, res) => { 
  const { name, email, password} = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const userExist = await ChatUser.findOne({
    email,
  });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await ChatUser.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generatetoken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
 }
);

module.exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ( !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const user = await ChatUser.findOne({ email });
  let matchpassword=false;
    const userpassword = await user.password;
    if (user.password===userpassword){
      matchpassword=true;
    };
  
    if (user && matchpassword) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generatetoken(user._id),
      });
    } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }}
);

module.exports.AllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search?{
    $or: [
      {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ],
  }:{};
  console.log(keyword);
  
  const users = await ChatUser.find(keyword).find({_id:{$ne:req.user._id}});
  res.json(users);

});