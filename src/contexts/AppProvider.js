import React, { useState } from "react";
import AppContext from "./AppContext";
import { AuthProvider } from "./AuthProvider";  // <-- Import AuthProvider

function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
const [resetPasswordError, setResetPasswordError] = useState("");
  const red = "[#DB524B]";
  const blue = "[#5D9CEC]";
  const green = "[#1BBF89]";
  const orange = "[#F7AF3E]";

  const [baskets, setBaskets] = useState([
    {
      id: 1,
      contractNumber: "CN-2023-001",
      InvestAmount: 10060000,
      status: "در انتظار بررسی",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
      approveDocSituation: "",
      shareRequest: "تایید",
      increaseCapitalHistory: [
        {
          increaseCapitalStatus: "انجام شده",
          amount: "۱۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۰۹",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "رد",
          amount: "۲۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۰",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار ارسال سند واریز",
          amount: "۳۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۱",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار تایید",
          amount: "۴۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۲",
          directIncreaseCapital: true,
        },
      ],
      shareRequestHistory: [
        {
          shareRequestStatus: "انجام شده",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "رد",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار تایید",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار سند واریز",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
      ],
      cashRequestHistory: [
        {
          cashRequestStatus: "انجام شده",
          amount: "۱۰۰۰۰۰۰",
          isDirectPayment: true,
          date: "۱۲۳۴/۱۲/۱۲",
        },
        { cashRequestStatus: "رد", amount: 2000000, isDirectPayment: false },
        {
          cashRequestStatus: "در انتظار تایید",
          amount: "۱۰۰۰۰۰۰",
          isDirectPayment: false,
          date: "۱۲۳۴/۱۲/۱۲",
        },
        {
          cashRequestStatus: "در انتظار سند واریز",
          amount: "۱۰۰۰۰۰۰",
          isDirectPayment: true,
          date: "۱۲۳۴/۱۲/۱۲",
        },
      ],
    },
    {
      id: 2,
      contractNumber: "CN-2023-002",
      InvestAmount: 2000000,
      status: "درخواست سند واریز",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
      shareRequest: "رد",
      increaseCapitalHistory: [
        {
          increaseCapitalStatus: "انجام شده",
          amount: "۱۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۰۹",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "رد",
          amount: "۲۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۰",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار ارسال سند واریز",
          amount: "۳۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۱",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار تایید",
          amount: "۴۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۲",
          directIncreaseCapital: true,
        },
      ],
      shareRequestHistory: [
        {
          shareRequestStatus: "انجام شده",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "رد",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار تایید",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار سند واریز",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
      ],
      cashRequestHistory: [
        {
          cashRequestStatus: "انجام شده",
          amount: 1000000,
          isDirectPayment: true,
        },
        { cashRequestStatus: "رد", amount: 2000000, isDirectPayment: false },
        {
          cashRequestStatus: "در انتظار تایید",
          amount: 3000000,
          isDirectPayment: false,
        },
        {
          cashRequestStatus: "در انتظار سند واریز",
          amount: 4000000,
          isDirectPayment: true,
        },
      ],
    },
    {
      id: 3,
      contractNumber: "CN-2023-003",
      InvestAmount: 3000000,
      status: "بررسی سند واریز",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "غیر مستقیم",
      shareRequest: "درخواست سند نقد کردن",
      increaseCapitalHistory: [
        {
          increaseCapitalStatus: "انجام شده",
          amount: "۱۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۰۹",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "رد",
          amount: "۲۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۰",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار ارسال سند واریز",
          amount: "۳۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۱",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار تایید",
          amount: "۴۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۲",
          directIncreaseCapital: true,
        },
      ],
      shareRequestHistory: [
        {
          shareRequestStatus: "انجام شده",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "رد",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار تایید",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار سند واریز",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
      ],
      cashRequestHistory: [
        {
          cashRequestStatus: "انجام شده",
          amount: 1000000,
          isDirectPayment: true,
        },
        { cashRequestStatus: "رد", amount: 2000000, isDirectPayment: false },
        {
          cashRequestStatus: "در انتظار تایید",
          amount: 3000000,
          isDirectPayment: false,
        },
        {
          cashRequestStatus: "در انتظار سند واریز",
          amount: 4000000,
          isDirectPayment: true,
        },
      ],
    },
    {
      id: 4,
      contractNumber: "CN-2023-004",
      InvestAmount: 4000000,
      status: "تایید",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
      shareRequest: "تایید",
      increaseCapitalHistory: [
        {
          increaseCapitalStatus: "انجام شده",
          amount: "۱۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۰۹",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "رد",
          amount: "۲۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۰",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار ارسال سند واریز",
          amount: "۳۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۱",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار تایید",
          amount: "۴۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۲",
          directIncreaseCapital: true,
        },
      ],
      shareRequestHistory: [
        {
          shareRequestStatus: "انجام شده",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "رد",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار تایید",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار سند واریز",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
      ],
      cashRequestHistory: [
        {
          cashRequestStatus: "انجام شده",
          amount: 1000000,
          isDirectPayment: true,
        },
        { cashRequestStatus: "رد", amount: 2000000, isDirectPayment: false },
        {
          cashRequestStatus: "در انتظار تایید",
          amount: 3000000,
          isDirectPayment: false,
        },
        {
          cashRequestStatus: "در انتظار سند واریز",
          amount: 4000000,
          isDirectPayment: true,
        },
      ],
    },
    {
      id: 5,
      contractNumber: "CN-2023-005",
      InvestAmount: 5000000,
      status: "رد",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
      shareRequest: "درخواست سهم",
      increaseCapitalHistory: [
        {
          increaseCapitalStatus: "انجام شده",
          amount: "۱۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۰۹",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "رد",
          amount: "۲۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۰",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار ارسال سند واریز",
          amount: "۳۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۱",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار تایید",
          amount: "۴۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۲",
          directIncreaseCapital: true,
        },
      ],
      shareRequestHistory: [
        {
          shareRequestStatus: "انجام شده",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "رد",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار تایید",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار سند واریز",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
      ],
      cashRequestHistory: [
        {
          cashRequestStatus: "انجام شده",
          amount: 1000000,
          isDirectPayment: true,
        },
        { cashRequestStatus: "رد", amount: 2000000, isDirectPayment: false },
        {
          cashRequestStatus: "در انتظار تایید",
          amount: 3000000,
          isDirectPayment: false,
        },
        {
          cashRequestStatus: "در انتظار سند واریز",
          amount: 4000000,
          isDirectPayment: true,
        },
      ],
    },
    {
      id: 6,
      contractNumber: "CN-2023-006",
      InvestAmount: 6000000,
      status: "رد",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
      shareRequest: "",
      sharedocument: true,
      increaseCapitalHistory: [
        {
          increaseCapitalStatus: "انجام شده",
          amount: "۱۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۰۹",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "رد",
          amount: "۲۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۰",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار ارسال سند واریز",
          amount: "۳۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۱",
          directIncreaseCapital: true,
        },
        {
          increaseCapitalStatus: "در انتظار تایید",
          amount: "۴۰۰۰۰۰",
          date: "۱۴۰۳/۱۲/۱۲",
          directIncreaseCapital: true,
        },
      ],
      shareRequestHistory: [
        {
          shareRequestStatus: "انجام شده",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "رد",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار تایید",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
        {
          shareRequestStatus: "در انتظار سند واریز",
          Date: "۱۳۳۳/۱۲/۱۲",
          isDirectPayment: true,
        },
      ],
      cashRequestHistory: [
        {
          cashRequestStatus: "انجام شده",
          amount: 1000000,
          isDirectPayment: true,
        },
        { cashRequestStatus: "رد", amount: 2000000, isDirectPayment: false },
        {
          cashRequestStatus: "در انتظار تایید",
          amount: 3000000,
          isDirectPayment: false,
        },
        {
          cashRequestStatus: "در انتظار سند واریز",
          amount: 4000000,
          isDirectPayment: true,
        },
      ],
    },
  ]);
  const [contracts, setContracts] = useState([
    {
      contractNumber: "۱۰۰۱",
      contractStatus: "پیش نویس",
      investor: "امیر زارعی",
      portfolioManager: "سامان کشوری",
      edithedDate: "۱۲۳۴/۱۲/۱۲",
      makeDate: "۱۲۳۴/۱۲/۱۲",
    },
    {
      contractNumber: "۱۰۰۲",
      contractStatus: "ارسال شده",
      investor: "حسن زارعی",
      portfolioManager: "سامان کشوری",
      edithedDate: "۱۲۳۴/۱۲/۱۲",
      makeDate: "۱۲۳۴/۱۲/۱۲",
    },
    {
      contractNumber: "۱۰۰۳",
      contractStatus: "رد شده",
      investor: "رضا زارعی",
      portfolioManager: "سامان کشوری",
      edithedDate: "۱۲۳۴/۱۲/۱۲",
      makeDate: "۱۲۳۴/۱۲/۱۲",
    },
    {
      contractNumber: "۱۰۰۴",
      contractStatus: "نیازمند بازنگری",
      investor: "رضا زارعی",
      portfolioManager: "سامان کشوری",
      edithedDate: "۱۲۳۴/۱۲/۱۲",
      makeDate: "۱۲۳۴/۱۲/۱۲",
    },
    {
      contractNumber: "۱۰۰۵",
      contractStatus: "تایید شده",
      investor: "رضا زارعی",
      portfolioManager: "سامان کشوری",
      edithedDate: "۱۲۳۴/۱۲/۱۲",
      makeDate: "۱۲۳۴/۱۲/۱۲",
    },
  ]);

  const login = (phoneNumber, password) => {
    if (phoneNumber && password) {
      setIsAuthenticated(true);
      setRole(phoneNumber === "1" ? "portfolioManager" : "investor");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  const handleUpdateBasket = (id, updatedFields) => {
    setBaskets((prevBaskets) =>
      prevBaskets.map((basket) =>
        basket.id === id ? { ...basket, ...updatedFields } : basket
      )
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (

    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        role,
        setRole,
        login,
        logout,
        baskets,
        setBaskets,
        contracts,
        setContracts,
        handleUpdateBasket,
        phoneNumber,
        setPhoneNumber,
        nationalId,
        setNationalId,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
        red,
        blue,
        green,
        orange,
      }}
    >
      <AuthProvider>
      {children}
      </AuthProvider>

    </AppContext.Provider>
  );
}

export default AppProvider;
