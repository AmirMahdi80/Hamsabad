import React, { useState, useContext, useEffect } from "react";
import Icon from "../common/Icon";
import AppContext from "../../contexts/AppContext";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { useNavigate } from "react-router-dom";

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

// Specific Modal Content for "history"
const HistoryModalContent = ({ basket, handleEyeIconClick }) => {
  // const shareRequestHistory = basket?.shareRequestHistory || [];

  return (
    <div>
      {
        basket.shareRequestHistory.map((sharereq, index) => (
          <div
            key={index}
            className={`p-4 my-1  ${getStatusColor(
              sharereq.shareRequestStatus
            )}`}
          >
            <div className="flex justify-between">
              <label>مبلغ</label>
              <span>{sharereq.amount}</span>
              <span>{sharereq.shareRequestStatus}</span>
            </div>
            <div className="flex justify-between">
              <label>تاریخ</label>
              <span>{sharereq.Date}</span>
            </div>
            <label>علت رد</label>
            <span>...</span>
            <div className="flex justify-end">
              <button
                onClick={(event) => handleEyeIconClick(event, basket, sharereq)}
              >
                <Icon className="" name="eye" size={32} />
              </button>
            </div>
          </div>
        ))
        // ) : (
        // <p>No share request history available.</p>
      }
    </div>
  );
};

// Specific Modal Content for "درخواست سهم"
const ShareRequestModalContent = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new DateObject({ calendar: persian, locale: persian_fa });
    setCurrentDate(date.format("YYYY/MM/DD"));
  }, []);
  return (
    <div className="px-4 space-y-4">
      <div className="px-4 py-3 border border-gray-400">
        <label className="block mb-2">کل موجودی سبد (پرتفوی و نقد) :</label>
        <div className="flex items-center justify-between">
          <span></span>
          <div className="flex items-center">
            <input
              type="text"
              className="w-24 pl-2 text-center bg-gray-100 sm:w-32"
              value="۱۰۰۰۰۰۰"
              readOnly
            />
            <span className="mr-2">ریال</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border border-gray-400">
        <div className="flex items-center justify-between mb-4">
          <span>درصد توافق شده:</span>
          <div className="flex items-center">
            <input
              type="text"
              className="w-16 text-center bg-white sm:w-24"
              value="۳۰"
              readOnly
            />
            <span className="mr-2">درصد</span>
          </div>
        </div>

        <label className="block mb-2">مبلغ سهم سبد گردان:</label>
        <div className="flex items-center justify-between">
          <span></span>
          <div className="flex items-center">
            <input
              type="text"
              className="w-24 text-center bg-white sm:w-32"
              value="۱۰۰۰۰۰۰"
              readOnly
            />
            <span className="mr-2">ریال</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border border-gray-400">
        <label className="block mb-2">مبلغ درخواست شده:</label>
        <div className="flex items-center justify-between mb-4">
          <span></span>
          <div className="flex items-center">
            <input
              type="text"
              className="w-24 text-center bg-gray-100 sm:w-32"
              value="۱۰۰۰۰۰"
              readOnly
            />
            <span className="mr-2">ریال</span>
          </div>
        </div>
        <label className="block mb-2">مبلغ باقیمانده:</label>
        <div className="flex items-center justify-between">
          <span></span>
          <div className="flex items-center">
            <input
              type="text"
              className="w-24 text-center bg-gray-100 sm:w-32"
              value="۱۰۰۰۰۰۰"
              readOnly
            />
            <span className="mr-2">ریال</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between px-6 sm:flex-row">
        <span className="mb-2 sm:mb-0">تاریخ:</span>
        <div className="w-full sm:w-auto">
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            format="YYYY/MM/DD"
            inputClass="w-full sm:w-auto border text-left cursor-pointer"
            containerClassName="w-full sm:w-auto "
            value={currentDate}
            onChange={setCurrentDate}
            render={(value, openCalendar) => {
              return (
                <div
                  onClick={openCalendar}
                  className="flex items-center justify-between p-2 bg-white border cursor-pointer"
                >
                  <span>{value}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              );
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="p-2 text-white bg-[#1BBF89] sm:w-auto">
          ثبت درخواست سهم
        </button>
      </div>
    </div>
  );
};

const ConfirmedPortfolioShareRequestModalContent = ({ onClose }) => (
  <div className="px-8 space-y-8">
    <div className="flex justify-between">
      <label className="">کل موجودی:</label>
      <span className="">۱۰۰۰۰۰۰۰۰۰</span>
      <span className="mr-2">ریال</span>
    </div>
    <div className="flex justify-between">
      <label className="">درصد توافقی:</label>
      <span className="">۳۰</span>
      <span className="mr-2">درصد</span>
    </div>
    <div className="flex justify-between">
      <label className="">مبلغ سهم:</label>
      <span className="">۱۰۰۰۰۰۰۰۰۰۰</span>
      <span className="mr-2">ریال</span>
    </div>
    <div className="flex justify-between">
      <label className="">مبلغ درخواستی:</label>
      <span className="">۱۰۰۰۰۰۰</span>
      <span className="mr-2">ریال</span>
    </div>
    <div className="flex justify-between">
      <label className="">مبلغ باقیمانده:</label>
      <span className="">۱۰۰۰۰۰۰۰</span>
      <span className="mr-2">ریال</span>
    </div>
    <div className="flex justify-between">
      <label className="">تاریخ:</label>
      <span>۱۳۹۸/۰۳/۰۴</span>
      <span className="mr-2"></span>
    </div>
    <div className="flex justify-center">
      <button
        onClick={onClose}
        className="flex px-4 font-bold text-black border border-gray-300"
      >
        بازگشت
      </button>
    </div>
  </div>
);

// New Modal Content for "ثبت سند واریز سبد"
const DepositDocumentModalContent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="flex items-center justify-center bg-white border-2 border-gray-300 h-36 w-52">
          {selectedFile ? (
            <img
              src={selectedFile}
              alt="Selected Document"
              className="object-contain w-full h-full"
            />
          ) : (
            <span className="text-gray-400">آپلود سند ...</span>
          )}
        </div>
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="flex justify-center">
        <button
          className="px-2 py-1  bg-[#5D9CEC] font-bold"
          onClick={() => document.getElementById("fileInput").click()}
        >
          انتخاب سند
        </button>
      </div>

      <div className="flex justify-center">
        <div className="">
          <textarea
            className="p-2 border border-gray-300 "
            placeholder="نوشتن توضیحات..."
            rows="2"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="px-4 py-1 font-bold  bg-[#1BBF89]">
          ثبت ثانویه
        </button>
      </div>
    </div>
  );
};

const RejectedBasketModalContent = ({ basketNumber, onClose }) => (
  <div className="">
    <div className="px-8 space-y-6">
      <div className="flex justify-between">
        <span>مبلغ:</span>
        <span className="text-center">۱۰۰۰۰۰۰</span>
        <span className="">ریال</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ:</span>
        <span className="text-center">۱۳۹۹/۰۹/۲۱</span>
        <span className="text-gray-100">ریال</span>
      </div>
      <div className="flex justify-between">
        <span>واریز به صورت مستقیم</span>
        <span></span>
        <span></span>
      </div>
      <div>
        <div className="flex justify-between">
          <span>پیام سرمایه گذار :</span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <span>علت رد</span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <span>پیام سبد گردان :</span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-10">
      <button
        onClick={onClose}
        className="px-4 font-bold border border-gray-300"
      >
        بازگشت
      </button>
    </div>
  </div>
);

const PortfolioManagerPaymentRequest = () => {
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

  const [selectedBasket, setSelectedBasket] = useState(null);

  const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);

  //درخواست سهم توسط سبدگردان
  const [isShareRequestModalVisible, setShareRequestModalVisible] =
    useState(false);

  const [
    isConfirmedPortfolioShareRequestModalVisible,
    setConfirmedPortfolioShareRequestModalVisible,
  ] = useState(false);

  const [isDepositDocumentModalVisible, setDepositDocumentModalVisible] =
    useState(false);

  const [isRejectedBasketModalVisible, setRejectedBasketModalVisible] =
    useState(false);
  const [sharereq, setSharereq] = useState();

  const handleBasketClick = (basket) => {
    setSelectedBasket(basket);
  };

  const handleEyeIconClick = (event, basket, sharereq) => {
    event.stopPropagation();

    if (sharereq.shareRequestStatus === "رد") {
      setSelectedBasket(basket);
      setSharereq(sharereq);
      setRejectedBasketModalVisible(true);
    } else if (sharereq.shareRequestStatus === "انجام شده") {
      setSelectedBasket(basket);
      setSharereq(sharereq);
      setConfirmedPortfolioShareRequestModalVisible(true);
    } else if (sharereq.shareRequestStatus === "در انتظار سند واریز") {
      setSelectedBasket(basket);
      setSharereq(sharereq);
      setDepositDocumentModalVisible(true);
    }
  };

  const handleTransactionIconClick = (basket, event) => {
    console.log("basket: ", basket);
    event.stopPropagation(); // Prevent the basket click event from firing
    setSelectedBasket(basket);
    setHistoryModalVisible(true);
  };

  const handleDollarBagIconClick = (basket, event) => {
    console.log("basket: ", basket);
    event.stopPropagation(); // Prevent the basket click event from firing
    setSelectedBasket(basket);
    setShareRequestModalVisible(true);
  };
  const handleCloseHistoryModal = () => {
    setHistoryModalVisible(false);
    setSelectedBasket(null);
  };

  const handleCloseShareRequestModal = () => {
    setShareRequestModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseConfirmedPortfolioShareRequestModal = () => {
    setConfirmedPortfolioShareRequestModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseDepositDocumentModal = () => {
    setDepositDocumentModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseRejectedBasketModal = () => {
    setRejectedBasketModalVisible(false);
    // setSelectedBasket(null);
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
        <span className="font-bold">درخواست سهم سبدگردانی</span>
      </div>
      {baskets.map((basket) => (
        <div
          key={basket.id}
          className="p-4 mb-2 mx-2 bg-[#1BBF89] shadow-md cursor-pointer"
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
              <Icon className="mx-2" name="messages2" size={32} />
              <Icon className="mx-2" name="call" size={32} />
              <Icon className="mx-2" name="eye" size={32} />
              <button
                onClick={(event) => handleTransactionIconClick(basket, event)}
              >
                <Icon className="mx-2" name="transactionicon" size={32} />
              </button>
              <button
                onClick={(event) => handleDollarBagIconClick(basket, event)}
              >
                <Icon className="mx-2" name="dollarbag" size={32} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Render all Modals */}
      <Modal
        isVisible={isHistoryModalVisible}
        onClose={handleCloseHistoryModal}
        title={`تاریخچه ی سبد (${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <HistoryModalContent
          basket={selectedBasket}
          handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>

      <Modal
        isVisible={isShareRequestModalVisible}
        onClose={handleCloseShareRequestModal}
        title={`درخواست سهم از سبد (${selectedBasket?.contractNumber || ""})`}
      >
        <ShareRequestModalContent />
      </Modal>

      <Modal
        isVisible={isConfirmedPortfolioShareRequestModalVisible}
        onClose={handleCloseConfirmedPortfolioShareRequestModal}
        title={`درخواست سهم از سبد (تایید شده) (${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <ConfirmedPortfolioShareRequestModalContent
          onClose={handleCloseConfirmedPortfolioShareRequestModal}
        />
      </Modal>
      <Modal
        isVisible={isDepositDocumentModalVisible}
        onClose={handleCloseDepositDocumentModal}
        title={`ثبت سند واریز سبد (${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <DepositDocumentModalContent />
      </Modal>
      <Modal
        isVisible={isRejectedBasketModalVisible}
        onClose={handleCloseRejectedBasketModal}
        title={`شماره سبد (رد شده) (${selectedBasket?.contractNumber || ""})`}
      >
        <RejectedBasketModalContent
          onClose={handleCloseRejectedBasketModal}
          basketNumber={selectedBasket?.contractNumber}
        />
      </Modal>
    </div>
  );
};

export default PortfolioManagerPaymentRequest;
