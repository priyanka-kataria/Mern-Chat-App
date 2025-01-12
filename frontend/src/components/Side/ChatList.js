import React from "react";
import "./chatlist.css"
import { ChatState } from "../../context/ChatProvider";

const ChatList = ({
  chats,
  user,
  onSelectChat,
  selectedChat,
  setCreateNewGroup,
}) => {
  const handleChatSelection = (chat) => {
    onSelectChat(chat);
  };

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <p className="chat-list-title">My Chats</p>
        <button
          className="chat-list-new-group-btn"
          onClick={() => setCreateNewGroup(true)}
        >
          New Group Chat +
        </button>
      </div>
      <div className="chat-list-content">
        {!chats ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading chats...</p>
          </div>
        ) : (
          chats.map((chat) => {
            const loggedInUserId = user?._id;

            const isSelected = chat.isGroupChat
              ? selectedChat?._id === chat._id
              : selectedChat?.users?.find((u) => u._id !== loggedInUserId)
                  ?._id ===
                chat.users.find((u) => u._id !== loggedInUserId)?._id;

            return (
              <div
                key={chat._id}
                className={`chat-item ${
                  isSelected ? "chat-item-selected" : ""
                }`}
                onClick={() => handleChatSelection(chat)}
              >
                <img
                  src={
                    chat.isGroupChat
                      ? "/path-to-group-icon.png"
                      : chat.users.find((u) => u._id !== user?._id)?.pic ||
                        "/path-to-default-avatar.png"
                  }
                  alt={chat.isGroupChat ? chat.chatname : "User Avatar"}
                />
                <div className="chat-item-details">
                  <h3>
                    {chat.isGroupChat
                      ? chat.chatname
                      : chat.users.find((u) => u._id !== user?._id)?.name ||
                        "Unknown User"}
                  </h3>
                  <p>
                    {chat.latestMessage ? (
                      <span>
                        <b>{chat.latestMessage.sender.name}:</b>{" "}
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </span>
                    ) : (
                      "No messages yet"
                    )}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;
