import { fetchDatoCMS } from '@lib/datocms';

export async function fetchSuiteDetails(slug, locale) {
  // Try API key spelling with single 'm' first (accomodations_details)
  const q1 = `
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
  // Fallback: spelling with two 'm' (accommodations_details)
  const q2 = `
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
  try {
    const res1 = await fetchDatoCMS(q1, { slug, locale });
    const v1 = res1?.allAccomodationsDetails?.[0];
    if (v1) return v1;
  } catch (_) {
    // ignore, try alternate
  }
  try {
    const res2 = await fetchDatoCMS(q2, { slug, locale });
    const v2 = res2?.allAccommodationsDetails?.[0];
    if (v2) return v2;
  } catch (_) {
    // ignore
  }
  // Fallback: fetch all and match by slug on client side (handles edge-cases with filters/localization)
  const q3 = `
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
  const q4 = `
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
  try {
    const r3 = await fetchDatoCMS(q3, { locale });
    const arr3 = r3?.allAccomodationsDetails || [];
    const m3 = arr3.find((x) => String(x?.slug || '').toLowerCase() === String(slug).toLowerCase());
    if (m3) return m3;
  } catch (_) {}
  try {
    const r4 = await fetchDatoCMS(q4, { locale });
    const arr4 = r4?.allAccommodationsDetails || [];
    const m4 = arr4.find((x) => String(x?.slug || '').toLowerCase() === String(slug).toLowerCase());
    if (m4) return m4;
  } catch (_) {}
  return null;
}
