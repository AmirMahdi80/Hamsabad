import { useContext } from "react";
import Investor from "./Investor";
import PortfolioManager from "./PortfolioManager";
import AppContext from "../../contexts/AppContext";

const UserRoleComponent = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
    login,
    logout,
    baskets,
    setBaskets,
    contracts,
    setContracts,
    handleUpdateBasket,
    phoneNumber,
    setPhoneNumber,
    nationalId,
    setNationalId,
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
  } = useContext(AppContext);

  const userRole = role;
  console.log("userRole", userRole);

  const renderComponentBasedOnRole = () => {
    switch (userRole) {
      case "investor":
        return <Investor />;
      case "portfolioManager":
        return <PortfolioManager />;
      default:
        return <p>نقش کاربر نامعتبر است</p>;
    }
  };

  return <div className="">{renderComponentBasedOnRole()}</div>;
};

export default UserRoleComponent;
