import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  // const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents form from reloading the page
    setLoading(true);

    if (!email || !password) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      console.log("Login Successful", data);
      navigation("/chat");
      // alert("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Sign In</h2>
      <form onSubmit={submitHandler}>
        {/* Email Input */}
        <div style={{ position: "relative", margin: "10px 0" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: "white",
              color: "black",
              outline: "none",
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ position: "relative", margin: "10px 0" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: "white",
              color: "black",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: loading ? "#ccc" : "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}