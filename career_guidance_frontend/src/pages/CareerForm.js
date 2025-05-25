import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom"; // 1. Import useNavigate


const formStyle = {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#fdfdfd",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
};

const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "15px",
    color: "#333",
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
};

const textareaStyle = {
    ...inputStyle,
    height: "100px",
    resize: "vertical",
};

const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
};

const buttonHoverStyle = {
    backgroundColor: "#0056b3",
};

const CareerForm = () => {
    const { careerId } = useParams();
    const navigate = useNavigate();
    const [careerData, setCareerData] = useState({
        title: "",
        description: "",
        qualifications: "",
        job_outlook: "",
        pathways: "",
    });
    const [userRole, setUserRole] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await api.get("/auth/users/me/");
                setUserRole(response.data.role);
            } catch (error) {
                console.error("Failed to fetch user role", error);
            }
        };

        fetchUserRole();

        if (careerId) {
            api.get(`/careers/${careerId}/`)
                .then((response) => {
                    setCareerData(response.data);
                })
                .catch((error) => {
                    console.error("Failed to fetch career data", error);
                });
        }
    }, [careerId]);

    const handleChange = (e) => {
        setCareerData({
            ...careerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = careerId ? "patch" : "post";
        const url = careerId ? `/careers/${careerId}/` : "/careers/";

        try {
            await api[method](url, careerData);
            alert("Career saved successfully");
            navigate("/careers"); // 3. Navigate after success
        } catch (error) {
            console.error("Failed to save career", error);
        }
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#222" }}>
                {careerId ? "Edit Career" : "Add a New Career"}
            </h2>

            <div>
                <label style={labelStyle}>Title</label>
                <input
                    type="text"
                    name="title"
                    value={careerData.title}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>

            <div>
                <label style={labelStyle}>Description</label>
                <textarea
                    name="description"
                    value={careerData.description}
                    onChange={handleChange}
                    required
                    style={textareaStyle}
                />
            </div>

            <div>
                <label style={labelStyle}>Qualifications</label>
                <textarea
                    name="qualifications"
                    value={careerData.qualifications}
                    onChange={handleChange}
                    required
                    style={textareaStyle}
                />
            </div>

            <div>
                <label style={labelStyle}>Job Outlook</label>
                <textarea
                    name="job_outlook"
                    value={careerData.job_outlook}
                    onChange={handleChange}
                    required
                    style={textareaStyle}
                />
            </div>

            <div>
                <label style={labelStyle}>Pathways</label>
                <textarea
                    name="pathways"
                    value={careerData.pathways}
                    onChange={handleChange}
                    required
                    style={textareaStyle}
                />
            </div>

            <button
                type="submit"
                style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Save Career
            </button>
        </form>
    );
};

export default CareerForm;
