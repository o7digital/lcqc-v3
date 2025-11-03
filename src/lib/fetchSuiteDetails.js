import { fetchDatoCMS } from '@lib/datocms';

export async function fetchSuiteDetails(slug, locale) {
  const tryLocales = locale === 'es' ? ['es', 'en'] : ['en', 'es'];

  const qBySlug1 = `
    query Suite($slug: String, $locale: SiteLocale) {
      allAccomodationsDetails(filter: { slug: { eq: $slug } }, locale: $locale, first: 1) {
        subtitle
        intro
        roomFeatures
        amenities
        internetAccess
      }
    }
  `;
  const qBySlug2 = `
    query Suite($slug: String, $locale: SiteLocale) {
      allAccommodationsDetails(filter: { slug: { eq: $slug } }, locale: $locale, first: 1) {
        subtitle
        intro
        roomFeatures
        amenities
        internetAccess
      }
    }
  `;
  const qList1 = `
    query SuiteList($locale: SiteLocale) {
      allAccomodationsDetails(locale: $locale) {
        slug
        subtitle
        intro
        roomFeatures
        amenities
        internetAccess
      }
    }
  `;
  const qList2 = `
    query SuiteList($locale: SiteLocale) {
      allAccommodationsDetails(locale: $locale) {
        slug
        subtitle
        intro
        roomFeatures
        amenities
        internetAccess
      }
    }
  `;

  // Try exact filter on both API keys and locales
  for (const loc of tryLocales) {
    try {
      const r = await fetchDatoCMS(qBySlug1, { slug, locale: loc });
      const v = r?.allAccomodationsDetails?.[0];
      if (v) return v;
    } catch (_) {}
    try {
      const r = await fetchDatoCMS(qBySlug2, { slug, locale: loc });
      const v = r?.allAccommodationsDetails?.[0];
      if (v) return v;
    } catch (_) {}
  }

  // Fallback: list all then match slug (both API keys & locales)
  for (const loc of tryLocales) {
    try {
      const r = await fetchDatoCMS(qList1, { locale: loc });
      const arr = r?.allAccomodationsDetails || [];
      const m = arr.find((x) => String(x?.slug || '').trim().toLowerCase() === String(slug).trim().toLowerCase());
      if (m) return m;
    } catch (_) {}
    try {
      const r = await fetchDatoCMS(qList2, { locale: loc });
      const arr = r?.allAccommodationsDetails || [];
      const m = arr.find((x) => String(x?.slug || '').trim().toLowerCase() === String(slug).trim().toLowerCase());
      if (m) return m;
    } catch (_) {}
  }

  return null;
}
