import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  width: "93%",
  padding: "12px 16px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1.5px solid #ccc",
  fontSize: "16px",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const inputFocusStyle = {
  borderColor: "#0077ff",
  boxShadow: "0 0 5px rgba(0, 119, 255, 0.5)",
};

const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "#0077ff",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const buttonHoverStyle = {
  backgroundColor: "#005bbb",
};

const formContainerStyle = {
  maxWidth: "420px",
  margin: "40px auto",
  padding: "24px",
  border: "1px solid #ddd",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  backgroundColor: "#fefefe",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "28px",
  color: "#222",
  fontWeight: "600",
};

const Profile = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    career_interests: "",
  });
  const [focused, setFocused] = useState({}); // To track focused inputs for styling
  const [btnHover, setBtnHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/users/me/");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    setFocused({ ...focused, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/auth/users/me/", userData);
      alert("Profile Updated Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error updating profile");
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headingStyle}>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={userData.first_name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            ...inputStyle,
            ...(focused.first_name ? inputFocusStyle : {}),
          }}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={userData.last_name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            ...inputStyle,
            ...(focused.last_name ? inputFocusStyle : {}),
          }}
          required
        />
        <textarea
          name="career_interests"
          placeholder="Career Interests"
          value={userData.career_interests}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            ...inputStyle,
            height: "100px",
            resize: "vertical",
            ...(focused.career_interests ? inputFocusStyle : {}),
          }}
        />
        <button
          type="submit"
          style={btnHover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
