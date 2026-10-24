import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function StudioLoader({ onComplete }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setLoading(false);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      onComplete?.();
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="studio-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-[#FAFAFA] select-none"
          role="status"
          aria-live="polite"
          aria-label="Loading DevForge Studio"
        >
          {/* Five-square looping sequential animation */}
          <div className="flex items-center gap-2.5 mb-5">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="w-3.5 h-3.5 rounded-[2px] bg-purple-500"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.35, 1, 0.35],
                  backgroundColor: ['#9333EA', '#FAFAFA', '#9333EA'],
                }}
                transition={{
                  duration: 0.95,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="flex flex-col items-center"
          >
            <span className="font-heading font-bold text-lg tracking-tight text-zinc-100">
              devforge.in
            </span>
            <span className="font-body text-[11px] text-zinc-500 mt-0.5 tracking-widest uppercase">
              Developer Studio
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StudioLoader;
