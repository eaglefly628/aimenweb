import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import type { Locale } from '@/i18n/routing';

export async function Navbar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  const tBrand = await getTranslations({ locale, namespace: 'brand' });

  const links = [
    { href: '/', label: t('home') },
    { href: '/products/narrative-engine', label: t('products') },
    { href: '/gallery', label: t('gallery') },
    { href: '/about', label: t('about') },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-md border border-accent/40 bg-accent/10">
            <span className="h-2 w-2 rounded-sm bg-accent shadow-[0_0_12px_2px_rgba(94,234,212,0.6)]" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-ink group-hover:text-white">
            {tBrand('name')}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-dim transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
