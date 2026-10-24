import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function CursorCard({
  children,
  image,
  description,
  title,
  href = "#",
  className,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    x.set(e.clientX - 130);
    y.set(e.clientY + 24);
  };

  return (
    <>
      <span
        tabIndex={0}
        role="button"
        className={cn(
          "relative inline-block cursor-pointer font-semibold text-zinc-100 border-b border-purple-400/50 hover:border-purple-400 transition-colors duration-150 px-1 py-0.5 rounded-sm hover:bg-purple-950/30",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {children}
      </span>

      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 8 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              style={{
                x: springX,
                y: springY,
              }}
              className={cn(
                "fixed top-0 left-0 pointer-events-none z-50 w-[260px]",
                "bg-zinc-950/95 border border-zinc-800 p-3.5 rounded-xl shadow-2xl backdrop-blur-md"
              )}
            >
              {image && (
                <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-zinc-900 border border-zinc-800">
                  <img
                    src={image}
                    alt={title || "Preview"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {title && (
                <h4 className="font-heading font-semibold text-xs tracking-wide uppercase text-purple-400 mb-1">
                  {title}
                </h4>
              )}
              <p className="font-body text-xs text-zinc-400 leading-relaxed m-0">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default CursorCard;
