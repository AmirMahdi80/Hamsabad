import React, { useState, useContext, useEffect } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

const SetPassword = () => {
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

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const rememberedPassword = localStorage.getItem("rememberPassword");
    if (rememberedPassword) {
      setPassword(rememberedPassword);
      setRemember(true);
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
  };

  const handleShowPasswordChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setErrorMessage("رمز عبور و تکرار آن مطابقت ندارند"); // Set error message if passwords don't match
    } else {
      setErrorMessage(""); // Clear the error message if passwords match
      console.log("Password submitted:", password);
      navigate("/informationentry");
    }
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
            تعیین رمز عبور
          </h1>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Icon
            name="hamsabad"
            className="w-[5.625rem] h-[5.625rem] md:w-[8.125rem] md:h-[8.125rem] text-white transform translate-y-8"
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
          <input
            type={showPassword ? "text" : "password"}
            placeholder="لطفا رمز عبور خود را وارد نمایید"
            className={`w-full py-2 pl-10 pr-3 rounded-lg text-lef placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={password}
            onChange={handlePasswordChange}
          />
          <Icon
            name="lock"
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
          <input
            type={showPassword ? "text" : "password"}
            placeholder="لطفا رمز عبور خود را مجددا وارد نمایید"
            className={`w-full py-2 pl-10 pr-3 rounded-lg placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Icon
            name="lock"
            size={20}
            className="absolute text-gray-400 left-3 top-3"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p> // Display error message if passwords don't match
        )}
        <div className="flex items-center justify-around mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="ml-2"
              checked={remember}
              onChange={handleRememberChange}
            />
            <label htmlFor="remember" className="text-sm">
              مرا به خاطر بسپار
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              className="ml-2"
              checked={showPassword}
              onChange={handleShowPasswordChange}
            />
            <label htmlFor="showPassword" className="text-sm">
              نمایش رمز عبور
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
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

export default SetPassword;
