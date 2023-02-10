import classNames from "classnames";
import React from "react";

export type ButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
};

export default function GrayButton({ children, handleClick }: ButtonProps) {
  return (
    <div
      onClick={handleClick}
      className={classNames(
        "flex cursor-pointer select-none items-center justify-center gap-1 rounded-3xl border border-gray-500 bg-zinc-600 px-2 py-[1px] text-sm text-slate-200 shadow-sm shadow-gray-300",
        "hover:border-gray-400 hover:delay-75",
        "active:scale-95"
      )}
    >
      {children}
    </div>
  );
}
