import React, { useState, useContext } from "react";
import * as icons from "../../assets/icons";
import Sidebar from "../common/Sidebar";
import AppContext from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("./dashboard");
  };

  return (
    <div>
      <header
        className={`w-full flex justify-between items-center p-4 md:p-6 shadow-md ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        } shadow-md`}
      >
        <div className="flex items-center space-x-4">
          <button className="ml-4 text-2xl" onClick={toggleSidebar}>
            <img
              src={icons.menubutton}
              alt={"menubutton"}
              className="object-contain w-10 h-10 mb-2"
            />
          </button>
          <button onClick={handleNavigate}>
            <img
              src={icons.hamsabad}
              alt={"hamsabad"}
              className="object-contain w-12 h-12 mb-2"
            />
          </button>
        </div>
        <h1 className="text-4xl text-[rgb(189,188,192)] font-extrabold">
          هم‌سبد{" "}
        </h1>
        <div className="flex items-center space-x-4">
          <button className="ml-4 text-2xl">
            <img
              src={icons.search}
              alt={"search"}
              className="object-contain w-10 h-10 mb-2"
            />
          </button>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default Header;
