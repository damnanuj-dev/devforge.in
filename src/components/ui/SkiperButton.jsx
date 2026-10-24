import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkiperButton({
  children,
  href,
  onClick,
  variant = "primary", // "primary" (purple accent), "dark" (matte dark with border), "ghost" (clean text)
  className,
  target,
  rel,
  type = "button",
  showArrow = true,
  disabled = false,
}) {
  const isLink = Boolean(href);
  const Component = isLink ? "a" : "button";

  const baseStyles =
    "group relative inline-flex items-center justify-center font-heading font-medium text-sm sm:text-base transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

  const variants = {
    primary:
      "h-12 px-6 rounded-button bg-purple-600 hover:bg-purple-500 text-white font-semibold active:scale-[0.98] border border-purple-400/30",
    dark:
      "h-12 px-6 rounded-button bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 hover:border-zinc-700 active:scale-[0.98]",
    ghost:
      "h-12 px-4 text-zinc-300 hover:text-white bg-transparent hover:underline",
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      type={!isLink ? type : undefined}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], className)}
    >
      <span className="flex items-center gap-2">
        <span>{children}</span>
        {showArrow && (
          <span className="relative flex items-center justify-center w-4 h-4 ml-0.5 overflow-visible">
            <ChevronRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            <span
              className="absolute right-[9px] h-[2px] w-2 origin-right scale-x-0 rounded-[1px] bg-current transition-all duration-300 ease-out group-hover:scale-x-100 group-hover:right-[6px]"
              aria-hidden="true"
            />
          </span>
        )}
      </span>
    </Component>
  );
}

export default SkiperButton;
