import React from "react";
import { useAuth } from "./AuthContext";

const Header: React.FC = () => {
  const { user, refreshUser } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    refreshUser();
  };

  return (
    <header
      style={{
        backgroundImage: "url('https://i.pinimg.com/originals/34/1f/44/341f44eb161b89c92b084750f7005234.jpg')", // Replace with your flag image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderBottom: "3px solid #C8102E",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "1.8rem",
            fontWeight: "bold",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          Welcome to Tunisian Election App
        </h1>
        {!user && (
          <p style={{ fontSize: "1rem", opacity: 1 }}>
            Please log in to explore candidates and vote.
          </p>
        )}
      </div>
      {user ? (
        <div
          style={{
            textAlign: "right",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              marginRight: "1rem",
            }}
          >
            Hello, {user.email}
          </span>
          <button
            onClick={logout}
            style={{
              backgroundColor: "#DC3545",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#A10D2B")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#DC3545")
            }
          >
            Logout
          </button>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
