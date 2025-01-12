import React, { useState } from "react";
import "./CreateGroup.css";
import UserListItem from "../UserListItem";
import ChatLoading from "../ChatLoading";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import { Navigate, useNavigate } from "react-router-dom";

const CreateGroup = ({setCreateNewGroup}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [chatname, setChatName] = useState(""); // Group chat name
  const [searchTerm, setSearchTerm] = useState(""); // Search input for users
  const [selectedUsers, setSelectedUsers] = useState([]); // Selected users
  const [searchResults, setSearchResults] = useState([]); // User search results
  const { setSelectedChat, user, chats, setChats, selectedChat } = ChatState();
  const [loading, setLoading] = useState(false);
  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  console.log(selectedUsers,"slectedUsers")
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setChatName("");
    setSearchTerm("");
    setSelectedUsers([]);
  };

  // Handle search input
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (!setSearchTerm) {
      alert("Please enter something in search");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user?search=${searchTerm}`,
        config
      );
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      alert("Error occurred while fetching search results");
      setLoading(false);
    }
  };

  const navigation = useNavigate();

  // Add user to the selected list
  const addToGroup = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  function getUnloggedInUserId(data, loggedInUserId) {
    return data.users[0]._id === loggedInUserId
      ? data.users[1]._id
      : data.users[0]._id;
  }

  // Remove user from the selected list
  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u !== user));
  };

  // Create group chat
  const handleCreateGroup = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (!chatname || selectedUsers.length === 0) {
      alert("Please provide a chat name and add at least one user.");
      return;
    }
    const groupData = {
      chatname,
      users: selectedUsers,
    };

    const { data } = await axios.post(
      `/api/chat/group`,
      {
        chatname,
        users: JSON.stringify(selectedUsers),
      },
      config
    );
    setChats([data, ...chats])
    
    console.log("Group created:", groupData);
  };

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Create Group Chat</h2>
          <input
            type="text"
            placeholder="Enter group chat name"
            value={chatname}
            onChange={(e) => setChatName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Search for users"
            value={searchTerm}
            onChange={handleSearch}
            className="input-field"
          />
          <div className="search-results">
            {loading ? (
              <ChatLoading />
            ) : (
              searchResults.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => addToGroup(user._id)}
                />
              ))
            )}
          </div>
          <div className="selected-users">
            {selectedUsers.map((user) => (
              <div key={user.id} className="selected-item">
                {user.name}{" "}
                <span onClick={() => removeUser(user)} className="remove-user">
                  &times;
                </span>
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button onClick={handleCreateGroup} className="create-button">
              Create
            </button>
            <button className="cancel-button" onClick={() => setCreateNewGroup(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
