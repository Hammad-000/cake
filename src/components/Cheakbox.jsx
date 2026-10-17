import React from "react";
import { FiCheck } from "react-icons/fi";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";

function Checkbox({ id, text, checked, onChange, className = "", labelClassName = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={`hidden`}
        aria-label={text}
      />
      <label
        htmlFor={id}
        className={`flex items-center gap-2.5 cursor-pointer group ${focus}`}
      >
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
            checked
              ? "border-[#8A5A1E] bg-[#8A5A1E] dark:border-[#D4B27A] dark:bg-[#D4B27A]"
              : "border-[#2B1511]/25 dark:border-[#C9A66B]/30 group-hover:border-[#8A5A1E]/60 dark:group-hover:border-[#D4B27A]/60"
          }`}
        >
          {checked && <FiCheck className="text-white dark:text-[#1a0d09]" size={14} />}
        </div>
        <span className={`text-sm font-medium transition-colors ${labelClassName || "text-[#2B1511] dark:text-[#f3e5d8] group-hover:text-[#8A5A1E] dark:group-hover:text-[#D4B27A]"}`}>
          {text}
        </span>
      </label>
    </div>
  );
}

export default Checkbox;