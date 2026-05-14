import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Check, ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { GridBackground } from './grid-bg';

type Key = 'narrative' | 'videoData';

export async function ProductDetail({
  locale,
  productKey,
}: {
  locale: Locale;
  productKey: Key;
}) {
  const t = await getTranslations({ locale, namespace: `products.${productKey}` });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const highlights = t.raw('highlights') as string[];

  return (
    <article className="relative">
      <section className="relative overflow-hidden pb-16 pt-20">
        <GridBackground />
        <div className="container-page relative">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-ink-faint hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {tCommon('backHome')}
          </Link>
          <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            <span className="text-gradient">{t('name')}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-accent md:text-lg">{t('short')}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-dim">{t('desc')}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="hairline" />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="glass flex items-start gap-3 rounded-xl p-5 text-sm text-ink"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
