import { fetchDatoCMS } from '@lib/datocms';

export async function fetchSuiteDetails(slug, locale) {
  const tryLocales = locale === 'es' ? ['es', 'en'] : ['en', 'es'];

  // NOTE: requested exact field name (one 'm', lowercase 'details')
  const qBySlug4 = `
    query Suite($slug: String, $locale: SiteLocale) {
      allAccomodationsdetails(filter: { slug: { eq: $slug } }, locale: $locale, first: 1) {
        subtitle
        intro
        roomFeatures
        amenities
        internetAccess
      }
    }
  `;
  const qList4 = `
    query SuiteList($locale: SiteLocale) {
      allAccomodationsdetails(locale: $locale) {
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
    try {
      const r = await fetchDatoCMS(qBySlug4, { slug, locale: loc });
      const v = r?.allAccomodationsdetails?.[0];
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] bySlug (allAccomodationsdetails) resp keys', Object.keys(r||{})); } catch(_){}
      if (v) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] match by slug (allAccomodationsdetails)', { slug, locale: loc, preview: (v?.subtitle || '').slice(0, 60) }); } catch(_){}
        return v;
      }
    } catch (e) {
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] bySlug (allAccomodationsdetails) error', e?.response?.errors?.[0]?.message || e?.message || String(e)); } catch(_){}
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
    try {
      const r = await fetchDatoCMS(qList4, { locale: loc });
      const arr = r?.allAccomodationsdetails || [];
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] list (allAccomodationsdetails) length', arr?.length ?? 0); } catch(_){}
      const m = arr.find((x) => String(x?.slug || '').trim().toLowerCase() === String(slug).trim().toLowerCase());
      if (m) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] match in list (allAccomodationsdetails)', { slug, locale: loc, preview: (m?.subtitle || '').slice(0, 60) }); } catch(_){}
        return m;
      }
    } catch (e) {
      try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] list (allAccomodationsdetails) error', e?.response?.errors?.[0]?.message || e?.message || String(e)); } catch(_){}
    }
  }
  try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] no match', { slug, locale, tried: tryLocales }); } catch(_){}
  // Introspection aid (dev only): list possible root fields containing "Detail" or "Suite"
  try {
    if (process?.env?.NODE_ENV !== 'production') {
      const introspection = `
        query Q {
          __schema { queryType { fields { name } } }
        }
      `;
      const res = await fetchDatoCMS(introspection, {});
      const fields = res?.__schema?.queryType?.fields?.map((f)=>f?.name) || [];
      const candidates = fields.filter((n)=>/detail|suite|accomod|accommod/i.test(n));
      console.log('[DatoSuite] introspection candidates', candidates);
    }
  } catch(_) {}
  // Final fallback: use Page model with identical slug (lets you see content while we align API field name)
  try {
    const qPage = `
      query FallbackPage($slug:String,$locale:SiteLocale){
        allPages(filter:{ slug:{ eq:$slug } }, locale:$locale, first:1){
          subtitle
          intro
        }
      }
    `;
    for (const loc of tryLocales) {
      const r = await fetchDatoCMS(qPage, { slug, locale: loc });
      const p = r?.allPages?.[0];
      if (p) {
        try { if (process?.env?.NODE_ENV !== 'production') console.log('[DatoSuite] fallback PAGE hit', { slug, locale: loc, preview: (p?.subtitle || '').slice(0,60) }); } catch(_){}
        // Normalize to the expected shape used by suite pages
        return { subtitle: p.subtitle || '', intro: p.intro || '', roomFeatures: null, amenities: null, internetAccess: null };
      }
    }
  } catch(_){}
  return null;
}
