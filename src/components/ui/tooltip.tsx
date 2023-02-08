import React, { memo } from "react";

import { default as cn } from "classnames";

export type TooltipProps = {
  children: React.ReactNode;
  color?: string;
  text: string;
};

const Tooltip: React.FC<TooltipProps> = memo((props) => {
  return (
    <span className="group relative">
      <span
        className={cn(
          "pointer-events-none absolute -top-14 left-1/2 z-50 -translate-x-1/2 whitespace-pre rounded  px-2 py-1 text-white opacity-0 transition delay-100 duration-100 before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:content-[''] group-hover:opacity-100",
          props.color
            ? `bg-${props.color} before:border-t-${props.color}`
            : "bg-gray-900 before:border-t-black"
        )}
      >
        {props.text}
      </span>

      {props.children}
    </span>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
