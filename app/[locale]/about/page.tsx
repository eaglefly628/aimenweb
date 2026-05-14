import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { GridBackground } from '@/components/grid-bg';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  const values = t.raw('values') as string[];

  return (
    <article>
      <section className="relative overflow-hidden pb-12 pt-20">
        <GridBackground />
        <div className="container-page relative">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
            {t('intro')}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="hairline" />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs text-ink-faint">// mission</div>
            <h2 className="mt-2 text-2xl font-semibold">{t('missionTitle')}</h2>
            <p className="mt-4 text-ink-dim">{t('mission')}</p>
          </div>
          <div>
            <div className="font-mono text-xs text-ink-faint">// how we work</div>
            <h2 className="mt-2 text-2xl font-semibold">{t('valuesTitle')}</h2>
            <ul className="mt-4 space-y-2 text-ink-dim">
              {values.map((v, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">·</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 hairline" />

        <div className="mt-10">
          <div className="font-mono text-xs text-ink-faint">// contact</div>
          <h2 className="mt-2 text-2xl font-semibold">{t('contactTitle')}</h2>
          <p className="mt-4 text-ink-dim">{t('contact')}</p>
        </div>
      </section>
    </article>
  );
}
