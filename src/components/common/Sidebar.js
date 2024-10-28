import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as icons from "../../assets/icons";
import AppContext from "../../contexts/AppContext";

const Sidebar = ({ isOpen, onClose }) => {
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
      navigate("./dashboard");
    };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-64 md:w-80 lg:w-96 
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
        shadow-lg transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        z-50 overflow-y-auto`}
        style={{ direction: "ltr" }}
      >
        <div style={{ direction: "rtl" }}>
          <div
            className={`flex items-center justify-between p-4 border-b-4 border ${
              isDarkMode ? "border-gray-700" : "border-b-gray-300 border-b-2"
            }`}
          >
            <div className="w-6 h-6"></div>
            <button onClick={handleNavigate}>
              <img src={icons.hamsabad} alt="هم‌سبد" className="w-12 h-12" />
            </button>
            <button onClick={onClose} className="text-2xl">
              <img src={icons.arrowright} alt="بستن" className="w-4 h-6" />
            </button>
          </div>

          <div className="flex justify-center my-6">
            <div>
              {" "}
              <img
                src={icons.profile}
                alt="تصویر پروفایل"
                className="w-20 h-20 rounded-full"
              />
              <span>سامان کشوری</span>
            </div>
          </div>

          <nav
            className="flex-grow p-4 space-y-4 overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>
              {`
            nav::-webkit-scrollbar {
              display: none;
            }
          `}
            </style>

            <button onClick={toggleDarkMode}>
              {isDarkMode ? "حالت روشن" : "حالت تاریک"}
            </button>
            <Link
              onClick={onClose}
              to="/profile"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <img src={icons.profile} alt="سامان کشوری" className="w-6 h-6" />
              <span>سامان کشوری</span>
            </Link>
            <div
              className={`my-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } border-b-2`}
            ></div>

            <Link
              onClick={onClose}
              to="/profile"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <img
                src={icons.profile}
                alt="پروفایل کاربری"
                className="w-6 h-6"
              />
              <span>پروفایل کاربری</span>
            </Link>
            <div
              className={`my-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } border-b-2`}
            ></div>
            <Link
              onClick={onClose}
              to="/services"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <img src={icons.services1} alt="خدمات" className="w-6 h-6" />
              <span>خدمات</span>
            </Link>
            <div
              className={`my-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } border-b-2`}
            ></div>
            <Link
              onClick={onClose}
              to="/mybaskets"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <img
                src={icons.shoppingBasket}
                alt="سبدهای من"
                className="w-6 h-6"
              />
              <span>سبدهای من</span>
            </Link>
            <div
              className={`my-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } border-b-2`}
            ></div>
            <Link
              onClick={onClose}
              to="/messages"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <img src={icons.messages} alt="پیام‌ها" className="w-6 h-6" />
              <span>پیام‌ها</span>
            </Link>
            <div
              className={`my-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } border-b-2`}
            ></div>
            <Link
              onClick={onClose}
              to="/contact"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <img src={icons.contact} alt="ارتباط با ما" className="w-6 h-6" />
              <span>ارتباط با ما</span>
            </Link>
            <div
              className={`my-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } border-b-2`}
            ></div>
            <Link
              onClick={onClose}
              to="/share"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <img
                src={icons.share1}
                alt="اشتراک‌گذاری با دوستان"
                className="w-6 h-6"
              />
              <span>اشتراک‌گذاری با دوستان</span>
            </Link>
            <div
              className={`my-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } border-b-2`}
            ></div>
            <Link to="/" onClick={onClose} className="pb-3 border-b-2">
              {" "}
              <button className="flex items-center space-x-2 space-x-reverse text-red-600">
                <img
                  src={icons.exit1}
                  alt="خروج از حساب کاربری"
                  className="w-6 h-6"
                />
                <span>خروج</span>
              </button>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
