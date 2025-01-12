import React from "react";
import "../App.css"; // Import external CSS for styling

const ChatLoading = () => {
  return (
    <div className="stack">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="skeleton"></div>
      ))}
    </div>
  );
};

export default ChatLoading;
