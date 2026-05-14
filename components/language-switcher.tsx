'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (loc: Locale) => {
    if (loc === currentLocale) return;
    router.replace(pathname, { locale: loc });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-bg-elev/60 p-0.5 text-xs">
      {(['zh', 'en'] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          className={cn(
            'rounded-full px-3 py-1 transition',
            loc === currentLocale
              ? 'bg-accent text-bg'
              : 'text-ink-dim hover:text-ink',
          )}
        >
          {loc === 'zh' ? '中' : 'EN'}
        </button>
      ))}
    </div>
  );
}
