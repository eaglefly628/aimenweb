import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Hero } from '@/components/hero';
import { Vision } from '@/components/vision';
import { ProductShowcase } from '@/components/product-showcase';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <Vision locale={locale} />
      <ProductShowcase locale={locale} />
    </>
  );
}
