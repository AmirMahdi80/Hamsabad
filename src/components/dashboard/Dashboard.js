import React, { useContext } from "react";
import * as icons from "../../assets/icons";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

const Dashboard = () => {
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
    { icon: icons.merchantPrograms, label: "بستن قرارداد", path: "/user" },
    { icon: icons.shoppingBasket, label: "سبدهای من", path: "/mybaskets" },
    { icon: icons.graf1, label: "بررسی شاخص", path: "" },
    { icon: icons.notes, label: "یادداشت", path: "/notes" },
    {
      icon: icons.cash,
      label: "درخواست وجه",
      path: "/cashrequest",
    },
    {
      icon: icons.dollarbag2,
      label: "درخواست سهم سبدگردانی",
      path: "/share-request",
    },
    { icon: icons.pay1, label: "افزایش سرمایه", path: "/increasecapital" },
    { icon: icons.messages, label: "پیام‌های من", path: "/messages" },
    { icon: icons.bell, label: "اعلان‌ها", path: "/notification" },

    { icon: icons.favorites, label: "علاقه‌مندی", path: "/Favorites" },
    { icon: icons.kodal, label: "اخبار", path: "" },
    { icon: icons.txhistory, label: "تاریخچه معاملات", path: "" },
    { icon: icons.graf2, label: "بررسی سهم", path: "" },
  ];

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "text-gray-800"
      } min-h-screen pb-20 relative`}
    >
      <div className="grid grid-cols-3 gap-4 p-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center p-1 rounded-lg border border-gray-300 ${
              isDarkMode ? "bg-gray-700" : ""
            } shadow-m`}
          >
            <img
              src={item.icon}
              alt={item.label}
              className="object-contain w-12 h-12 mb-2"
            />
            <span className="text-sm text-center">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
