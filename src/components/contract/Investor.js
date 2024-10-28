import React, { useState, useContext, useRef, useEffect } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import AppContext from "../../contexts/AppContext";

const Investor = () => {
  const {
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
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [editReasons, setEditReasons] = useState({
    initialAmount: false,
    percentage: false,
    dates: false,
    personalInfo: false,
    otherReasons: false,
  });
  const [editNotes, setEditNotes] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [hasPreviousSignature, setHasPreviousSignature] = useState(false); // این باید بر اساس داده‌های بک‌اند تنظیم شود

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleRejectModal = () => {
    setShowRejectModal(!showRejectModal);
  };

  const toggleEditRequestModal = () => {
    setShowEditRequestModal(!showEditRequestModal);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const toggleSignatureModal = () => {
    setShowSignatureModal(!showSignatureModal);
  };

  const handleReasonChange = (reason) => {
    setEditReasons((prev) => ({ ...prev, [reason]: !prev[reason] }));
  };

  const handleEditRequest = (e) => {
    e.preventDefault();
    console.log("Edit Reasons:", editReasons);
    console.log("Edit Notes:", editNotes);
    toggleEditRequestModal();
  };

  const handleTermsAccept = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  const handleConfirmation = () => {
    if (hasPreviousSignature) {
      // ادامه با تایید نهایی
      console.log("قرارداد با امضای موجود تایید شد");
      toggleConfirmationModal();
    } else {
      toggleSignatureModal();
    }
  };

  const sigCanvas = useRef({});
  const sigContainerRef = useRef(null);

  useEffect(() => {
    if (sigContainerRef.current) {
      const width = sigContainerRef.current.offsetWidth;
      sigCanvas.current.width = width;
    }
  }, []);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleSignatureSubmit = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("لطفا امضای خود را وارد کنید");
    } else {
      const signatureData = sigCanvas.current.toDataURL();
      console.log("امضا ثبت شد:", signatureData);
      setHasPreviousSignature(true);
      toggleSignatureModal();
      console.log("قرارداد با امضای جدید تایید شد");
      toggleConfirmationModal();
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-start p-4 mb-2">
          <button
            onClick={handleNavigate}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <Icon name="arrowright" size={16} className="ml-2" />
          </button>
          <h2 className="text-lg font-semibold text-center">بستن قرارداد</h2>
        </div>
        <div className="w-full p-4 bg-gray-300 shadow-md">
        <div className="flex flex-col items-center mb-3 space-y-6">
  <div className="flex justify-center w-full sm:flex-row mb-4"> {/* Increased mb to 4 */}
    <div className="font-bold">شماره قرارداد:</div>
    <span className="mr-1 ml-4 font-semibold">۱۲۳۴۵۶</span>
  </div>

  <div className="flex justify-center w-full sm:flex-row mb-4"> {/* Increased mb to 4 */}
    <div className="font-medium">سرمایه گذار</div>
    <div className="font-medium ml-8">
      <span>تاریخ ثبت:</span>
      <span className="mr-1">۱۲۳۴/۱۲/۱۲</span>
    </div>
  </div>

  <div className="flex justify-center w-full sm:flex-row mb-4"> {/* Increased mb to 4 */}
    <div className="font-medium">سبد گردان</div>
                 <div className="font-medium ml-8">
      <span>تاریخ ویرایش:</span>
      <span className="mr-1">۱۲۳۴/۱۲/۱۲</span>
    </div>
  </div>

  <div className="flex justify-center w-full sm:flex-row mb-4"> 
    <div className="font-medium">وضعیت</div>
    <div className="font-medium ml-4">
      <span className="mr-1">پیش نویس</span>
    </div>
  </div>
</div>
          

          <div className="flex justify-center mb-3">
            <div className="border-2 border-gray-400">
              {" "}
              <button onClick={toggleModal} className="px-1">
                <Icon name="one" size={22} className="" />
              </button>
              <button className="px-1">
                <Icon name="messages2" size={22} className="" />
              </button>
              <button className="px-1">
                <Icon name="call" size={22} className="" />
              </button>
              <button className="px-1 ">
                <Icon name="eye" size={28} className="" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="flex w-full max-w-md">
              <button
                className="flex-1 text-black px-4 py-1 m-1 text-sm font-bold bg-[#F7AF3E] whitespace-nowrap"
                onClick={toggleEditRequestModal}
              >
                درخواست اصلاح
              </button>
              <button
                className="flex-1 text-black px-4 py-1 m-1 text-sm font-bold bg-[#DB524B] whitespace-nowrap"
                onClick={toggleRejectModal}
              >
                رد
              </button>
              <button
                className="flex-1 text-black px-4 py-1 m-1 text-sm font-bold bg-[#1BBF89] whitespace-nowrap"
                onClick={toggleConfirmationModal}
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing details */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-sm p-6 bg-white shadow-xl">
            <button
              onClick={toggleModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="flex justify-between pb-8">
              <div>
                {" "}
                <h2 className="mb-4 text-xl font-semibold">
                  اطلاعات سبدگردان:
                </h2>
                <div className="flex flex-col sm:flex-row">
                  <div className="flex flex-col space-y-2 text-right">
                    <div>
                      <span className="font-medium">نام و نام خانوادگی:</span>
                    </div>
                    <div>
                      <span className="font-medium">کد ملی:</span>
                    </div>
                    <div>
                      <span className="font-medium">شماره همراه:</span>
                    </div>
                    <div>
                      <span className="font-medium">
                  تاریخ عضویت در هم‌سبد:
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <img
                  alt=""
                  className="w-24 mt-4 bg-gray-300 h-28 sm:mt-0 sm:mr-auto"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button onClick={toggleModal} className="p-2">
                <Icon name="arrowright" size={16} className="text-gray-700" />
              </button>

              <button className="p-2">
                <Icon name="messages2" size={24} className="text-gray-700" />
              </button>
              <button className="p-2">
                <Icon name="call" size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for rejection */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-sm p-6 bg-white shadow-xl">
            <button
              onClick={toggleRejectModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="px-4 text-right">
              <h2 className="mb-4 text-xl font-semibold">علت رد:</h2>
              <form className="">
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>از سرمایه‌گذاری منصرف شدم.</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>سبدگردان دیگری انتخاب کردم.</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>میخواهم بعدا سرمایه‌گذاری کنم.</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>روی درصد توافق نکردیم.</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>سایر دلایل</span>
                  </label>
                </div>
                <textarea
                  className="w-full p-2 mt-4 border border-gray-300 rounded"
                  placeholder="نوشتن توضیحات..."
                />
                <div className="flex justify-around mt-4">
                  <button
                    type="button"
                    onClick={toggleRejectModal}
                    className="px-4 py-1 bg-[#5D9CEC]"
                  >
                    بازگشت
                  </button>
                  <button type="submit" className="px-4 py-1 bg-[#DB524B]">
                    ثبت رد
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Request Modal */}
      {showEditRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-md px-8 py-4 bg-white shadow-xl">
            <button
              onClick={toggleEditRequestModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="text-right">
              <h2 className="mb-4 text-xl font-semibold">علت درخواست اصلاح:</h2>
              <form onSubmit={handleEditRequest}>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.initialAmount}
                      onChange={() => handleReasonChange("initialAmount")}
                    />
                    <span>مبلغ سرمایه اولیه را اصلاح کنید.</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.percentage}
                      onChange={() => handleReasonChange("percentage")}
                    />
                    <span>میزان درصد را اصلاح کنید.</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.dates}
                      onChange={() => handleReasonChange("dates")}
                    />
                    <span>تاریخ‌ها را اصلاح کنید.</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.personalInfo}
                      onChange={() => handleReasonChange("personalInfo")}
                    />
                    <span>اطلاعات من درست نیست</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.otherReasons}
                      onChange={() => handleReasonChange("otherReasons")}
                    />
                    <span>سایر دلایل</span>
                  </label>
                </div>
                <textarea
                  className="w-full p-2 mt-4 border border-gray-300 rounded"
                  placeholder="نوشتن توضیحات..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={toggleEditRequestModal}
                    className="px-4 py-1 text-white bg-[#5D9CEC]"
                  >
                    بازگشت
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 text-white bg-[#F7AF3E]"
                  >
                    درخواست اصلاح
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white shadow-xl">
            <button
              onClick={toggleConfirmationModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="text-right">
              <p className="mb-4">
                ` اینجانب نام و نام خانوادگی`
                <br />
                ضمن مطالعه موارد اشاره شده در قرارداد شماره فلان
              </p>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={isTermsAccepted}
                  onChange={handleTermsAccept}
                />
                <span>بندهای موجود در این قرارداد مورد تایید می‌باشد.</span>
              </div>
              <div className="flex justify-around mt-4">
                <button
                  onClick={toggleConfirmationModal}
                  className="px-4 py-1 text-white bg-[#5D9CEC]"
                >
                  بازگشت
                </button>
                <button
                  className="px-4 py-1 text-white bg-[#1BBF89]"
                  disabled={!isTermsAccepted}
                  onClick={handleConfirmation}
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white shadow-xl">
            <button
              onClick={toggleSignatureModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="text-right">
              <h2 className="mb-4 text-xl font-semibold">
                امضای خود را وارد کنید:
              </h2>
              <p className="mb-2 text-red-500">
                (توجه کنید که امضا قابل تغییر نیست)
              </p>
              <div
                ref={sigContainerRef}
                className="relative mb-4 border border-gray-300"
              >
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="blue"
                  canvasProps={{
                    className: "signature-canvas w-full h-48", // canvas
                    style: {
                      touchAction: "none",
                    },
                  }}
                  minWidth={1}
                  maxWidth={1}
                />
                <span className="absolute text-gray-400 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2">
                  محل امضا
                </span>
                <button
                  onClick={clearSignature}
                  className="absolute p-1 bg-white top-2 left-2 hover:bg-gray-100"
                >
                  <Icon name="eraser" size={20} />
                </button>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={toggleSignatureModal}
                  className="px-4 py-1 text-white bg-blue-500"
                >
                  بازگشت
                </button>
                <button
                  onClick={handleSignatureSubmit}
                  className="px-4 py-1 text-white bg-green-500"
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investor;
