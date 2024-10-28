import React, { useState, useContext } from "react";
import Icon from "../common/Icon";
import AppContext from "../../contexts/AppContext";

// Function to generate a random CAPTCHA string
const generateCaptcha = (length = 6) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < length; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const Captcha = ({ onClose, onSubmit }) => {
  const { isDarkMode } = useContext(AppContext);

  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha()); 
  const [captchaVisible, setCaptchaVisible] = useState(true); 
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!captchaInput) {
      setError("لطفا عبارت امنیتی را وارد کنید");
    } else if (captchaInput !== captchaCode) {
      setError("عبارت امنیتی صحیح نیست");
    } else {
      onSubmit(captchaInput);
    }
  };

  const regenerateCaptcha = () => {
    setCaptchaCode(generateCaptcha());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className={`w-full max-w-md p-4 rounded-lg shadow-lg border ${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-gray-800 border-gray-300"
        }`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={onClose}>
            <Icon
              name="exit"
              size={24}
              className={`cursor-pointer ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            />
          </button>
        </div>

        <div
          className={`mb-4 border rounded-lg ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <div className="py-2 font-bold text-center">کپچا</div>
        </div>

     
        {captchaVisible && (
          <div className="mb-4 text-center py-2">
            <div
              className="captcha-display text-center text-3xl font-bold py-2 bg-gray-100 border border-gray-300 rounded-lg tracking-widest"
              style={{
                fontFamily: "monospace",
                letterSpacing: "8px",
                backgroundColor: isDarkMode ? "#333" : "#f7f7f7",
                color: isDarkMode ? "#fff" : "#333",
              }}
            >
              {captchaCode}
            </div>
            <button
              onClick={regenerateCaptcha}
              className={`mt-4 px-4 py-2 font-bold text-white rounded-lg ${
                isDarkMode ? "bg-green-600" : "bg-[#1BBF89]"
              }`}
            >
              بازسازی کپچا
            </button>
          </div>
        )}

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="لطفا عبارت امنیتی را وارد نمایید"
            className={`w-full py-2 px-4 pl-10 border rounded-lg text-right placeholder-gray-400 ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
            value={captchaInput}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              setError("");
            }}
          />
          
          <Icon
            name="eye"
            size={20}
            className={`absolute transform -translate-y-1/2 left-3 top-1/2 cursor-pointer ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
            onClick={() => setCaptchaVisible(!captchaVisible)} 
          />
        </div>

        {error && (
          <p className="mb-4 text-sm text-center text-red-500">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className={`w-1/2 mx-auto block px-4 py-2 font-bold text-white rounded-lg ${
            isDarkMode ? "bg-green-600" : "bg-[#1BBF89]"
          }`}
        >
          ارسال
        </button>
      </div>
    </div>
  );
};

export default Captcha;
