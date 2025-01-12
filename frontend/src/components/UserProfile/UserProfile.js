import React from "react";
import "./UserProfile.css" // Add styles as required
import { ChatState } from "../../context/ChatProvider";

export default function UserProfile({ UnloggedUser, onBack }) {
  const { user } = ChatState();
     
  const newuser=  UnloggedUser.find((u) => u._id !== user?._id)
  console.log(newuser,"newuser")
 
  return (
    <div className="user-profile">
      {/* <button onClick={onBack} className="back-btn">
      <i class="fa-solid fa-arrow-left"></i> Back
      </button> */}
      <div className="profile-header">
        <img src={newuser.pic} alt={newuser.name} className="profile-image" />
        <h2>{newuser.name}</h2>
      </div>
      <div className="profile-details">
        <p><strong>Email:</strong> {newuser.email}</p>
        <p><strong>Phone:</strong> {newuser.phone}</p>
        {/* Add more user details here */}
      </div>
    </div>
  );
}
