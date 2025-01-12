// const http =require("http")
const express = require("express");
// const path=require('path')
// const {Server} =require('socket.io');
const { Chats } = require("./data/Chats.js");
const connectDB = require("./Dbconnect/Db.js");
const UserRoutes = require("./Routes/UserRoutes.js");
const messageRoutes = require("./Routes/messageRoutes.js");
const chatRoutes = require("./Routes/chatRoutes.js");
const { notFound, errorHandler } = require("./middleware/error.js");

const app = express();

app.use(express.json());
connectDB();
// const server=http.createServer(app)
// const io= new Server(server)
//  app.use(express.static(path.resolve('./public')))
//  io.on('connection', (socket) => {
//     socket.on("user-message", (message) => {
//       io.emit("message", message)
//       });

//   });

app.get("/", (req, res) => {
  res.send("api is running properly");
  // return res.send('/public/index.js')
  // return res.send()
});

app.use("/api/user", UserRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//  app.get('/api/chat', (req,res)=>{
//   return res.send(Chats)
// })

app.get("/api/chat/:id", (req, res) => {
  const singlechat = Chats.find((c) => c._id === req.params.id);
  console.log(req);
  console.log(singlechat);
  return res.send(singlechat);
});

app.use(notFound);
app.use(errorHandler);

const server = app.listen(5000, () => {
  console.log("server starting at port 5000");
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("setup", (userdata) => {
    socket.join(userdata._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("joined room", room);
  });

  socket.on("new message", (message) => {
    var chat = message.chat;
    if (!chat.users) {
      return console.log("chat.users not found");
    }
    chat.users.forEach((user) => {
      if (user._id === message.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", message);
    });
  });
});
