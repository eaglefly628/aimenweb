import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

export async function ProductShowcase({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'products' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const cards = [
    {
      href: '/products/narrative-engine',
      name: t('narrative.name'),
      short: t('narrative.short'),
      desc: t('narrative.desc'),
      tone: 'from-accent/20 via-transparent to-transparent',
      tag: 'engine',
    },
    {
      href: '/products/video-data',
      name: t('videoData.name'),
      short: t('videoData.short'),
      desc: t('videoData.desc'),
      tone: 'from-accent-violet/20 via-transparent to-transparent',
      tag: 'data',
    },
  ] as const;

  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold md:text-3xl">{t('title')}</h2>
        <p className="mt-3 text-ink-dim">{t('subtitle')}</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group glass relative overflow-hidden rounded-2xl p-8 transition hover:border-ink/20"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.tone} opacity-80`}
            />
            <div className="relative">
              <div className="flex items-center justify-between font-mono text-xs text-ink-faint">
                <span>// {c.tag}</span>
                <ArrowUpRight className="h-4 w-4 text-ink-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink">{c.name}</h3>
              <p className="mt-1 text-sm text-accent">{c.short}</p>
              <p className="mt-5 text-sm leading-relaxed text-ink-dim">{c.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm text-ink group-hover:text-white">
                {tCommon('learnMore')}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
