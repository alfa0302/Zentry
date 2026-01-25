import React from "react";

export default function Button({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
}) {
  return (
    <button
      id={id}
      className={`group relative z-10 cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black text-[12px] ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
}
