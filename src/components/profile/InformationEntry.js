import React, { useState, useContext } from "react";
// import { useTheme } from "../../contexts/ThemeContext";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import { RegistrationContext } from "../../contexts/RegistrationContext";
import AppContext from "../../contexts/AppContext";

const InformationEntry = () => {
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
  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    nationalId: nationalId,
    phoneNumber: phoneNumber,
    role: "سهامدار",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isNationalIdEditable, setIsNationalIdEditable] = useState(false);
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.familyName || !formData.role) {
      setErrorMessage("لطفاً نام، نام خانوادگی و نقش را وارد کنید.");
      return;
    }

    setErrorMessage("");
    console.log("Form submitted:", formData);
    navigate("/");
  };

  const toggleNationalIdEdit = () => {
    setIsNationalIdEditable(!isNationalIdEditable);
  };

  const togglePhoneNumberEdit = () => {
    setIsPhoneNumberEditable(!isPhoneNumberEditable);
  };

  const handleNationalIdChange = (e) => {
    const newNationalId = e.target.value;
    setFormData((prevData) => ({ ...prevData, nationalId: newNationalId }));
    setNationalId(newNationalId);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setFormData((prevData) => ({ ...prevData, phoneNumber: newPhoneNumber }));
    setPhoneNumber(newPhoneNumber);
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
          <h1
            className={`mr-2 text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            ورود اطلاعات
          </h1>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Icon
            name="hamsabad"
            // size={150}
            className="w-[5.625rem] h-[5.625rem] md:w-[8.125rem] md:h-[8.125rem] text-white transform translate-y-8"
          />
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6">
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">نام:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="سامان"
            className={`w-full py-2 px-3 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            نام خانوادگی:
          </label>
          <input
            type="text"
            name="familyName"
            value={formData.familyName}
            onChange={handleInputChange}
            placeholder="کشوری"
            className={`w-full py-2 px-3 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">کد ملی:</label>
          <div className="flex">
            <input
              type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleNationalIdChange}
              placeholder="شماره ملی"
              className={`flex-grow py-2 px-3 rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-800"
              } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
              disabled={!isNationalIdEditable}
            />
            <button
              onClick={toggleNationalIdEdit}
              className={`m-2 px-4 rounded-lg ${
                isDarkMode
                  ? "bg-blue-500 text-white"
                  : "bg-[#5D9CEC] text-gray-800"
              }`}
            >
              {isNationalIdEditable ? "ثبت" : "تغییر کد ملی"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">شماره همراه:</label>
          <div className="flex">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="شماره همراه"
              className={`flex-grow py-2 px-3 rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-800"
              } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
              disabled={!isPhoneNumberEditable}
            />
            <button
              onClick={togglePhoneNumberEdit}
              className={`m-2 px-4 rounded-lg ${
                isDarkMode
                  ? "bg-[#5D9CEC] text-white"
                  : "bg-[#5D9CEC] text-gray-800"
              }`}
            >
              {isPhoneNumberEditable ? "ثبت" : "تغییر شماره"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">نقش من:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={`w-full py-2 px-3 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
          >
            <option value="سهامدار">سهامدار</option>
            <option value="سبدگردان">سبدگردان</option>
            <option value="سهامدار و سبدگردان">سهامدار و سبدگردان</option>
          </select>
        </div>

        {errorMessage && (
          <div className="mb-4 text-center text-red-500">{errorMessage}</div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className={`py-2 px-4 rounded-lg ${
              isDarkMode ? "bg-green-500 text-white" : "bg-[#1BBF89] text-white"
            } w-1/2`}
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationEntry;
