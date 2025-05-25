// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; 2025 Career Compass |{" "}
        <a href="/about" style={styles.link}>About Us</a> |{" "}
        <a href="/contact" style={styles.link}>Contact</a> |{" "}
        <a href="/privacy" style={styles.link}>Privacy Policy</a>
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    textAlign: "center",
    padding: "15px 10px",
    position: "relative",
    bottom: 0,
    width: "100%",
  },
  text: {
    margin: 0,
    fontSize: "14px",
  },
  link: {
    color: "#4caf50",
    textDecoration: "none",
    margin: "0 5px",
  },
};

export default Footer;
