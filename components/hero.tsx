import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Play } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { GridBackground } from './grid-bg';

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pt-28">
      <GridBackground />
      <div className="container-page relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/60 px-3 py-1 text-xs text-ink-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(94,234,212,0.6)]" />
          <span className="font-mono tracking-wide">{t('eyebrow')}</span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          <span className="text-gradient">{t('title')}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-ink-dim md:text-lg">
          {t('subtitle')}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/products/narrative-engine" className="btn-primary">
            {t('ctaPrimary')}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/gallery" className="btn-ghost">
            <Play className="h-4 w-4" />
            {t('ctaSecondary')}
          </Link>
        </div>

        <div className="mt-16 hairline" />
      </div>
    </section>
  );
}
