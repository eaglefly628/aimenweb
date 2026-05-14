import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { GridBackground } from '@/components/grid-bg';

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'gallery' });

  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <article>
      <section className="relative overflow-hidden pb-12 pt-20">
        <GridBackground />
        <div className="container-page relative">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-ink-dim md:text-lg">{t('subtitle')}</p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((i) => (
            <div
              key={i}
              className="glass group relative aspect-video overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-violet/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs text-ink-faint">
                  // clip_{String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 transition group-hover:ring-accent/30" />
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-ink-faint">{t('comingSoon')}</p>
      </section>
    </article>
  );
}
