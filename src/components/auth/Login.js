import React, { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";
import AppContext from "../../contexts/AppContext";
import { Link } from "react-router-dom";


const Login = () => {
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

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const bottomIcons = [
    { name: "help", label: "راهنما" },
    { name: "emk", label: "امکانات من" },
    { name: "contact", label: "ارتباط با ما" },
    { name: "exit", label: "خروج" },
  ];

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    setError("");
    if (phoneNumber.trim() === "" || password.trim() === "") {
      setError("لطفا شماره تلفن و رمز عبور را وارد کنید.");
      return;
    }
    if (rememberMe) {
      localStorage.setItem('rememberMe', phoneNumber);
    } else {
      localStorage.removeItem('rememberMe');
    }

    // اگر هر دو فیلد پر شده باشند، کاربر را به عنوان احراز هویت شده در نظر می‌گیریم
    login(phoneNumber, password);
    navigate("/dashboard");
  };
  useEffect(() => {
    const rememberedPhoneNumber = localStorage.getItem('rememberMe');
    if (rememberedPhoneNumber) {
      setPhoneNumber(rememberedPhoneNumber);
      setRememberMe(true);
    }
  }, [setPhoneNumber]);


  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } w-full`}
    >
      <div
        className={`mb-8 relative w-full ${
          isDarkMode ? "bg-blue-600" : "bg-[#5D9CEC]"
        } h-40 py-2 mb-4 flex flex-col items-center`}
      >
        <h1
          className={`text-2xl font-bold text-center ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
      نرم افزار مدیریتی هم‌سبد
        </h1>
        <div className="relative mt-2">
          <Icon
            name="hamsabad"
            size={150}
            className="text-white transform translate-y-6"
          />
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6">
        <h2 className="mb-6 text-xl font-semibold text-center">ورود</h2>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

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
          <label className="absolute text-sm right-3 top-2.5">رمز عبور</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••"
            className={`w-full py-2 pl-10 pr-3 rounded-lg text-left placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Icon
            name="lock"
            size={20}
            className="absolute text-gray-400 left-3 top-3"
          />
        </div>

        <div className="flex items-center justify-around mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="ml-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword" className="text-sm">
              نمایش رمز عبور
            </label>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={handleRegister}
            className={`py-2 px-4 rounded-lg ${
              isDarkMode
                ? "bg-[#F7AF3E] text-white"
                : "bg-[#F7AF3E] text-gray-800"
            } w-[45%]`}
          >
            ثبت نام
          </button>
          <button
            onClick={handleLogin}
            className={`py-2 px-4 rounded-lg ${
              isDarkMode
                ? "bg-[#1BBF89] text-white"
                : "bg-[#1BBF89] text-gray-800"
            } w-[45%]`}
          >
            ورود
          </button>
        </div>

        
        <div className="mb-6 text-center">
  <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
    رمز عبور خود را فراموش کردید؟
  </Link>
  </div>

        <div className="flex justify-between mt-6">
          {bottomIcons.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className={`p-2 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <Icon
                  name={item.name}
                  size={24}
                  className={isDarkMode ? "text-white" : "text-gray-800"}
                />
              </button>
              <span
                className={`text-sm mt-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
