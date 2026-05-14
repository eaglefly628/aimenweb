import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

export async function Vision({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'vision' });
  const items = t.raw('items') as Array<{ title: string; desc: string }>;

  return (
    <section className="container-page py-20">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold md:text-3xl">{t('title')}</h2>
        <span className="font-mono text-xs text-ink-faint">// vision</span>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="glass relative overflow-hidden rounded-xl p-6 transition hover:border-ink/20"
          >
            <div className="font-mono text-xs text-accent">
              0{idx + 1}
            </div>
            <h3 className="mt-3 text-lg font-medium text-ink">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{it.desc}</p>
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
          </div>
        ))}
      </div>
    </section>
  );
}
