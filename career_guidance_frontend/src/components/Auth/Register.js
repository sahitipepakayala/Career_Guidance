import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}auth/users/`, {
        username,
        email,
        password,
        re_password,
      });
      navigate("/login");
      alert("Registration successful");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMsg = "";
        for (const key in errorData) {
          if (errorData.hasOwnProperty(key)) {
            errorMsg += `${errorData[key].join(" ")} `;
          }
        }
        setError(errorMsg.trim() || "An error occurred during registration");
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Side - Image */}
      <div style={styles.leftSide}>
        <img
          src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=600&q=80"
          alt="Registration"
          style={styles.image}
        />
      </div>

      {/* Right Side - Form */}
      <div style={styles.rightSide}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Register</h2>
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
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            value={re_password}
            placeholder="Confirm Password"
            onChange={(e) => setRePassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f9fafb",
  },
  leftSide: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  margin: "10px",
  },
  rightSide: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    marginBottom: "24px",
    fontSize: "2rem",
    color: "#1a202c",
    fontWeight: "700",
  },
  error: {
    color: "red",
    marginBottom: "16px",
  },
  input: {
    marginBottom: "16px",
    padding: "12px 16px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "12px 16px",
    fontSize: "1.1rem",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Register;
