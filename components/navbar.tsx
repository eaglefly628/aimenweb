import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import type { Locale } from '@/i18n/routing';

export async function Navbar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'nav' });

  const links = [
    { href: '/products/narrative-engine', label: t('products') },
    { href: '/gallery', label: t('gallery') },
    { href: '/about', label: t('about') },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#05060a]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#5eead4] to-[#a78bfa] opacity-90 transition group-hover:opacity-100" />
            <div className="absolute inset-[3px] flex items-center justify-center rounded-[5px] bg-[#05060a]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#5eead4] shadow-[0_0_8px_#5eead4]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-semibold tracking-tight text-white">Aimeng</span>
            <span className="text-[12px] text-white/40">爱萌</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 text-[13px] text-white/60 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 font-mono text-[11px] tracking-wider text-white/40 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            BJ · SF
          </div>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}
