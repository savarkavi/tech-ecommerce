"use client";

import { categories } from "@/constants";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CategoriesBar = () => {
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  const handleSeeMoreClick = () => {
    setIsCategoriesExpanded((prev) => !prev);
  };

  return (
    <div className="py-6 px-3 flex flex-col gap-8">
      <div
        className={`grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:flex items-center justify-center gap-8 xl:gap-16 ${
          isCategoriesExpanded ? "h-auto" : "h-[25px]"
        } overflow-hidden max-w-[1600px] xl:mx-auto`}
      >
        {categories.map((cat) => {
          return (
            <div
              key={cat.name}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              {cat.icon}
              <span>{cat.name}</span>
            </div>
          );
        })}
      </div>
      <div
        className="flex items-center gap-2 text-sm cursor-pointer xl:hidden"
        onClick={handleSeeMoreClick}
      >
        {isCategoriesExpanded ? <FaChevronUp /> : <FaChevronDown />}
        <span>{isCategoriesExpanded ? "See Less" : "See More"}</span>
      </div>
    </div>
  );
};

export default CategoriesBar;
