// StockNote.js
import React from "react";

const StockNote = ({ name, date, count, buyingAmount, limit, resistances = [], supports = [] }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
      <h2 className="text-lg font-bold mb-2">نام سهم: {name}</h2>
      <p className="text-gray-300">تاریخ: {date}</p> 
      <p className="text-gray-300">تعداد: {count}</p>
      <p className="text-gray-300">مبلغ خرید: {buyingAmount}</p> 
      <p className="text-gray-300">حد ضرر: {limit}</p> 

      <div className="mt-4">
        <h3 className="font-semibold">مقاومت‌ها:</h3>
        {resistances.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-300"> 
            {resistances.map((resistance, index) => (
              <li key={index}>{resistance}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">هیچ مقاومتی وجود ندارد.</p> 
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">حمایت‌ها:</h3>
        {supports.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-300"> 
            {supports.map((support, index) => (
              <li key={index}>{support}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">هیچ حمایتی وجود ندارد.</p> 
        )}
      </div>
    </div>
  );
};

export default StockNote;
