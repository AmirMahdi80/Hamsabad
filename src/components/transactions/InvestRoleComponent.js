import React, { useContext } from "react";
import InvestorIncreaseCapital from "./InvestorIncreaseCapital";
import PortfolioManagerIncreaseCapital from "./PortfolioManagerIncreaseCapital";

import AppContext from "../../contexts/AppContext";

const InvestRoleComponent = () => {
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
        return <InvestorIncreaseCapital />;
      case "portfolioManager":
        return <PortfolioManagerIncreaseCapital />;
      default:
        return <p>نقش کاربر نامعتبر است</p>;
    }
  };

  return <div className="">{renderComponentBasedOnRole()}</div>;
};

export default InvestRoleComponent;
