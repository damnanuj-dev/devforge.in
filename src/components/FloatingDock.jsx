import React, { useState, useEffect } from 'react';
import { Home, Layers, User, FolderGit2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const DOCK_ITEMS = [
  { id: 'hero', label: 'Home', icon: Home, href: '#main-content' },
  { id: 'services', label: 'Services', icon: Layers, href: '#services' },
  { id: 'about', label: 'About', icon: User, href: '#about' },
  { id: 'work', label: 'Work', icon: FolderGit2, href: '#work' },
  { id: 'contact', label: 'Contact', icon: Send, href: '#contact' },
];

export function FloatingDock() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = DOCK_ITEMS.map((item) => {
        const id = item.href.replace('#', '');
        return document.getElementById(id);
      }).filter(Boolean);

      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPos) {
          const matched = DOCK_ITEMS.find(
            (item) => item.href.replace('#', '') === section.id
          );
          if (matched) {
            setActiveSection(matched.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Floating navigation dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-950/90 border border-zinc-800 shadow-2xl backdrop-blur-md">
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              aria-label={item.label}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                'relative flex items-center justify-center w-10 h-10 rounded-full text-zinc-400 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400',
                isActive ? 'text-zinc-950 bg-zinc-100 font-bold' : 'hover:text-zinc-100 hover:bg-zinc-900'
              )}
            >
              <Icon className="w-4 h-4" />

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: -34, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.92 }}
                    transition={{ duration: 0.12 }}
                    className="absolute font-heading font-medium text-xs px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 shadow-xl pointer-events-none whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default FloatingDock;
