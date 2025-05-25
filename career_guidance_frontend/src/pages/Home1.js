import React from "react";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Left Side - Phone Image */}
      <div style={styles.leftSide}>
        <img
          src="https://i0.wp.com/cde.news/wp-content/uploads/2023/05/pexels-photo-15940011.jpeg?resize=500,600&ssl=1"
          alt="Phone displaying ChatGPT"
          style={styles.image}
        />
      </div>

      {/* Right Side - Logo and Text stacked vertically */}
      <div style={styles.rightSide}>
        <img
          src="https://www.shutterstock.com/image-vector/emblem-rgukt-universities-260nw-2129839289.jpg"
          alt="Career Compass Logo"
          style={styles.logo}
        />
        <h1 style={styles.heading}>
          Empower Students with <br /> Career Compass
        </h1>
        <p style={styles.paragraph}>
          Join us in shaping the future of career guidance
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "white",
  },
  leftSide: {
    flex: 1,
    margin:10,
  },
  rightSide: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0 48px",
    margin:10
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius:10,
  },
  logo: {
    width: 84,
    height: 84,
    marginBottom: 32,
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1a202c", // dark gray
    marginBottom: 16,
    lineHeight: 1.2,
  },
  paragraph: {
    fontSize: "1.125rem",
    color: "#718096", // gray
    maxWidth: 400,
  },
};
