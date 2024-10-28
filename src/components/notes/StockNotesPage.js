import React from "react";
import StockNote from "../notes/stockNote "; 

const StockNotesPage = () => {
  const stockNotes = [
    {
      name: "ذرهواز",
      date: "0000",
      count: "1000",
      buyingAmount: "9900",
      limit: "9150",
      resistances: ["9800", "10000"],
      supports: ["8800", "8600"],
    },
    {
      name: "سود",
      date: "0000",
      count: "2000",
      buyingAmount: "10200",
      limit: "10100",
      resistances: ["9500", "9600"],
      supports: ["9100", "9000"],
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">یادداشت‌های سهم</h1>
      {stockNotes.map((note, index) => (
        <StockNote key={index} {...note} />
      ))}
    </div>
  );
};

export default StockNotesPage;
