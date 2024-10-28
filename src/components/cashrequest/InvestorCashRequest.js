import React, { useState, useContext, useEffect } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import AppContext from "../../contexts/AppContext";

// Generic Modal Component
const Modal = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-4 bg-gray-100">
        <div className="flex items-center mb-4">
          <button onClick={onClose} className="">
            <Icon name="arrowright" size={16} className="ml-4" />
          </button>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "رد":
      return "bg-[#DB524B]";
    case "انجام شده":
      return "bg-[#1BBF89]";
    case "در انتظار تایید":
      return "bg-gray-500";
    case "در انتظار سند واریز":
      return "bg-[#5D9CEC]";
    default:
      return "bg-gray-500";
  }
};

const CashRequestModalContent = ({ cashrequestValue, setCashRequestValue }) => (
  <div className="p-4 px-8">
    <div className="mb-4">
      <label className="block mb-2">مبلغ درخواستی:</label>
      <div className="flex items-center justify-center">
        <input
          onChange={setCashRequestValue()}
          type="text"
          value={cashrequestValue}
          className="p-1 text-center border border-gray-300"
          // readOnly
        />
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="mb-4">
      <label className="block mb-2">تاریخ:</label>

      <div className="flex justify-center ml-8">
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          // value={selectedDate}
          // onChange={handleDateChange}
          format="YYYY/MM/DD"
          inputClass="p-1 text-center border border-gray-300"
          containerClassName=""
        />
      </div>
    </div>
    <div className="flex justify-center mt-16">
      <button className="px-2 py-1 font-bold text-black bg-[#1BBF89]">
        ثبت درخواست وجه از سبد
      </button>
    </div>
  </div>
);

const CashRequestHistoryModalContent = ({ basket, handleEyeIconClick }) => (
  <div className="">
    {basket.cashRequestHistory.map((cashreq, index) => (
      <div
        key={index}
        className={`p-4 mb-1 ${getStatusColor(cashreq.cashRequestStatus)}`}
      >
        <div className="flex justify-between mb-1">
          <span className="font-bold">وضعیت:</span>
          <span>{cashreq.cashRequestStatus}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">تاریخ:</span> {cashreq.date}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">
            {cashreq.isDirectPayment
              ? "واریز مستقیم"
              : "واریز به حساب کارگزاری"}
          </span>
          <button
            onClick={(event) => handleEyeIconClick(event, basket, cashreq)}
          >
            <Icon className="mx-2" name="eye" size={32} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const CashRequestDetailsModal = ({
  basket,
  cashreq,
  setIsCashRequestDetailsModalVisible,
  onClose,
}) => {
  return (
    <div className="px-8">
      <div className="mb-4 space-y-6">
        <div className="flex items-center">
          <span className="flex-shrink-0 w-20">مبلغ:</span>
          <div className="flex flex-grow">
            <div className="flex items-center justify-end w-full">
              <div className="whitespace-nowrap">۱۰۰۰۰۰۰۰۰</div>
            </div>
            <div className="flex justify-end w-20">ریال</div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="flex-shrink-0 w-20">تاریخ:</span>
          <div className="flex flex-grow">
            <div className="flex items-center justify-end w-full">
              <div className="text-left whitespace-nowrap">۱۲۳۴/۱۲/۱۲</div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
        <div>واریز به‌صورت مستقیم</div>
      </div>
      <div className="mb-4 space-y-4">
        <div>پیام سرمایه‌گذار :</div>
        <div> علت رد:</div>
        <div>پیام سبدگردان :</div>
      </div>
      <div className="flex justify-center">
        {/* <div className="w-48 h-48 p-4 mb-4 bg-white border-2 border-gray-300"></div> */}
      </div>
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="px-4 py-1 font-bold border bg-whit"
        >
          بازگشت
        </button>
      </div>
    </div>
  );
};

const ConfirmedCashRequestModal = ({ cashreq, onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden">
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font">مبلغ:</span>
            <div className="flex justify-around w-6/12">
              <div>{cashreq.amount}</div>
              <span>ریال</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font">تاریخ:</span>
            <div className="flex justify-around w-6/12">
              <div>{cashreq.date}</div>
              <span className="text-gray-100">ریال</span>
            </div>
          </div>
          <div>
            <span className="">پیام سبدگردان:</span>
            <p className="mt-1">
              {cashreq.portfolioManagerMessage || "بدون پیام"}
            </p>
          </div>
          <div>
            <span className="">پیام سرمایه‌گذار:</span>
            <p className="mt-1">{cashreq.investorMessage || "بدون پیام"}</p>
          </div>
          <div>
            <span className="">سند واریز:</span>
            <div className="flex items-center justify-center h-32 mt-2 bg-white border">
              <img
                src={cashreq.depositDocument}
                alt=""
                className="max-h-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          <button onClick={onClose} className="px-4 py-1 font-bold border">
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
};

const UploadDocumentModal = ({ onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // onSubmit(selectedFile, comments);
    onClose();
  };

  const handleReject = () => {
    // onReject(selectedFile, comments);
    onClose();
  };

  return (
    <div className="p-6">
      <div className="mb-4 fle">
        <div className="flex justify-center">
          {" "}
          <div className="flex items-center justify-center w-56 h-40 bg-white border-2 border-gray-300">
            {selectedFile ? (
              <p className="text-gray-600">{selectedFile.name}</p>
            ) : (
              <p className="text-gray-400">برای انتخاب فایل کلیک کنید</p>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="w-24 py-1 mt-2 text-white bg-blue-500"
          >
            انتخاب سند
          </button>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <textarea
          placeholder="نوشتن توضیحات..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-8/12 p-2 border"
          rows="2"
        />
      </div>
      <div className="flex justify-around">
        <button onClick={handleSubmit} className="bg-[#1BBF89] py-1 w-20 ">
          ثبت
        </button>
      </div>
    </div>
  );
};

const InvestorCashRequest = () => {
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
    navigate("/dashboard");
  };
  const [cashrequestValue, setCashRequestValue] = useState();
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [isUploadDocumentModalVisible, setUploadDocumentModalVisible] =
    useState(false);
  const [isCashRequestModalVisible, setCashRequestModalVisible] =
    useState(false);
  const [isCashRequestHistoryModalVisible, setCashRequestHistoryModalVisible] =
    useState(false);
  const [
    isCashRequestDetailsModalVisible,
    setIsCashRequestDetailsModalVisible,
  ] = useState(false);
  const [cashreq, setCashreq] = useState();

  const [
    isConfirmedCashRequestModalVisible,
    setIsConfirmedCashRequestModalVisible,
  ] = useState(false);

  const handleBasketClick = (basket) => {
    setSelectedBasket(basket);
  };
  const handleEyeIconClick = (event, basket, cashreq) => {
    event.stopPropagation();
    if (cashreq.cashRequestStatus === "رد") {
      setSelectedBasket(basket);
      setCashreq(cashreq);
      setIsCashRequestDetailsModalVisible(true);
    } else if (cashreq.cashRequestStatus === "انجام شده") {
      setSelectedBasket(basket);
      setCashreq(cashreq);
      setIsConfirmedCashRequestModalVisible(true);
    } else if (cashreq.cashRequestStatus === "در انتظار سند واریز") {
      setSelectedBasket(basket);
      setCashreq(cashreq);
      setUploadDocumentModalVisible(true);
    }
  };

  const handleCloseConfirmedCashRequestModal = () => {
    setIsConfirmedCashRequestModalVisible(false);
  };

  const handleCloseCashRequestDetailsModal = () => {
    setIsCashRequestDetailsModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseCashRequestHistoryModal = () => {
    setCashRequestHistoryModalVisible(false);
    setSelectedBasket(null);
  };

  const handleCloseUploadDocumentModal = () => {
    setUploadDocumentModalVisible(false);
  };

  const handleICashrequestHistoryconClick = (basket, event) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setCashRequestHistoryModalVisible(true);
  };

  const handleCashRequestIconClick = (basket, event) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setCashRequestModalVisible(true);
  };

  const handleCloseCashRequestModal = () => {
    setCashRequestModalVisible(false);
    setSelectedBasket(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex py-4">
        <button
          onClick={handleNavigate}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <Icon name="arrowright" size={16} className="ml-2" />
        </button>
        <span className="font-bold">درخواست وجه</span>
      </div>
      {baskets.map((basket) => (
        <div
          key={basket.id}
          className="p-4 m-2 shadow-md cursor-pointer bg-[#1BBF89]"
          onClick={() => handleBasketClick(basket)}
        >
          <div className="flex justify-center mb-4 text-lg font-bold sm:mb-8 sm:text-xl">
            <label className="mx-2 font-bold">شماره سبد: </label>
            <span>{basket.contractNumber}</span>
          </div>
          <div className="flex flex-col items-start justify-between mb-4 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="mb-2 sm:mb-0">
              <label className="font-semibold">سرمایه گذار: </label>
              <span>{basket.investor}</span>
            </div>
            <div className="">
              <label className="font-semibold">میزان سرمایه: </label>
              <span>{basket.InvestAmount}</span>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <div className="flex justify-center px-4 py-2 bg-gray-200">
              <button
              // onClick={() => handleMessageClick("0912")}
              >
                <Icon className="mx-2" name="messages2" size={32} />
              </button>
              <button
              // onClick={() => handleCallClick("0912")}
              >
                <Icon className="mx-2" name="call" size={32} />
              </button>
              <Icon className="mx-2" name="eye" size={32} />
              <button
                onClick={(event) =>
                  handleICashrequestHistoryconClick(basket, event)
                }
              >
                <Icon className="mx-2" name="cashrequesthistory" size={32} />
              </button>
              <button
                onClick={(event) => handleCashRequestIconClick(basket, event)}
              >
                <Icon className="mx-2" name="cashrequest" size={32} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isVisible={isCashRequestModalVisible}
        onClose={handleCloseCashRequestModal}
        title="درخواست وجه"
      >
        <CashRequestModalContent
          cashrequestValue={cashrequestValue}
          setCashRequestValue={setCashRequestValue}
        />
      </Modal>
      <Modal
        isVisible={isCashRequestHistoryModalVisible}
        onClose={handleCloseCashRequestHistoryModal}
        title={`درخواست وجه نقد سبد (${selectedBasket?.contractNumber})`}
      >
        <CashRequestHistoryModalContent
          basket={selectedBasket}
          handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>

      <Modal
        isVisible={isCashRequestDetailsModalVisible}
        onClose={handleCloseCashRequestDetailsModal}
        title={`${selectedBasket?.contractNumber}(رد شده)`}
      >
        <CashRequestDetailsModal
          setIsCashRequestDetailsModalVisible={
            setIsCashRequestDetailsModalVisible
          }
          basket={selectedBasket}
          // handleEyeIconClick={handleEyeIconClick}
          cashreq={cashreq}
        />
      </Modal>
      <Modal
        isVisible={isConfirmedCashRequestModalVisible}
        onClose={handleCloseConfirmedCashRequestModal}
        title={`درخواست وجه ${selectedBasket?.contractNumber} (تایید شده)`}
      >
        <ConfirmedCashRequestModal
          cashreq={cashreq}
          onClose={handleCloseConfirmedCashRequestModal}
        />
      </Modal>
      <Modal
        isVisible={isUploadDocumentModalVisible}
        onClose={handleCloseUploadDocumentModal}
        title={`ثبت سند واریز سبد (${selectedBasket?.contractNumber})`}
      >
        <UploadDocumentModal
          cashreq={cashreq}
          onClose={handleCloseUploadDocumentModal}
        />
      </Modal>
    </div>
  );
};

export default InvestorCashRequest;
