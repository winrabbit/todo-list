'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCommonTranslation } from '@/hooks/useTranslation';
import { useEffect, useRef, useState } from 'react';

type SwitchLocale = 'en' | 'zh' | 'cn';

const LOCALE_OPTIONS: { value: SwitchLocale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '繁體中文' },
  { value: 'cn', label: '简体中文' },
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useCommonTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const switchLanguage = (targetLocale: SwitchLocale) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = targetLocale;
    }
    const nextPath = segments.join('/') || '/';
    router.push(nextPath);
  };

  const currentOption =
    LOCALE_OPTIONS.find((option) => option.value === locale) ?? LOCALE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative text-xs sm:text-sm"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1.5 border-2 border-[#383838] bg-white text-[#383838] font-semibold uppercase hover:-translate-y-[1px] hover:-translate-x-[1px] transition-transform"
      >
        <span>{currentOption.label}</span>
        <span className="text-[10px] sm:text-[11px]">▼</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-white border-2 border-[#383838] shadow-md z-20">
          {LOCALE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                switchLanguage(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-[#FFD500] hover:text-[#383838] ${
                locale === option.value ? 'bg-[#383838] text-white font-bold' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


