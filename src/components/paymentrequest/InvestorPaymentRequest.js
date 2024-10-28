import React, { useState, useContext, useEffect } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import AppContext from "../../contexts/AppContext";
import DateObject from "react-date-object";

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
  return (
    <div>
      {basket.shareRequestHistory.map((sharereq, index) => (
        <div
          key={index}
          className={`p-4 my-1 ${getStatusColor(sharereq.shareRequestStatus)}`}
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
      ))}
    </div>
  );
};

const ShareRequestModalContent = ({
  handleButtonConfirmSharerequestClick,
  handleButtonRejectSharerequestClick,
  basket,
}) => {
  const handleRejectShareRequestClick = () => {
    handleButtonRejectSharerequestClick(basket);
  };
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new DateObject({ calendar: persian, locale: persian_fa });
    setCurrentDate(date.format("YYYY/MM/DD"));
  }, []);

  return (
    <div className="px-2 space-y-1 sm:px-6">
      <div className="px-2 py-3 border border-gray-400 sm:px-6">
        <label className="block mb-2">کل موجودی سبد (پرتفوی و نقد) :</label>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <span></span>
          <div className="flex items-center w-full sm:w-auto">
            <input
              type="text"
              className="w-full p-2 bg-white text-end sm:w-auto"
              value="۱۰۰۰۰۰۰۰"
              readOnly
            />
            <span className="p-2">ریال</span>
          </div>
        </div>
      </div>
      <div className="px-2 py-3 border border-gray-400 sm:px-6">
        <div className="flex flex-col items-center justify-between mb-1 sm:flex-row">
          <label className="mb-2 sm:mb-0">درصد توافق شده:</label>
          <div className="flex items-center w-full sm:w-auto">
            <input
              type="text"
              className="w-full p-2 bg-gray-100 text-end sm:w-auto"
              value="۳۰"
              readOnly
            />
            <span className="py-2 mr-2">درصد</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <label className="block mb-2">مبلغ سهم سبد گردان:</label>
          <div className="flex items-center justify-end">
            <input
              type="text"
              className="w-full p-2 bg-gray-100 text-end sm:w-auto"
              value="۱۰۰۰۰۰۰۰"
              readOnly
            />
            <span className="p-2">ریال</span>
          </div>
        </div>
      </div>
      <div className="px-2 py-3 border border-gray-400 sm:px-6">
        <label className="block mb-2">مبلغ درخواست شده:</label>
        <div className="flex items-center justify-end">
          <span></span>
          <input
            type="text"
            className="w-full p-2 bg-gray-100 text-end sm:w-auto"
            value="۱۰۰۰۰۰۰"
            readOnly
          />
          <span className="p-2">ریال</span>
        </div>

        <label className="block mt-4 mb-2">مبلغ باقیمانده:</label>
        <div className="flex items-center justify-end">
          <span></span>
          <input
            type="text"
            className="w-full p-2 bg-gray-100 text-end sm:w-auto"
            value="۱۰۰۰۰۰"
            readOnly
          />
          <span className="p-2">ریال</span>
        </div>
      </div>

      <div className="px-2 py-3 sm:px-6">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <label className="mb-2 sm:mb-0">تاریخ:</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            format="YYYY/MM/DD"
            inputClass="w-full sm:w-auto border text-left cursor-pointer"
            containerClassName="w-full sm:w-auto"
            value={currentDate}
            onChange={setCurrentDate}
            render={(value, openCalendar) => {
              return (
                <div
                  onClick={openCalendar}
                  className="flex items-center justify-between w-full p-2 bg-white border cursor-pointer sm:w-auto"
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
      <div className="flex flex-col justify-around mt-4 sm:flex-row">
        <button
          onClick={() => handleButtonConfirmSharerequestClick(basket)}
          className="w-full px-6 py-1 mb-2 text-white bg-green-500 sm:mb-0 sm:w-auto"
        >
          تایید
        </button>
        <button
          onClick={handleRejectShareRequestClick}
          className="w-full px-6 py-1 text-white bg-red-500 sm:w-auto"
        >
          رد
        </button>
      </div>
    </div>
  );
};
//
const ConfirmShareRequestModalContent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [text, setText] = useState("");

  return (
    <div className="px-8 py-4 space-y-4">
      <div className="space-y-2">
        <label className="flex items-center text-right">
          <input
            type="radio"
            name="requestOption"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="ml-2"
          />
          تشکر از زحمات جنابعالی، نقدی واریز میکنم، نیازی به نند کردن سهم ندارم.
        </label>
        <label className="flex items-center text-right">
          <input
            type="radio"
            name="requestOption"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="ml-2"
          />
          تشکر از زحمات جنابعالی، لطفا جهت واریز مبلغ را از سبد نقد کنید.
        </label>
      </div>
      <textarea
        type="text"
        placeholder="متن خطاب به سیدگردان"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 text-right border border-gray-300"
      />
      <div className="flex justify-center">
        <button
          onClick={() =>
            console.log("تایید اولیه درخواست", selectedOption, text)
          }
          className="px-2 py-1 text-white bg-[#1BBF89]"
        >
          تایید اولیه درخواست
        </button>
      </div>
    </div>
  );
};

//Modal Component for Share Document
const ShareDocumentModalContent = () => {
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
          {/* <label className="flex items-center text-right">
            <input
              type="radio"
              name="requestOption"
              value="option1"
              // checked={selectedOption === "option1"}
              // onChange={(e) => setSelectedOption(e.target.value)}
              className="ml-2"
            />
            مبلع جهت واریز درخواست شد
          </label> */}

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

const RejectRequestshare = () => {
  return (
    <div className="px-8 py-2 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center">
          <input type="radio" id="option1" name="reason" className="ml-2" />
          <label htmlFor="option1" className="text-right">
            ضمن پوزش، اکنون امکان واریز سهم مشارکت مقدور نیست.
          </label>
        </div>
        <div className="flex items-center">
          <input type="radio" id="option2" name="reason" className="ml-2" />
          <label htmlFor="option2" className="text-right">
            لطفا جهت اطمینان، رمز عبور را ارسال کرده سپس مجددا درخواست دهید.
          </label>
        </div>
        <div className="flex items-center">
          <input type="radio" id="option3" name="reason" className="ml-2" />
          <label htmlFor="option3" className="text-right">
            تاریخ خارج از قرارداد است.
          </label>
        </div>
        <div className="flex items-center">
          <input type="radio" id="option4" name="reason" className="ml-2" />
          <label htmlFor="option4" className="text-right">
            سایر دلایل
          </label>
        </div>
        <textarea
          className="w-full p-2 border border-gray-300"
          placeholder="نوشتن توضیحات..."
          rows="2"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button className="px-6 py-1 font-bold bg-[#DB524B]">رد</button>
      </div>
    </div>
  );
};

// Modal Content for "درخواست سهم از سبد (تایید شده)"
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

// Modal Content for "رد شده" (Rejected) basket
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

const InvestorPaymentRequest = () => {
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Assume screen width less than 640px is considered small
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCallClick = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      if (isSmallScreen) {
        alert("دستگاه شما قابلیت تماس تلفنی را ندارد.");
      } else {
        Modal({
          title: "خطا",
          message:
            "متأسفانه دستگاه شما قابلیت تماس تلفنی را ندارد. لطفاً از طریق سایر راه‌های ارتباطی با ما در تماس باشید.",
        });
      }
    }
  };

  const handleMessageClick = (phoneNumber, message) => {
    if (phoneNumber) {
      window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(
        message
      )}`;
    } else {
      if (isSmallScreen) {
        alert("دستگاه شما قابلیت ارسال اس ام اس را ندارد.");
      } else {
        Modal({
          title: "خطا",
          message:
            "متأسفانه دستگاه شما قابلیت اشتراک‌گذاری اس ام اس را ندارد. لطفاً از طریق سایر راه‌های ارتباطی با ما در تماس باشید.",
        });
      }
    }
  };

  const [selectedBasket, setSelectedBasket] = useState(null);
  const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);
  const [isShareRequestModalVisible, setShareRequestModalVisible] =
    useState(false);
  const [
    isConfirmShareRequestModalVisible,
    setConfirmShareRequestModalVisible,
  ] = useState(false);
  const [isShareDocumentModalVisible, setShareDocumentModalVisible] =
    useState(false);
  const [
    isConfirmedPortfolioShareRequestModalVisible,
    setConfirmedPortfolioShareRequestModalVisible,
  ] = useState(false);
  const [isRejectedBasketModalVisible, setRejectedBasketModalVisible] =
    useState(false);
  const [isRejectRequestshareisible, setRejectRequestshareisible] =
    useState(false);
  const [sharereq, setSharereq] = useState();

  const handleBasketClick = (basket) => {
    // Reset all modal visibility states to false
    setHistoryModalVisible(false);
    setShareRequestModalVisible(false);
    setConfirmShareRequestModalVisible(false);
    setShareDocumentModalVisible(false);
    setConfirmedPortfolioShareRequestModalVisible(false);
    setRejectedBasketModalVisible(false);
    setRejectRequestshareisible(false);
    setSelectedBasket(basket);
  };

  const handleEyeIconClick = (event, basket, sharereq) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setSharereq(sharereq);
    if (sharereq.shareRequestStatus === "رد") {
      setRejectedBasketModalVisible(true);
    } else if (sharereq.shareRequestStatus === "انجام شده") {
      setConfirmedPortfolioShareRequestModalVisible(true);
    } else if (sharereq.shareRequestStatus === "در انتظار تایید") {
      setShareRequestModalVisible(true);
    } else if (sharereq.shareRequestStatus === "در انتظار سند واریز") {
      setShareDocumentModalVisible(true);
    }
  };

  const handleTransactionIconClick = (basket, event) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setHistoryModalVisible(true);
  };

  const handleButtonConfirmSharerequestClick = (basket) => {
    setSelectedBasket(basket);
    setConfirmShareRequestModalVisible(true);
  };

  const handleButtonRejectSharerequestClick = (basket) => {
    setSelectedBasket(basket);
    setRejectRequestshareisible(true);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseShareRequestModal = () => {
    setShareRequestModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseConfirmShareRequestModal = () => {
    setConfirmShareRequestModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseShareDocumentModal = () => {
    setShareDocumentModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseRejectedBasketModal = () => {
    setRejectedBasketModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseConfirmedPortfolioShareRequestModal = () => {
    setConfirmedPortfolioShareRequestModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseRejectRequestshare = () => {
    setRejectRequestshareisible(false);
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
          className="p-4 mb-4 bg-[#1BBF89] shadow-md cursor-pointer"
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
              <button onClick={() => handleMessageClick("0912")}>
                <Icon className="mx-2" name="messages2" size={32} />
              </button>
              <button onClick={() => handleCallClick("0912")}>
                <Icon className="mx-2" name="call" size={32} />
              </button>
              <Icon className="mx-2" name="eye" size={32} />
              <button
                onClick={(event) => handleTransactionIconClick(basket, event)}
              >
                <Icon className="mx-2" name="transactionicon" size={32} />
              </button>
            </div>
          </div>
        </div>
      ))}

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
        title={`درخواست سهم از سبد(${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <ShareRequestModalContent
          handleButtonConfirmSharerequestClick={
            handleButtonConfirmSharerequestClick
          }
          handleButtonRejectSharerequestClick={
            handleButtonRejectSharerequestClick
          }
          basket={selectedBasket}
        />
      </Modal>

      <Modal
        isVisible={isConfirmShareRequestModalVisible}
        onClose={handleCloseConfirmShareRequestModal}
        title={` تایید درخواست وجه (${
          selectedBasket?.investor || "شماره سبد"
        })`}
      >
        <ConfirmShareRequestModalContent />
      </Modal>
      <Modal
        isVisible={isShareDocumentModalVisible}
        onClose={handleCloseShareDocumentModal}
        title={`ثبت سند واریز برای ${"سبدگردان ۱ - سرمایه گذار ۱"}`}
      >
        <ShareDocumentModalContent />
      </Modal>
      <Modal
        isVisible={isConfirmedPortfolioShareRequestModalVisible}
        onClose={handleCloseConfirmedPortfolioShareRequestModal}
        title={`درخواست سهم از سبد (تایید شده)`}
      >
        <ConfirmedPortfolioShareRequestModalContent
          onClose={handleCloseConfirmedPortfolioShareRequestModal}
        />
      </Modal>
      <Modal
        isVisible={isRejectedBasketModalVisible}
        onClose={handleCloseRejectedBasketModal}
        title={`${selectedBasket?.contractNumber || ""} (رد شده)`}
      >
        <RejectedBasketModalContent
          basketNumber={selectedBasket?.contractNumber}
          onClose={handleCloseRejectedBasketModal}
        />
      </Modal>
      <Modal
        isVisible={isRejectRequestshareisible}
        onClose={() => handleCloseRejectRequestshare(false)}
        title="رد درخواست وجه نقد"
      >
        <RejectRequestshare />
      </Modal>
    </div>
  );
};

export default InvestorPaymentRequest;
