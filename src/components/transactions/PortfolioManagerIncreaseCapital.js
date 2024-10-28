import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";
import AppContext from "../../contexts/AppContext";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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

const RequestIncreaseCapitalModal = ({
  basket,
  handleConfirm,
  handleReject,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date.toDate());
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4"></div>
      <div className="flex mb-4">
        <div className="mb-2">مبلغ:</div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            value="۱۰۰۰۰۰۰"
            className="p-1 text-left bg-gray-100"
            readOnly
          />
          <span className="mr-2">ریال</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex mb-4">
          <div className="mb-2">تاریخ:</div>
          <div className="flex items-center justify-center">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={selectedDate}
              onChange={handleDateChange}
              format="YYYY/MM/DD"
              inputClass="p-1 text-left bg-gray-100"
              containerClassName=""
            />
            {/* </div> */}
            <span className="mr-2 text-gray-100">ریال</span>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4 space-y-2">
        <div className="">
          {" "}
          <div className="flex items-center">
            {/* <input type="radio" name="depositMethod" className="mr-2" /> */}
            <span className="">واریز به‌صورت مستقیم</span>
          </div>
          <div className="flex items-center">
            {/* <input type="radio" name="depositMethod" className="mr-2" /> */}
            <span className="">واریز به حساب کارگزاری</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-16">
        <button
          onClick={handleConfirm}
          className="w-24 px-4 py-1 text-white bg-[#1BBF89]"
        >
          تایید
        </button>
        <button
          onClick={handleReject}
          className="w-24 px-4 py-1 text-white bg-[#DB524B]"
        >
          رد
        </button>
      </div>
    </div>
  );
};

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

const UploadIncreaseCapitalDocumentModal = ({ basket, handleEyeIconClick }) => (
  <div className="px-4">
    <div className="flex items-center justify-between mb-4">
      {/* <div className="text-xl text-blue-500">
        بررسی سند واریز سبد (شماره سبد)
      </div>
      <div className="text-2xl text-blue-500">&gt;</div> */}
    </div>
    <div className="flex justify-center mb-4">
      <div className="w-40 h-40 p-4 bg-white border-2 border-gray-300"></div>
    </div>
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="نوشتن توضیحات..."
        className="p-2 border border-gray-300"
      />
    </div>
    <div className="flex justify-around mt-8">
      <button className="w-24 px-4 py-1 bg-[#1BBF89]">تایید</button>
      <button className="w-24 px-4 py-1 bg-[#DB524B]">رد</button>
    </div>
  </div>
);

const ConfirmingIncreaseCapitalModal = () => (
  <div className="px-8">
    <div className="flex items-center justify-between mb-4"></div>
    <div className="mb-4 space-y-2">
      <div className="flex items-center">
        <input type="radio" name="approvalOption" className="ml-2" />
        <span>لطفا سند واریز وجه را بارگزاری کنید.</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="approvalOption" className="ml-2" />
        <span>نیازی به اسکن سند واریز نیست.</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="approvalOption" className="ml-2" />
        <span>
          این سری تایید می‌شود ولی بهتر است برای سری‌های بعد قبل از تصمیم هماهنگ
          کنید.
        </span>
      </div>
    </div>
    <div className="mb-4">
      {/* <div className="mb-2">متن خطاب به سرمایه‌گذار</div> */}
      <textarea
        placeholder="متن خطاب به سرمایه‌گذار"
        className="w-full h-24 p-2 border border-gray-300 rounded resize-none"
      ></textarea>
    </div>
    <div className="flex justify-center">
      <button className="px-2 py-1 bg-[#1BBF89]">تایید درخواست</button>
    </div>
  </div>
);

const RejectingIncreaseCapitalModal = () => (
  <div className="px-6">
    <div className="flex items-center justify-between mb-4"></div>
    <div className="mb-4 space-y-2">
      <div className="flex items-center">
        <input type="radio" name="rejectionReason" className="ml-2" />
        <span>باتوجه به روند بازار زمان مناسبی جهت افزایش سرمایه نیست.</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="rejectionReason" className="ml-2" />
        <span>مبلغ سرمایه زیاد است (ریسک بالایی دارد).</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="rejectionReason" className="ml-2" />
        <span>تاریخ صحیح نیست.</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="rejectionReason" className="ml-2" />
        <span>سایر دلایل</span>
      </div>
    </div>
    <div className="mb-4">
      <div className="mb-2">نوشتن توضیحات...</div>
      <textarea className="w-full h-24 p-2 border border-gray-300 rounded resize-none"></textarea>
    </div>
    <div className="flex justify-center">
      <button className="px-4 py-1 bg-[#DB524B]">رد</button>
    </div>
  </div>
);

const PortfolioManagerIncreaseCapital = () => {
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
    green,
    red,
    blue,
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

  const [isConfirmingModalVisible, setConfirmingModalVisible] = useState(false);
  const [isRejectingModalVisible, setRejectingModalVisible] = useState(false);

  const handleEyeIconClick = (event, basket, incaptreq) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setIncaptreq(incaptreq);
    if (incaptreq.increaseCapitalStatus === "رد") {
      setRejectedIncreaseCapitalModalVisible(true);
    } else if (incaptreq.increaseCapitalStatus === "انجام شده") {
      setConfirmedIncreaseCapitalModalVisible(true);
    } else if (incaptreq.increaseCapitalStatus === "در انتظار تایید") {
      setRequestIncreaseCapitalModalVisible(true);
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

  const closeRequestIncreaseCapitalModal = () => {
    setRequestIncreaseCapitalModalVisible(false);
  };
  const showIncreaseCapitalHistoryModal = (event, basket) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setIncreaseCapitalHistoryModalVisible(true);
  };

  const closeIncreaseCapitalHistoryModal = () => {
    setIncreaseCapitalHistoryModalVisible(false);
  };

  const handleConfirmIncreaseCapital = () => {
    setRequestIncreaseCapitalModalVisible(false);
    setConfirmingModalVisible(true);
  };

  const handleRejectIncreaseCapital = () => {
    setRequestIncreaseCapitalModalVisible(false);
    setRejectingModalVisible(true);
  };

  const closeConfirmingModal = () => {
    setConfirmingModalVisible(false);
  };

  const closeRejectingModal = () => {
    setRejectingModalVisible(false);
  };

  return (
    <div className="items-center justify-center p-4 ">
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
              {/* <button onClick={""}>
                <Icon className="mx-2" name="capital" size={32} />
              </button> */}
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
        isVisible={isRejectedIncreaseCapitalModalVisible}
        onClose={closeRejectedIncreaseCapitalModal}
        title={` رد شده`}
      >
        <RejectedIncreaseCapitalModal
          basket={selectedBasket}
          onClose={closeRejectedIncreaseCapitalModal}
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
        />
      </Modal>
      <Modal
        isVisible={isUploadIncreaseCapitalDocumentModalVisible}
        onClose={closeUploadIncreaseCapitalDocumentModal}
        title={`بررسی سند واریز شده (${selectedBasket?.contractNumber})`}
      >
        <UploadIncreaseCapitalDocumentModal
          basket={selectedBasket}
          // handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
      <Modal
        isVisible={isRequestIncreaseCapitalModalVisible}
        onClose={closeRequestIncreaseCapitalModal}
        title={` درخواست سند `}
      >
        <RequestIncreaseCapitalModal
          basket={selectedBasket}
          handleConfirm={handleConfirmIncreaseCapital}
          handleReject={handleRejectIncreaseCapital}
        />
      </Modal>
      <Modal
        isVisible={isConfirmingModalVisible}
        onClose={closeConfirmingModal}
        title={`تایید افزایش سرمایه`}
      >
        <ConfirmingIncreaseCapitalModal />
      </Modal>

      <Modal
        isVisible={isRejectingModalVisible}
        onClose={closeRejectingModal}
        title={`رد افزایش سرمایه`}
      >
        <RejectingIncreaseCapitalModal />
      </Modal>
    </div>
  );
};

export default PortfolioManagerIncreaseCapital;
