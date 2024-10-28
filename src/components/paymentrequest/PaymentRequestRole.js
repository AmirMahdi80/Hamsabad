// src/components/transactions/InvestRoleComponent.js
import React, { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import PortfolioManagerPaymentRequest from "./PortfolioManagerPaymentRequest";
import InvestorPaymentRequest from "./InvestorPaymentRequest";

const PaymentRequestRole = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
    login,
    logout,
    baskets,
    setBaskets,
    handleUpdateBasket,
    phoneNumber,
    setPhoneNumber,
    nationalId,
    setNationalId,
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
  } = useContext(AppContext);
  const renderComponentBasedOnRole = () => {
    switch (role) {
      case "investor":
        return <InvestorPaymentRequest />;
      case "portfolioManager":
        return <PortfolioManagerPaymentRequest />;
      default:
        return <p>نقش کاربر نامعتبر است</p>;
    }
  };

  return <div className="">{renderComponentBasedOnRole()}</div>;
};

export default PaymentRequestRole;
