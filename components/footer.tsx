import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const tBrand = await getTranslations({ locale, namespace: 'brand' });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line/60">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-10 text-sm text-ink-faint md:flex-row md:items-center">
        <div>
          © {year} {tBrand('name')} · {t('rights')}
        </div>
        <div className="font-mono text-xs">{t('madeWith')}</div>
      </div>
    </footer>
  );
}
