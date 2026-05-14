import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ProductDetail } from '@/components/product-detail';

export default async function NarrativeEnginePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductDetail locale={locale} productKey="narrative" />;
}
