import React, { useState, useContext } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import AppContext from "../../contexts/AppContext";

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
    case "در انتظار ارسال سند واریز":
      return "bg-[#5D9CEC]";
    case "انجام شده":
      return "bg-[#1BBF89]";
    case "رد":
      return "bg-[#DB524B]";
    default:
      return "bg-gray-300";
  }
};

const IncreaseCapitalHistoryModal = ({ basket, handleEyeIconClick }) => (
  <div className="">
    {basket.increaseCapitalHistory.map((incaptreq, index) => (
      <div
        key={index}
        className={`p-4 mb-1 ${getStatusColor(
          incaptreq.increaseCapitalStatus
        )}`}
      >
        <div className="flex justify-between mb-1">
          <span className="font-bold">وضعیت:</span>
          <span>{incaptreq.increaseCapitalStatus}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">تاریخ:</span> {incaptreq.date}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">
            {incaptreq.directIncreaseCapital
              ? "واریز مستقیم"
              : "واریز به حساب کارگزاری"}
          </span>
          <button
            onClick={(event) => handleEyeIconClick(event, basket, incaptreq)}
          >
            <Icon className="mx-2" name="eye" size={32} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const RequestIncreaseCapitalModal = ({ basket, handleEyeIconClick }) => (
  <div className="p-4">
    <div className="flex items-center justify-between mb-4"></div>
    <div className="mb-4">
      <div className="mb-2">مبلغ:</div>
      <div className="flex items-center">
        <input
          // onChange={setCapital}
          type="text"
          value="۱۰۰۰۰۰۰۰"
          className="w-full p-1 text-left border border-gray-300"
          // readOnly
        />
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="mb-4">
      <div className="mb-2">تاریخ:</div>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        // value={startDate}
        // onChange={setStartDate}
        format="YYYY/MM/DD"
        inputClass="sm:flex-1 p-1 border text-left cursor-pointer"
        containerClassName="w-full sm:flex-1"
      />
    </div>
    <div className="space-y-2">
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        <span className="mr-1">واریز به‌صورت مستقیم</span>
      </div>
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        <span className="mr-1">واریز به حساب کارگزاری</span>
      </div>
    </div>
    <div className="flex justify-center">
      <button className="px-2 py-1 mt-4 bg-[#1BBF89]">
        ثبت درخواست افزایش سرمایه
      </button>
    </div>
  </div>
);

const RejectedIncreaseCapitalModal = ({
  basket,
  handleEyeIconClick,
  onClose,
}) => (
  <div className="px-8">
    <div className="mb-4 space-y-2">
      <div className="flex items-center space-y-3">
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
      <div>علت رد:</div>
      <div>پیام سبدگردان :</div>
      <div>سند واریز:</div>
    </div>
    <div className="flex justify-center">
      <div className="w-48 h-48 p-4 mb-4 bg-white border-2 border-gray-300"></div>
    </div>
    <div className="flex justify-center">
      <button onClick={onClose} className="px-4 py-1 font-bold bg-white border">
        بازگشت
      </button>
    </div>
  </div>
);

const ConfirmedIncreaseCapitalModal = ({
  basket,
  handleEyeIconClick,
  onClose,
}) => (
  <div className="px-8">
    <div className="mb-4 space-y-4">
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
      <div>پیام سبدگردان :</div>
      <div>سند واریز:</div>
    </div>
    <div className="flex justify-center">
      <div className="w-48 h-48 p-4 mb-4 bg-white border-2 border-gray-300"></div>
    </div>
    <div className="flex justify-center">
      <button onClick={onClose} className="px-4 py-1 font-bold bg-white border">
        بازگشت
      </button>
    </div>
  </div>
);

const UploadIncreaseCapitalDocumentModal = ({ basket, handleEyeIconClick }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4"></div>
      <div className="mb-4">
        <div className="flex justify-center">
          <div className="flex items-center justify-center p-4 border-2 border-gray-300 w-44 h-44">
            {selectedFile ? (
              <div>{selectedFile.name}</div>
            ) : (
              <div className="text-gray-400">سندی انتخاب نشده</div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-1">
          <label className="px-2 py-1 text-white bg-[#5D9CEC] cursor-pointer">
            انتخاب سند
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
      <div className="mb-4">
        {/* <div className="mb-2">نوشتن توضیحات...</div> */}
        <textarea
          placeholder="نوشتن توضیحات..."
          className="w-full h-20 p-2 border border-gray-300 rounded resize-none"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button className="px-4 py-1 bg-[#1BBF89]">ثبت</button>
      </div>
    </div>
  );
};

const InvestorIncreaseCapital = () => {
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
    red,
    blue,
    green,
    orange,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const [selectedBasket, setSelectedBasket] = useState(null);
  const [incaptreq, setIncaptreq] = useState();
  const [
    isIncreaseCapitalHistoryModalVisible,
    setIncreaseCapitalHistoryModalVisible,
  ] = useState(false);

  const [
    isRequestIncreaseCapitalModalVisible,
    setRequestIncreaseCapitalModalVisible,
  ] = useState(false);

  const [
    isRejectedIncreaseCapitalModalVisible,
    setRejectedIncreaseCapitalModalVisible,
  ] = useState(false);
  const [
    isConfirmedIncreaseCapitalModalVisible,
    setConfirmedIncreaseCapitalModalVisible,
  ] = useState(false);
  const [
    isUploadIncreaseCapitalDocumentModalVisible,
    setUploadIncreaseCapitalDocumentModalVisible,
  ] = useState(false);

  const handleEyeIconClick = (event, basket, incaptreq) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setIncaptreq(incaptreq);
    if (incaptreq.increaseCapitalStatus === "رد") {
      setRejectedIncreaseCapitalModalVisible(true);
    } else if (incaptreq.increaseCapitalStatus === "انجام شده") {
      setConfirmedIncreaseCapitalModalVisible(true);
    } else if (
      incaptreq.increaseCapitalStatus === "در انتظار ارسال سند واریز"
    ) {
      setUploadIncreaseCapitalDocumentModalVisible(true);
    }
  };

  const closeRejectedIncreaseCapitalModal = () => {
    setRejectedIncreaseCapitalModalVisible(false);
  };

  const closeConfirmedIncreaseCapitalModalModal = () => {
    setConfirmedIncreaseCapitalModalVisible(false);
  };

  const closeUploadIncreaseCapitalDocumentModal = () => {
    setUploadIncreaseCapitalDocumentModalVisible(false);
  };

  const showIncreaseCapitalHistoryModal = (event, basket) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setIncreaseCapitalHistoryModalVisible(true);
  };

  const closeIncreaseCapitalHistoryModal = () => {
    setIncreaseCapitalHistoryModalVisible(false);
  };

  const showIncreaseCapitalRequest = (event, basket) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setRequestIncreaseCapitalModalVisible(true);
  };

  const closeIncreaseCapitalRequest = () => {
    setRequestIncreaseCapitalModalVisible(false);
  };

  return (
    <div className="items-center justify-start p-4">
      <div className="flex py-4">
        <button
          onClick={handleNavigate}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <Icon name="arrowright" size={16} className="ml-2" />
        </button>
        <span className="font-bold">افزایش سرمایه</span>
      </div>
      {baskets.map((basket) => (
        <div
          key={basket.id}
          className={`p-4 my-2 bg-${green} cursor-pointer`}
          onClick={""}
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
                  showIncreaseCapitalHistoryModal(event, basket)
                }
              >
                <Icon className="mx-2" name="dollar" size={32} />
              </button>
              <button
                onClick={(event) => showIncreaseCapitalRequest(event, basket)}
              >
                <Icon className="mx-2" name="capital" size={32} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <Modal
        isVisible={isIncreaseCapitalHistoryModalVisible}
        onClose={closeIncreaseCapitalHistoryModal}
        title={`افزایش سرمایه`}
      >
        <IncreaseCapitalHistoryModal
          basket={selectedBasket}
          handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
      <Modal
        isVisible={isRequestIncreaseCapitalModalVisible}
        onClose={closeIncreaseCapitalRequest}
        title={`درخواست افزایش سرمایه`}
      >
        <RequestIncreaseCapitalModal
          basket={selectedBasket}
          handleEyeIconClick={"handleEyeIconClick"}
        />
      </Modal>
      <Modal
        isVisible={isRejectedIncreaseCapitalModalVisible}
        onClose={closeRejectedIncreaseCapitalModal}
        title={` رد شده`}
      >
        <RejectedIncreaseCapitalModal
          basket={selectedBasket}
          onClose={closeRejectedIncreaseCapitalModal}
          // handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
      <Modal
        isVisible={isConfirmedIncreaseCapitalModalVisible}
        onClose={closeConfirmedIncreaseCapitalModalModal}
        title={`${selectedBasket?.contractNumber} (تایید شده)`}
      >
        <ConfirmedIncreaseCapitalModal
          basket={selectedBasket}
          onClose={closeConfirmedIncreaseCapitalModalModal}
          // handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
      <Modal
        isVisible={isUploadIncreaseCapitalDocumentModalVisible}
        onClose={closeUploadIncreaseCapitalDocumentModal}
        title={` درخواست سند `}
      >
        <UploadIncreaseCapitalDocumentModal
          basket={selectedBasket}
          // handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
    </div>
  );
};

export default InvestorIncreaseCapital;
