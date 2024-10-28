import React, { useState, useRef,useContext } from "react";
import AppContext from "../../contexts/AppContext";

const InvestmentApproval = () => {
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
  
  // const { baskets, handleUpdateBasket } = useBaskets();
  // const { role } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  const basketsToUpdate = baskets.find(
    (inv) =>
      (role === "investor" && inv.documentRequest === true) ||
      (role === "portfolioManager" && inv.documentAccept === true)
  );

  if (
    !basketsToUpdate ||
    (role !== "investor" && role !== "portfolioManager")
  ) {
    return null;
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInvestorSubmit = () => {
    if (!selectedFile) {
      alert("لطفاً یک فایل انتخاب کنید.");
      return;
    }

    const updatedBasket = {
      ...basketsToUpdate,
      // documentRequest: false,
      status: "در انتظار تایید",
      // description: description,
    };

    handleUpdateBasket(updatedBasket);
    setSelectedFile(null);
    setDescription("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    alert('سند با موفقیت ثبت شد و وضعیت به "در انتظار تایید" تغییر کرد.');
  };

  const handleManagerApprove = () => {
    const updatedBasket = {
      ...basketsToUpdate,
      documentAccept: false,
      status: "تایید نهایی",
    };

    handleUpdateBasket(updatedBasket);
    alert("سرمایه‌گذاری با موفقیت تایید شد.");
  };

  const handleManagerReject = () => {
    const updatedBaskets = {
      ...basketsToUpdate,
      documentAccept: false,
      status: "رد شده",
    };

    handleUpdateBasket(updatedBaskets);
    alert("سرمایه‌گذاری رد شد.");
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold text-right">
        {role === "investor" ? "ثبت سند واریز سبد" : "بررسی سند واریز سبد"}{" "}
        (شماره {basketsToUpdate.contractNumber})
      </h2>
      <div className="flex items-center justify-center h-48 mb-4 border-2 border-gray-300 border-dashed">
        {role === "investor" ? (
          selectedFile ? (
            <p className="text-sm text-gray-600">{selectedFile.name}</p>
          ) : (
            <div className="w-full h-full bg-gray-200"></div>
          )
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      {role === "investor" && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,application/pdf"
        />
      )}
      {role === "investor" && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full px-4 py-2 mb-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          انتخاب سند
        </button>
      )}
      <textarea
        value={
          role === "investor"
            ? description
            : basketsToUpdate.description || ""
        }
        onChange={
          role === "investor"
            ? (e) => setDescription(e.target.value)
            : undefined
        }
        placeholder={role === "investor" ? "نوشتن توضیحات..." : "توضیحات..."}
        className="w-full h-24 p-2 mb-4 border border-gray-300 rounded-md resize-none"
        readOnly={role !== "investor"}
      ></textarea>
      {role === "investor" ? (
        <button
          onClick={handleInvestorSubmit}
          className="w-full px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
        >
          ثبت
        </button>
      ) : (
        <div className="flex justify-between">
          <button
            onClick={handleManagerApprove}
            className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
          >
            تایید
          </button>
          <button
            onClick={handleManagerReject}
            className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
          >
            رد
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestmentApproval;
