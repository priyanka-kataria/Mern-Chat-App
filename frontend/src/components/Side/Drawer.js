import React, { useState } from "react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserListItem";

const Drawer = ({
  isOpen,
  onClose,
  search,
  onSearchChange,
  onSearch,
  searchResult,
  loading,
  loadingChat,
  accessChat,
}) => {
  if (!isOpen) return null;

  return (
    <div style={drawerStyles.overlay}>
      <div style={drawerStyles.content}>
        <div style={drawerStyles.header}>
          <h5>Search Users</h5>
          <button onClick={onClose} style={drawerStyles.closeButton}>
            Close
          </button>
        </div>
        <div style={drawerStyles.body}>
          <div style={drawerStyles.searchBox}>
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={onSearchChange}
              style={drawerStyles.searchInput}
            />
            <button onClick={onSearch} style={drawerStyles.goButton}>
              Go
            </button>
          </div>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <div style={drawerStyles.loading}>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

const drawerStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    width: "100%",
    maxWidth: "400px",
    height: "100%",
    padding: "20px",
    boxSizing: "border-box",
    transition: "transform 0.3s ease",
    transform: "translateX(0)",
    zIndex: 10000,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  body: {
    marginTop: "10px",
    overflowY: "auto",
  },
  searchBox: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "2px solid #ccc",
    fontSize: "16px",
    // backgroundColor:"white",
    color:"white"
  },
  goButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    marginTop: "20px",
  },
};

// Responsive styling via media queries
const mediaQueries = {
  "@media (max-width: 768px)": {
    content: {
      width: "100%",
    },
  },
  "@media (max-width: 480px)": {
    content: {
      width: "100%",
      padding: "10px",
    },
    searchBox: {
      flexDirection: "column",
    },
    searchInput: {
      width: "100%",
    },
    goButton: {
      width: "100%",
      marginTop: "10px",
    },
  },
};

export default Drawer;
