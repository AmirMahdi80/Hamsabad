import React, { useState, useContext } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

const GetSms = () => {
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

  const goBack = () => {
    navigate(-1);
  };

  const goNext = () => {
    navigate("/set-password");
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } w-full`}
    >
      <div
        className={`mb-8 relative w-full ${
          isDarkMode ? "bg-blue-600" : "bg-[#5D9CEC]"
        } h-20 py-2 mb-4 flex items-center justify-between px-4`}
      >
        <div className="absolute flex items-center right-4">
          <button
            onClick={goBack}
            className={`p-2 rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <Icon
              name="arrowright"
              size={15}
              className={isDarkMode ? "text-white" : "text-gray-800"}
            />
          </button>
          <span
            className={`mr-2 text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            فعالسازی
          </span>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Icon
            name="hamsabad"
            size={120}
            className="text-white transform translate-y-7"
          />
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6">
        <div
          className={`mb-4 relative border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700"
              : "border-gray-400 bg-gray-100"
          } rounded-lg`}
        >
          <label className="absolute text-sm right-3 top-2.5">
            شماره همراه
          </label>
          <input
            type="tel"
            className={`w-full py-2 pl-10 pr-3 rounded-lg text-left placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={phoneNumber}
            readOnly
          />
          <Icon
            name="mobile"
            size={20}
            className="absolute text-gray-400 left-3 top-3"
          />
        </div>

        <div
          className={`mb-4 relative border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700"
              : "border-gray-400 bg-gray-100"
          } rounded-lg`}
        >
          <label className="absolute text-sm right-3 top-2.5">
            کد فعالسازی را وارد نمایید
          </label>
          <input
            type="text"
            placeholder="۱۲۳۴"
            className={`w-full py-2 pl-10 pr-3 rounded-lg text-left placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
          <Icon
            name="eye"
            size={20}
            className="absolute text-gray-400 left-3 top-3"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={goNext}
            className={`py-2 px-4 rounded-lg ${
              isDarkMode
                ? "bg-[#1BBF89] text-white"
                : "bg-[#1BBF89] text-gray-800"
            } mt-4 w-1/2`}
          >
            ادامه
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetSms;
