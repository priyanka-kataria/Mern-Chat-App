import { useEffect, useState } from "react";
import Signin from "../components/Authentication/Signin";
import Signup from "../components/Authentication/Signup";
import {  useNavigate } from "react-router-dom";

function Home() {
  const [activeTab, setActiveTab] = useState("signin");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const navigation = useNavigate(); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    // if (user) navigation("/chat");
  }, [navigation]);

  return (
    // <div style={{ textAlign: "center", maxWidth: "600px", margin: "auto" }}>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       background: "white",
    //       padding: "20px",
    //       margin: "40px 0 15px 0",
    //       borderRadius: "8px",
    //       border: "1px solid #ccc",
    //     }}
    //   >
    //     <h1 style={{ fontSize: "2rem", fontFamily: "'Work Sans', sans-serif" }}>
    //       Talk-A-Tive
    //     </h1>
    //   </div>

    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       margin: "20px 0",
    //       borderBottom: "2px solid #ccc",
    //     }}
    //   >
    //     <button
    //       onClick={() => handleTabClick("signin")}
    //       style={{
    //         padding: "10px 20px",
    //         border: "none",
    //         background: activeTab === "signin" ? "#3182ce" : "#f5f5f5",
    //         color: activeTab === "signin" ? "white" : "#333",
    //         cursor: "pointer",
    //         fontWeight: activeTab === "signin" ? "bold" : "normal",
    //         borderBottom: activeTab === "signin" ? "3px solid #2b6cb0" : "none",
    //       }}
    //     >
    //       Sign In
    //     </button>
    //     <button
    //       onClick={() => handleTabClick("signup")}
    //       style={{
    //         padding: "10px 20px",
    //         border: "none",
    //         background: activeTab === "signup" ? "#3182ce" : "#f5f5f5",
    //         color: activeTab === "signup" ? "white" : "#333",
    //         cursor: "pointer",
    //         fontWeight: activeTab === "signup" ? "bold" : "normal",
    //         borderBottom: activeTab === "signup" ? "3px solid #2b6cb0" : "none",
    //       }}
    //     >
    //       Sign Up
    //     </button>
    //   </div>

    //   <div
    //     style={{
    //       // background: "#f9f9f9",
    //       padding: "20px",
    //       border: "1px solid #ccc",
    //       borderRadius: "8px",
    //     }}
    //   >
    //     {activeTab === "signin" ? <Signin /> : <Signup />}
    //   </div>
    // </div>
    <div
  style={{
    textAlign: "center",
    maxWidth: "90%",
    margin: "auto",
    padding: "10px",
    boxSizing: "border-box",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      background: "white",
      padding: "15px",
      margin: "20px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h1
      style={{
        fontSize: "1.8rem",
        fontFamily: "'Work Sans', sans-serif",
        margin: "0",
      }}
    >
      Talk-A-Tive
    </h1>
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      margin: "20px 0",
      borderBottom: "2px solid #ccc",
      paddingBottom: "5px",
    }}
  >
    <button
      onClick={() => handleTabClick("signin")}
      style={{
        flex: "1",
        padding: "10px 15px",
        border: "none",
        borderRadius: "4px",
        background: activeTab === "signin" ? "#3182ce" : "#f5f5f5",
        color: activeTab === "signin" ? "white" : "#333",
        cursor: "pointer",
        fontWeight: activeTab === "signin" ? "bold" : "normal",
        borderBottom: activeTab === "signin" ? "3px solid #2b6cb0" : "none",
      }}
    >
      Sign In
    </button>
    <button
      onClick={() => handleTabClick("signup")}
      style={{
        flex: "1",
        padding: "10px 15px",
        border: "none",
        borderRadius: "4px",
        background: activeTab === "signup" ? "#3182ce" : "#f5f5f5",
        color: activeTab === "signup" ? "white" : "#333",
        cursor: "pointer",
        fontWeight: activeTab === "signup" ? "bold" : "normal",
        borderBottom: activeTab === "signup" ? "3px solid #2b6cb0" : "none",
      }}
    >
      Sign Up
    </button>
  </div>

  <div
    style={{
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      background: "white",
    }}
  >
    {activeTab === "signin" ? <Signin /> : <Signup />}
  </div>
</div>

  );
}

export default Home;
