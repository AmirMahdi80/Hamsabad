import React, { useContext } from "react";
import PortfolioManagerCashRequest from "./PortfolioManagerCashRequest";
import InvestorCashRequest from "./InvestorCashRequest";
import AppContext from "../../contexts/AppContext";

const CashRequestRole = () => {
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
        return <InvestorCashRequest />;
      case "portfolioManager":
        return <PortfolioManagerCashRequest />;
      default:
        return <p>نقش کاربر نامعتبر است</p>;
    }
  };

  return <div className="">{renderComponentBasedOnRole()}</div>;
};

export default CashRequestRole;
