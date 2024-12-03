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
        backgroundColor: "#f8f9fa",
        padding: "1rem",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {user ? (
        <>
          <span style={{ marginRight: "10px", fontWeight: "bold" }}>
            Welcome, {user.email}
          </span>
          <button
            onClick={logout}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <h2 style={{ margin: "0", fontWeight: "normal" }}>
          Welcome to Tunisian Election, Please Log in
        </h2>
      )}
    </header>
  );
};

export default Header;
