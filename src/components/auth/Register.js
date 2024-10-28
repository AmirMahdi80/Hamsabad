import React, { useState, useContext } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import Captcha from "../modals/Captcha";
import AppContext from "../../contexts/AppContext";

const Register = () => {
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

  const [showCaptcha, setShowCaptcha] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToLogin = () => {
    navigate("/");
  };

  const closeCaptcha = () =>{
    setShowCaptcha(false);
  }

  const handleContinue = () => {
    setPhoneNumber(phoneNumber);
    setNationalId(nationalId);
    setShowCaptcha(true);
  };

  const handleCaptchaSubmit = (captchaInput) => {
    console.log("CAPTCHA submitted:", captchaInput);
    setShowCaptcha(false);
    navigate("/getsms");
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
          <h1
            className={`mr-2 text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            عضویت
          </h1>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Icon
            name="hamsabad"
            size={100}
            className="text-white transform translate-y-6"
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
            placeholder="۰۹"
            className={`w-full py-2 pl-10 pr-3 rounded-lg text-left placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
          <label className="absolute text-sm right-3 top-2.5">شماره ملی</label>
          <input
            type="text"
            placeholder="۴۰"
            className={`w-full py-2 pl-10 pr-3 rounded-lg text-left placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
          <Icon
            name="user"
            size={20}
            className="absolute text-gray-400 left-3 top-3"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className={`py-2 px-4 rounded-lg ${
              isDarkMode
                ? "bg-[#1BBF89] text-white"
                : "bg-[#1BBF89] text-gray-800"
            } mt-4 w-1/2`}
          >
            ادامه
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">
            قبلا عضو شده‌اید؟{" "}
            <button
              onClick={goToLogin}
              className="text-blue-500 hover:text-blue-700"
            >
              ورود به هم‌سبد
            </button>
          </p>
        </div>
      </div>

      {showCaptcha && (
        <Captcha onClose={closeCaptcha} onSubmit={handleCaptchaSubmit} />
      )}
    </div>
  );
};

export default Register;
