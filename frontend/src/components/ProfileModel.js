// import React, { useState } from "react";

// const ProfileModal = ({ user, children }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   const openModal = () => setIsVisible(true);
//   const closeModal = () => setIsVisible(false);

//   // Inline styles
//   const modalOverlayStyle = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   };

//   const modalContentStyle = {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "8px",
//     width: "80%",
//     maxWidth: "500px",
//     position: "relative",
//   };

//   const modalHeaderStyle = {
//     fontSize: "24px",
//     fontFamily: "'Work sans', sans-serif",
//     textAlign: "center",
//     marginBottom: "10px",
//   };

//   const closeButtonStyle = {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     background: "none",
//     border: "none",
//     fontSize: "24px",
//     cursor: "pointer",
//   };

//   const modalBodyStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   };

//   const profileImageStyle = {
//     borderRadius: "50%",
//     width: "150px",
//     height: "150px",
//     objectFit: "cover",
//     marginBottom: "15px",
//   };

//   const emailTextStyle = {
//     fontSize: "18px",
//     fontFamily: "'Work sans', sans-serif",
//     textAlign: "center",
//   };

//   return (
//     <>
//       {isVisible && (
//         <div style={modalOverlayStyle} onClick={closeModal}>
//           <div
//             style={modalContentStyle}
//             onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing modal
//           >
//             <h2 style={modalHeaderStyle}>{user.name}</h2>
//             <button style={closeButtonStyle} onClick={closeModal}>
//               &times;
//             </button>
//             <div style={modalBodyStyle}>
//               <img
//                 style={profileImageStyle}
//                 src={user.pic}
//                 alt={user.name}
//               />
//               <p style={emailTextStyle}>Email: {user.email}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileModal;
import React, { useState } from "react";

const ProfileModal = ({ user }) => {
  const [isVisible, setIsVisible] = useState(true);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  // Inline styles with responsiveness and absolute positioning
  const modalOverlayStyle = {
    position: "absolute", // Changed to absolute
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px", // Adds space for smaller devices
  };

  const modalContentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "90%", // Adjusts for smaller screens
    maxWidth: "400px", // Sets a limit for larger screens
    position: "absolute", // Ensure content stays within overlay
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Centers the modal
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)", // Adds a shadow effect
  };

  const modalHeaderStyle = {
    fontSize: "20px", // Smaller font for responsiveness
    fontFamily: "'Work sans', sans-serif",
    textAlign: "center",
    marginBottom: "10px",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px", // Reduced size for better scaling
    cursor: "pointer",
  };

  const modalBodyStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const profileImageStyle = {
    borderRadius: "50%",
    width: "120px", // Smaller image for mobile devices
    height: "120px",
    objectFit: "cover",
    marginBottom: "15px",
  };

  const emailTextStyle = {
    fontSize: "16px", // Slightly smaller font
    fontFamily: "'Work sans', sans-serif",
    textAlign: "center",
    wordWrap: "break-word", // Prevents text overflow
  };

  return (
    <>
      {isVisible && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing modal
          >
            <h2 style={modalHeaderStyle}>{user.name}</h2>
            <button style={closeButtonStyle} onClick={closeModal}>
              &times;
            </button>
            <div style={modalBodyStyle}>
              <img
                style={profileImageStyle}
                src={user.pic}
                alt={user.name}
              />
              <p style={emailTextStyle}>Email: {user.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;

