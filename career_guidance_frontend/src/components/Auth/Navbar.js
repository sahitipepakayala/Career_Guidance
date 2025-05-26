import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Left: Brand */}
        <h1 style={styles.brand}>
          <Link to="/" style={styles.link1}>Career Compass</Link>
        </h1>

        {/* Right: Navigation Links */}
        <nav style={styles.nav}>
          <Link to="/register" style={styles.link}>Register</Link>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/careers" style={styles.link}>Career List</Link>
          <Link to="/careers/new" style={styles.link}>Add Career</Link>
        </nav>
      </div>
    </header>
  );
};
const styles = {
  header: {
    backgroundColor: "#2563eb", // blue-600
    color: "white",
    padding: "16px 24px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontSize: "32px", // increased from 24px to 32px
    fontWeight: "bold",
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "24px",
  },
  link1: {
    color: "white",
    textDecoration: "none",
    fontSize: "28px", // added font size for nav links, larger than default
  }, link: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px", // added font size for nav links, larger than default
  },
};

export default Navbar;
