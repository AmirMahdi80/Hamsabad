import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");

  // Example of a reset password function
  const resetPassword = async (email) => {
    try {
      // Placeholder for actual reset logic
      console.log("Password reset email sent to:", email);
    } catch (error) {
      setResetPasswordError("Failed to reset password.");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
