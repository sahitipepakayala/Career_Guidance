import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useParams } from "react-router-dom";

const containerStyle = {
  maxWidth: "700px",
  margin: "40px auto",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const titleStyle = {
  fontSize: "2rem",
  color: "#2c3e50",
  marginBottom: "20px",
  fontWeight: "700",
  borderBottom: "2px solid #2980b9",
  paddingBottom: "10px",
};

const paragraphStyle = {
  fontSize: "1.1rem",
  color: "#444",
  lineHeight: "1.6",
  marginBottom: "18px",
};

const labelStyle = {
  fontWeight: "600",
  color: "#2980b9",
};

const buttonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  marginTop: "30px",
  backgroundColor: "#2980b9",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  boxShadow: "0 2px 6px rgba(41, 128, 185, 0.5)",
  transition: "background-color 0.3s ease",
};

const CareerDetail = () => {
  const { careerId } = useParams();
  const [career, setCareer] = useState({
    title: "",
    description: "",
    qualifications: "",
    job_outlook: "",
    pathways: "",
  });
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await api.get(`/careers/${careerId}/`);
        setCareer(response.data);
      } catch (error) {
        console.error("Unable to fetch career data", error);
      }
    };
    fetchCareer();

    const fetchUserRole = async () => {
      try {
        const response = await api.get("/auth/users/me/");
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Unable to fetch user role", error);
      }
    };
    fetchUserRole();
  }, [careerId]);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{career.title || "Career Detail"}</h2>

      <p style={paragraphStyle}>
        <span style={labelStyle}>Description: </span>
        {career.description || "No description available."}
      </p>

      <p style={paragraphStyle}>
        <span style={labelStyle}>Qualifications: </span>
        {career.qualifications || "Not specified."}
      </p>

      <p style={paragraphStyle}>
        <span style={labelStyle}>Job Outlook: </span>
        {career.job_outlook || "Not specified."}
      </p>

      <p style={paragraphStyle}>
        <span style={labelStyle}>Pathways: </span>
        {career.pathways || "Not specified."}
      </p>

      {userRole === "admin" && (
        <Link
          to={`/careers/edit/${careerId}`}
          style={buttonStyle}
          onMouseEnter={e => (e.target.style.backgroundColor = "#1f6391")}
          onMouseLeave={e => (e.target.style.backgroundColor = "#2980b9")}
        >
          Update Career
        </Link>
      )}
    </div>
  );
};

export default CareerDetail;
