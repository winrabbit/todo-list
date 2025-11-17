'use client';

import { useCommonTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface HeaderProps {
  onClearAll: () => void;
  onShowStatistics: () => void;
}

export function Header({ onClearAll, onShowStatistics }: HeaderProps) {
  const { t } = useCommonTranslation();

  return (
    <header className="bg-[#FFD500] border-b-2 border-[#383838]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 sm:mb-2 text-[#383838]">
              {t('header.title')}
            </h1>
            <p className="text-sm sm:text-base text-[#383838]/80">
              {t('header.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />
            <button
              onClick={onClearAll}
              className="btn-white px-4 sm:px-6 py-2 sm:py-3 rounded-none font-bold text-xs sm:text-sm uppercase flex-1 sm:flex-initial"
            >
              {t('actions.clearAll')}
            </button>
            <button
              onClick={onShowStatistics}
              className="btn-blue px-4 sm:px-6 py-2 sm:py-3 rounded-none font-bold text-xs sm:text-sm uppercase flex-1 sm:flex-initial whitespace-nowrap"
            >
              📊 {t('actions.stats')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
