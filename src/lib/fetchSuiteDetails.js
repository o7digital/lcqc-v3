import { fetchDatoCMS } from '@lib/datocms';

export async function fetchSuiteDetails(slug, locale) {
  const tryLocales = locale === 'es' ? ['es', 'en'] : ['en', 'es'];
  try {
    // Debug log (dev only): helps trace how we matched the suite
    if (process?.env?.NODE_ENV !== 'production') {
      console.log('[DatoSuite] start', { slug, locale, tryLocales });
    }
  } catch (_) {}

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
  const qBySlug3 = `
    query Suite($slug: String, $locale: SiteLocale) {
      allAdminDetailSuites(filter: { slug: { eq: $slug } }, locale: $locale, first: 1) {
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
  const qList3 = `
    query SuiteList($locale: SiteLocale) {
      allAdminDetailSuites(locale: $locale) {
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
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] bySlug (1m) resp keys', Object.keys(r||{})); } catch(_){}
      if (v) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] match by slug (1m)', { slug, locale: loc, preview: (v?.subtitle || '').slice(0, 60) }); } catch(_){}
        return v;
      }
    } catch (e) {
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] bySlug (1m) error', e?.response?.errors?.[0]?.message || e?.message || String(e)); } catch(_){}
    }
    try {
      const r = await fetchDatoCMS(qBySlug2, { slug, locale: loc });
      const v = r?.allAccommodationsDetails?.[0];
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] bySlug (2m) resp keys', Object.keys(r||{})); } catch(_){}
      if (v) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] match by slug (2m)', { slug, locale: loc, preview: (v?.subtitle || '').slice(0, 60) }); } catch(_){}
        return v;
      }
    } catch (e) {
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] bySlug (2m) error', e?.response?.errors?.[0]?.message || e?.message || String(e)); } catch(_){}
    }
    try {
      const r = await fetchDatoCMS(qBySlug3, { slug, locale: loc });
      const v = r?.allAdminDetailSuites?.[0];
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] bySlug (admin_detail_suites) resp keys', Object.keys(r||{})); } catch(_){}
      if (v) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] match by slug (admin_detail_suites)', { slug, locale: loc, preview: (v?.subtitle || '').slice(0, 60) }); } catch(_){}
        return v;
      }
    } catch (e) {
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] bySlug (admin_detail_suites) error', e?.response?.errors?.[0]?.message || e?.message || String(e)); } catch(_){}
    }
  }

  // Fallback: list all then match slug (both API keys & locales)
  for (const loc of tryLocales) {
    try {
      const r = await fetchDatoCMS(qList1, { locale: loc });
      const arr = r?.allAccomodationsDetails || [];
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] list (1m) length', arr?.length ?? 0); } catch(_){}
      const m = arr.find((x) => String(x?.slug || '').trim().toLowerCase() === String(slug).trim().toLowerCase());
      if (m) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] match in list (1m)', { slug, locale: loc, preview: (m?.subtitle || '').slice(0, 60) }); } catch(_){}
        return m;
      }
    } catch (e) {
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] list (1m) error', e?.response?.errors?.[0]?.message || e?.message || String(e)); } catch(_){}
    }
    try {
      const r = await fetchDatoCMS(qList2, { locale: loc });
      const arr = r?.allAccommodationsDetails || [];
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] list (2m) length', arr?.length ?? 0); } catch(_){}
      const m = arr.find((x) => String(x?.slug || '').trim().toLowerCase() === String(slug).trim().toLowerCase());
      if (m) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] match in list (2m)', { slug, locale: loc, preview: (m?.subtitle || '').slice(0, 60) }); } catch(_){}
        return m;
      }
    } catch (e) {
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] list (2m) error', e?.response?.errors?.[0]?.message || e?.message || String(e)); } catch(_){}
    }
    try {
      const r = await fetchDatoCMS(qList3, { locale: loc });
      const arr = r?.allAdminDetailSuites || [];
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] list (admin_detail_suites) length', arr?.length ?? 0); } catch(_){}
      const m = arr.find((x) => String(x?.slug || '').trim().toLowerCase() === String(slug).trim().toLowerCase());
      if (m) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] match in list (admin_detail_suites)', { slug, locale: loc, preview: (m?.subtitle || '').slice(0, 60) }); } catch(_){}
        return m;
      }
    } catch (e) {
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] list (admin_detail_suites) error', e?.response?.errors?.[0]?.message || e?.message || String(e)); } catch(_){}
    }
  }
  try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] no match', { slug, locale, tried: tryLocales }); } catch(_){}
  return null;
}
