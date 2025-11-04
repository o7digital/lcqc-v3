import { fetchDatoCMS } from '@lib/datocms';

// Fetch an Offer by slug with locale, trying alternative field spellings
export async function fetchOfferBySlug(slug, locale) {
  const base = `
    id
    title
    slug
    subtitle
    description
    travelDate
    imagefront { url }
  `;

  const qTermsA = `
    query OfferA($slug:String,$locale:SiteLocale){
      allOffers(filter:{ slug:{ eq:$slug } }, locale:$locale, first:1){
        ${base}
        termsYCondicions
      }
    }
  `;
  const qTermsB = `
    query OfferB($slug:String,$locale:SiteLocale){
      allOffers(filter:{ slug:{ eq:$slug } }, locale:$locale, first:1){
        ${base}
        termsYCondiciones
      }
    }
  `;
  const qNoTerms = `
    query OfferC($slug:String,$locale:SiteLocale){
      allOffers(filter:{ slug:{ eq:$slug } }, locale:$locale, first:1){
        ${base}
      }
    }
  `;

  const normalize = (rec) => ({
    id: rec?.id || null,
    title: rec?.title || '',
    slug: rec?.slug || '',
    subtitle: rec?.subtitle || '',
    description: rec?.description || '',
    travelDate: rec?.travelDate || '',
    terms: rec?.termsYCondicions || rec?.termsYCondiciones || '',
    imagefrontUrl: rec?.imagefront?.url || '',
  });

  try {
    const r = await fetchDatoCMS(qTermsA, { slug, locale });
    const v = r?.allOffers?.[0];
    if (v) return normalize(v);
  } catch (_) {}
  try {
    const r = await fetchDatoCMS(qTermsB, { slug, locale });
    const v = r?.allOffers?.[0];
    if (v) return normalize(v);
  } catch (_) {}
  try {
    const r = await fetchDatoCMS(qNoTerms, { slug, locale });
    const v = r?.allOffers?.[0];
    if (v) return normalize(v);
  } catch (_) {}
  return null;
}

