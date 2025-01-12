// import React, { useState, useRef, useEffect } from "react";
import { useEffect, useRef, useState } from "react";
import "./personal.css";
import UserProfile from "../components/UserProfile/UserProfile";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import io from "socket.io-client";
import { Navigate } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";
let socket, selectChatCompare;

export default function PersonalChat({ chat }) {
  const [viewingProfile, setViewingProfile] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const { user, selectedChat } = ChatState();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 720);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch messages for the selected chat
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);

      socket.emit("join chat", selectedChat._id);
      console.log("Messages fetched successfully", data);
    } catch (error) {
      console.error("Error fetching messages", error);
      alert("Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  // Initialize socket connection
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, [user]);

  // Fetch messages when selectedChat changes
  useEffect(() => {
    fetchMessages();
    selectChatCompare = selectedChat;
  }, [selectedChat]);

  // Listen for new messages
  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (!selectChatCompare || selectChatCompare._id !== newMessage.chatId) {
        // Handle notifications if needed
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
  }, []);

  // Send a message
  const sendMessage = async () => {
    const messageText = messageInputRef.current.value;

    if (!messageText.trim()) return;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/message",
        { content: messageText, chatId: chat._id },
        config
      );

      socket.emit("new message", data);
      messageInputRef.current.value = "";
      fetchMessages();
    } catch (error) {
      console.error("Error sending message", error);
      alert("Error sending message");
    }
  };

  // Handle Enter key press for sending messages
  const handleKeyPress = (event) => {
    if (event.key === "Enter") sendMessage();
  };

  // Close profile modal
  const closeModal = () => {
    setViewingProfile(null);
  };

  // View user or group details
  const viewDetails = () => {
    if (chat.isGroupChat) {
      const groupUsers = chat.users.map((user, index) => ({
        ...user,
        id: index,
      }));
      setViewingProfile({ type: "group", data: groupUsers });
    } else {
      setViewingProfile({ type: "user", data: chat });
    }
  };
  const handleBack = () => {
    // Use React Router or window.history to navigate back
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Navigate to a default route if there's no history
      Navigate("/");
    }
  };
  return (
    <div className="chat-section">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          {/* add a back button when width is 720 wh */}
          {isSmallScreen && (
            <button className="back-button" onClick={handleBack}>
              ← Back
            </button>
          )}
          <img
            src={
              chat.isGroupChat
                ? chat.groupImage
                : chat.users.find((u) => u._id !== user?._id)?.pic
            }
            alt="Chat Avatar"
            className="chat-avatar"
          />
          <span className="chat-name">
            {chat.isGroupChat
              ? chat.chatname
              : chat.users.find((u) => u._id !== user?._id)?.name}
          </span>
        </div>
        <button className="view-details-btn" onClick={viewDetails}>
          👁️
        </button>
      </div>

      {/* Messages Container */}
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.length > 0 ? (
          <ul className="messages-list">
            {messages.map((message, index) => {
              const isSent = message.sender._id === user._id;
              const isSameSenderAsPrevious =
                index > 0 &&
                message.sender._id === messages[index - 1].sender._id;
              const isSameSenderAsNext =
                index < messages.length - 1 &&
                message.sender._id === messages[index + 1].sender._id;

              return (
                <li
                  key={message._id}
                  className={`message-item ${isSent ? "sent" : "received"}`}
                  style={{
                    marginTop: isSameSenderAsPrevious ? "3px" : "10px",
                    marginBottom: isSameSenderAsNext ? "3px" : "10px",
                    alignSelf: isSent ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    className="message-content"
                    style={{
                      backgroundColor: isSent ? "#BEE3F8" : "#B9F5D0",
                      borderRadius: "20px",
                      padding: "10px",
                      maxWidth: "100%",
                    }}
                  >
                    <p style={{ margin: 0 }}>{message.content}</p>
                    <span
                      className="message-time"
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        display: "block",
                        marginTop: "5px",
                        textAlign: isSent ? "right" : "left",
                      }}
                    >
                      {new Date(message.chat[0].createdAt).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No messages found for this chat.</p>
        )}
      </div>

      {/* Input Section */}
      <div className="chat-input">
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Enter a message..."
          className="message-input"
          onKeyDown={handleKeyPress}
        />
        <input ref={fileInputRef} type="file" className="file-input" />
        <button onClick={sendMessage} className="sendButton">
          Send
        </button>
      </div>

      {/* Profile Modal */}
      {viewingProfile && (
        <div className="modal-overlay2">
          <div className="modal-content2">
            <button className="close-modal" onClick={closeModal}>
              ✖️
            </button>
            {viewingProfile.type === "user" && (
              <UserProfile
                UnloggedUser={viewingProfile.data.users}
                onBack={closeModal}
              />
            )}
            {viewingProfile.type === "group" && (
              <div className="group-users">
                <p>Group Members</p>
                <ul>
                  {viewingProfile.data.map((user) => (
                    <li
                      key={user.id}
                      onClick={() =>
                        setViewingProfile({ type: "user", data: user })
                      }
                      className="group-user"
                    >
                      <img
                        src={user.pic}
                        alt={user.name}
                        className="group-user-avatar"
                      />
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
