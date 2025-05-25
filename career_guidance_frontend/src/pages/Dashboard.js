import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "24px",
  borderRadius: "16px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
  fontSize: "33px",
  marginBottom: "20px",
  color: "#333",
  textAlign: "center",
};

const infoItemStyle = {
  fontSize: "20px",
  marginBottom: "12px",
  color: "#444",
};

const labelStyle = {
  fontWeight: "600",
  marginRight: "8px",
};

const linkStyle = {
  display: "inline-block",
  marginTop: "24px",
  padding: "12px 20px",
  backgroundColor: "#0077ff",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
  transition: "background-color 0.3s ease",
};

const linkHoverStyle = {
  backgroundColor: "#005bbb",
};

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/users/me/");
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div style={{ textAlign: "center", marginTop: "40px" }}>Loading...</div>;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Welcome to Your Dashboard</h2>

      <p style={infoItemStyle}>
        <span style={labelStyle}>Username:</span> {profile.username}
      </p>
      <p style={infoItemStyle}>
        <span style={labelStyle}>Email:</span> {profile.email}
      </p>
      <p style={infoItemStyle}>
        <span style={labelStyle}>Role:</span> {profile.role}
      </p>
      <p style={infoItemStyle}>
        <span style={labelStyle}>First Name:</span> {profile.first_name}
      </p>
      <p style={infoItemStyle}>
        <span style={labelStyle}>Last Name:</span> {profile.last_name}
      </p>
      <p style={infoItemStyle}>
        <span style={labelStyle}>Career Interests:</span>{" "}
        {profile.career_interests ? profile.career_interests : "None"}
      </p>

      <Link
        to="/update-profile"
        style={hovered ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Update Profile
      </Link>
    </div>
  );
}

export default Dashboard;
