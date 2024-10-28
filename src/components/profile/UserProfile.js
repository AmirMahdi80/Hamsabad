import React, { useContext } from "react";
import * as icons from "../../assets/icons";
import AppContext from "../../contexts/AppContext";

const UserProfile = () => {
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

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } flex justify-center`}
    >
      {/* Profile Form */}
      <main className="w-full p-4 space-y-6 md:w-1/2">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">تنظیم پروفایل کاربری</h2>
        </div>

        <div className="flex justify-center">
          <div
            className={`w-24 h-24 ${
              isDarkMode ? "bg-gray-600" : "bg-gray-200"
            } flex items-center justify-center`}
          >
            <img src={icons.camera} alt="افزودن تصویر" className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">نام:</label>
            <p
              className={`w-full p-2 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              سامان
            </p>
          </div>
          <div>
            <label className="block mb-1">نام خانوادگی:</label>
            <p
              className={`w-full p-2 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              کشوری
            </p>
          </div>
        </div>

        {/* نقش من */}
        <div>
          <h3 className="mb-2 text-lg">نقش من</h3>
          <p
            className={`w-full p-2 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            سهامدار
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
