import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import AppContext from "../../contexts/AppContext";

const BottomMenu = () => {
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

  const menuItems = [
    { icon: "services", label: "خدمات", path: "/services" },
    { icon: "mymessages", label: "پیام‌های من", path: "/messages" },
    { icon: "mybaskets", label: "سبدهای من", path: "/mybaskets" },
    { icon: "share2", label: "معرفی به دوستان", path: "/refer" },
    { icon: "favorites1", label: "علاقه مندی ها", path: "/favorites" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 flex justify-between items-center p-4 border-t ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="relative flex flex-col items-center cursor-pointer"
        >
          <Icon
            name={item.icon}
            size={28}
            className={`mb-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}
          />
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomMenu;
