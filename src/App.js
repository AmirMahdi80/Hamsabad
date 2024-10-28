import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./contexts/AppProvider";
import AppContext from "./contexts/AppContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Sidebar from "./components/common/Sidebar";
import BottomMenu from "./components/common/BottomMenu";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import Dashboard from "./components/dashboard/Dashboard";
import ContractList from "./components/contract/ContractList";
import GetSms from "./components/auth/Getsms";
import SetPassword from "./components/auth/Setpassword";
import InformationEntry from "./components/profile/InformationEntry";
import UserProfile from "./components/profile/UserProfile";
import UserRoleComponent from "./components/contract/UserRoleComponent";
import InvestRoleComponent from "./components/transactions/InvestRoleComponent";
import InvestmentApproval from "./components/notification/DepositReceipt";
import PaymentRequestRole from "./components/paymentrequest/PaymentRequestRole";
import FavoritesPage from "./components/favorites/FavoritesPage ";
import CashRequestRole from "./components/cashrequest/CashRequestRole";
import MyBaskets from "./components/mybaskets/MyBaskets";
import Notification from "./components/notification/Notification";
import Messages from "./components/messages/Messages";
import StockNote from "./components/notes/stockNote ";
import StockNotesPage from "./components/notes/StockNotesPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isDarkMode } = useContext(AppContext);

  return (
    <div
      className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-800 text-white" : ""}`}
    >
      {isAuthenticated && <Header />}
      <div className="relative flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 pb-20 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/getsms" element={<GetSms />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/informationentry" element={<InformationEntry />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/notes" element={<StockNote />} />
            <Route path="/stock-notes" element={<StockNotesPage />} />



            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<UserRoleComponent />} />
            <Route path="/contracts" element={<ContractList />} />
            <Route path="/increasecapital" element={<InvestRoleComponent />} />
            <Route path="/share-request" element={<PaymentRequestRole />} />
            <Route path="/cashrequest" element={<CashRequestRole />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/mybaskets" element={<MyBaskets />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
      {isAuthenticated && <BottomMenu />}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
