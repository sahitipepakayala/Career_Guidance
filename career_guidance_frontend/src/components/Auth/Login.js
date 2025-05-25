import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}auth/jwt/create`, {
        username,
        password,
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      navigate("/dashboard");
      alert("Login Successful");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMsg = "";

        if (typeof errorData === "object" && !Array.isArray(errorData)) {
          for (const key in errorData) {
            if (errorData.hasOwnProperty(key)) {
              if (Array.isArray(errorData[key])) {
                errorMsg += `${errorData[key].join(" ")} `;
              } else {
                errorMsg += `${errorData[key]} `;
              }
            }
          }
        } else {
          errorMsg = errorData.detail || "An error occurred during login";
        }
        setError(errorMsg.trim() || "An error occurred during login");
      } else {
        setError("An error occurred during login");
      }
      console.log("Login Failed", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left side image */}
      <div style={styles.imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
          alt="Login Illustration"
          style={styles.image}
        />
      </div>

      {/* Right side form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    maxWidth: "900px",
    margin: "40px auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  form: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    marginBottom: "24px",
    fontSize: "28px",
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: "16px",
  },
  input: {
    marginBottom: "20px",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "12px 16px",
    fontSize: "16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Login;
