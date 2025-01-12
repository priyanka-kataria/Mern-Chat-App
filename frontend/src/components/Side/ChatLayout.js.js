import React, { useState, useEffect } from "react";
import PersonalChat from "../../pages/PersonalChat";
import ChatList from "./ChatList";
import "./layout.css";
import { ChatState } from "../../context/ChatProvider";

const ChatLayout = ({ chats, user }) => {
  
    const { selectedChat } = ChatState();
 

  return (
    <div class="container4">
      <div class="box box1">
        <p>This is Box 1 content.</p>
      </div>
      <div class="box box2">
        <PersonalChat chat={selectedChat}  />
      </div>
    </div>
  );
};

export default ChatLayout;
