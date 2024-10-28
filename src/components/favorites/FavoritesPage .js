import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    { title: "بستن قرارداد", content: "این قسمت برای بستن قرارداد است." },
    {
      title: "قرارداد های من",
      content: "در این بخش قرارداد های شما نمایش داده می‌شود.",
    },
    { title: "درخواست وجه", content: "شما می‌توانید درخواست وجه دهید." },
    {
      title: "درخواست سهم سبدگردانی",
      content: "درخواست سهم سبدگردانی در این بخش قرار دارد.",
    },
    {
      title: "افزایش سرمایه",
      content: "افزایش سرمایه را از این بخش انجام دهید.",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4 text-center">علاقه مندی ها</h1>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border rounded-md shadow-md">
            <button
              className="w-full text-right p-4 bg-gray-200 hover:bg-gray-300"
              onClick={() => toggleSection(index)}
            >
              {section.title}
            </button>
            {openSection === index && (
              <div className="p-4 bg-white border-t">
                {section.content}
               
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
