"use client";

import { useEffect, useRef, useState } from "react";
import { MdLanguage } from "react-icons/md";
import { locales } from "@/utils/i18n/config";
import { useLanguage } from "./language-provider";

function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const activeLocale = locales.find((item) => item.code === locale) || locales[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t.language.select}
        className="flex items-center gap-2 rounded-full border border-[#1b2c68a0] bg-[#0d1224] px-3 py-2 text-sm text-white transition-all duration-300 hover:border-violet-500 hover:text-[#16f2b3]"
      >
        <MdLanguage size={18} />
        <span className="font-medium tracking-wider">{activeLocale.short}</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={t.language.label}
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-[#1b2c68a0] bg-[#0d1224] shadow-[0_0_20px_0_rgba(0,0,0,0.4)]"
        >
          {locales.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                role="option"
                aria-selected={item.code === locale}
                onClick={() => handleSelect(item.code)}
                className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors duration-300 hover:bg-[#1a1443] ${
                  item.code === locale ? "text-[#16f2b3]" : "text-white"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-70">{item.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
