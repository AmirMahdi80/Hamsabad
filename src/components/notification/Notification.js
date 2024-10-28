import React, { useContext } from "react";
import * as icons from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import Icon from "../common/Icon";

const Notification = () => {
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

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <div className="items-center justify-start p-4">
      <div className="flex py-4">
        <button
          onClick={handleNavigate}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <Icon name="arrowright" size={16} className="ml-2" />
        </button>
        <span className="font-bold">اعلانها</span>
      </div>
      <div className="flex justify-center p-8 mt-6 bg-gray-100">اعللانی وجود ندارد</div>
    </div>
  );
};

export default Notification;
