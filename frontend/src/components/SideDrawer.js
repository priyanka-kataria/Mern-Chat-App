// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ChatLoading from "./ChatLoading";
// import UserListItem from "./UserListItem";
// import { ChatState } from "../context/ChatProvider";
import "../App.css";
// import PersonalChat from "../pages/PersonalChat";
// import ProfileModal from "./ProfileModel";
// import CreateGroup from "./ModalforCreatinggroup/CreateGroup";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Side/Header";
import ProfileModal from "./ProfileModel";
import ChatList from "./Side/ChatList";
import PersonalChat from "../pages/PersonalChat";
import Drawer from "./Side/Drawer";
import CreateGroup from "./ModalforCreatinggroup/CreateGroup";
import { ChatState } from "../context/ChatProvider";
import ChatLayout from "./Side/ChatLayout.js";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [createNewGroup, setCreateNewGroup] = useState(false);

  const { setSelectedChat, user, chats, setChats, selectedChat } = ChatState();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search.trim()) {
      alert("Please enter something in search");
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      alert("Error occurred while fetching search results");
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);

      console.log(data, "data");
      setLoadingChat(false);
    } catch (error) {
      console.log(error, "Error fetching the chat");
      alert("Error fetching the chat");
      setLoadingChat(false);
    }
  };

  const fetchChats = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/chat/fetch`, config);
      setChats(data);
    } catch (error) {
      alert("Error occurred while fetching chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div
      className="side-drawer"
      style={{
        // display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        // padding: '10px 20px',
        backgroundColor: "white",
        borderBottom: "5px solid #38B2AC",
        // flexDirection: 'column', // Always keep row layout
        gap: "10px", // Consistent gap for all screen sizes
        boxSizing: "border-box", // Ensure consistent sizing
      }}
    >
      <Header
        user={user}
        onSearchClick={() => setIsDrawerOpen(!isDrawerOpen)}
        onProfileClick={() => setIsProfileOpen(!isProfileOpen)}
        onLogout={handleLogout}
      />
      {isProfileOpen && <ProfileModal user={user} />}
      {/* <div className="chatList_PersonalChat">
        
        <ChatList
          chats={chats}
          user={user}
          onSelectChat={(chat) => setSelectedChat(chat)}
          selectedChat={selectedChat}
          setCreateNewGroup={setCreateNewGroup}
        />
        {selectedChat ? <PersonalChat chat={selectedChat} /> : <></>}
      </div> */}
      <div class="container4">
        <div class="box box1">
          <ChatList
            chats={chats}
            user={user}
            onSelectChat={(chat) => setSelectedChat(chat)}
            selectedChat={selectedChat}
            setCreateNewGroup={setCreateNewGroup}
          />
        </div>
        <div class="box box2">
          {selectedChat ? <PersonalChat chat={selectedChat} /> : <></>}
        </div>
      </div>
      {/* <ChatLayout /> */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
        searchResult={searchResult}
        loading={loading}
        loadingChat={loadingChat}
        accessChat={accessChat}
      />
      {createNewGroup && <CreateGroup setCreateNewGroup={setCreateNewGroup} />}
    </div>
  );
};

export default SideDrawer;
