import { fetchDatoCMS } from '@lib/datocms';

export async function fetchOfferBySlug(slug, locale) {
  const fields = `
    id
    title
    slug
    subtitle
    description
    travelDate
    imagefront { url }
  `;
  const qA = `
    query OfferA($slug:String,$locale:SiteLocale){
      allOffers(filter:{ slug:{ eq:$slug } }, locale:$locale, first:1){
        ${fields}
        termsYCondicions
      }
    }
  `;
  const qB = `
    query OfferB($slug:String,$locale:SiteLocale){
      allOffers(filter:{ slug:{ eq:$slug } }, locale:$locale, first:1){
        ${fields}
        termsYCondiciones
      }
    }
  `;
  const norm = (r) => {
    const v = r?.allOffers?.[0];
    if (!v) return null;
    return {
      title: v.title || '',
      slug: v.slug || '',
      subtitle: v.subtitle || '',
      description: v.description || '',
      terms: v.termsYCondicions || v.termsYCondiciones || '',
      travelDate: v.travelDate || '',
      imagefrontUrl: v?.imagefront?.url || '',
    };
  };
  try {
    const r = await fetchDatoCMS(qA, { slug, locale });
    const v = norm(r);
    if (v) return v;
  } catch(_) {}
  try {
    const r = await fetchDatoCMS(qB, { slug, locale });
    const v = norm(r);
    if (v) return v;
  } catch(_) {}
  return null;
}

