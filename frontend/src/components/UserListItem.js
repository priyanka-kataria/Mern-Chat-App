import React from "react";
import "../App.css"; // Import external CSS for styling

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className="user-list-item" onClick={handleFunction}>
      <div className="avatar-container">
        <img
          className="avatar"
          src={user.pic}
          alt={user.name}
        />
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="email">
          <b>Email: </b>{user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
