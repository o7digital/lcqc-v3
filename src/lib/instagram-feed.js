import https from 'node:https';

export const instagramProfile = 'https://www.instagram.com/lacasaquecanta_hotelboutique/';
export const instagramHandle = '/lacasaquecanta_hotelboutique';

const instagramApiUrl =
  'https://i.instagram.com/api/v1/users/web_profile_info/?username=lacasaquecanta_hotelboutique';

export const instagramSeedPosts = [
  {
    href: 'https://www.instagram.com/lacasaquecanta_hotelboutique/p/DWRmwPUksG0/',
    src: 'https://scontent.cdninstagram.com/v/t39.30808-6/657597177_1379162500922838_2355056696350562627_n.jpg?stp=c273.0.820.820a_dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=hciHwoqJJywQ7kNvwHUkFr7&_nc_oc=Adp3DRj8Spe46pH1VMCwqhJleCAgHv2V2m0HHYbXu-i7sNiOW_pY1Mg0c_xhh54XpWc&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=KCP2nfN_jeAC1S413YSJJw&_nc_ss=7a30f&oh=00_AfxxiiC1KTOuXBH1Id9IW0DxF_2p0LOpX18QTCmzTa99eA&oe=69CA499E',
    alt: '20 likes, 1 comments - lacasaquecanta_hotelboutique on March 24, 2026: "La bienvenida a Casa. Welcome Home."',
  },
  {
    href: 'https://www.instagram.com/lacasaquecanta_hotelboutique/p/DWMdKwZgEZK/',
    src: 'https://scontent.cdninstagram.com/v/t39.30808-6/655433030_1376376601201428_2541067611457951260_n.jpg?stp=c273.0.819.819a_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=wOq3zvNLM50Q7kNvwHdJ_Dz&_nc_oc=AdpbQnl3VAEsMeXCEQuGl0mdPYk02xsbQlIf1PrvcVV_byxofjr4Rma3xYojD97Ty8A&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=mHgikotreLkK6GBJLeDX3g&_nc_ss=7a30f&oh=00_AfzRGvQbq-TBVwL3Yph-uB79xCWCCVDjxk5q_kBWPtdXIw&oe=69CA5127',
    alt: '24 likes, 1 comments - lacasaquecanta_hotelboutique on March 22, 2026: "Cada dia es unico en nuestra Casa. Every day is unique in our Home."',
  },
  {
    href: 'https://www.instagram.com/lacasaquecanta_hotelboutique/reel/DWJ4eT2D-z9/',
    src: 'https://scontent.cdninstagram.com/v/t51.82787-15/656869827_18070887074557468_287499156136165149_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=100&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=VdkFWv8JBWsQ7kNvwEl2YpL&_nc_oc=AdpsuJWhxRyHofq79I7kpdXGFTdY9YLpSN1MVgvf78-BnC_ZsygTQpCz8mhSIpgOc1c&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1d8jcsYl1Ac_7KdOOiDUrg&_nc_ss=7a30f&oh=00_AfwRO6ZQHHNngdvB5Ljry5Wi_x5_9MqAZAfj88bpeyDRIg&oe=69CA43AD',
    alt: '59 likes, 1 comments - lacasaquecanta_hotelboutique on March 21, 2026: "La terraza de la suite Marieta. The terrace of Marieta suite."',
  },
  {
    href: 'https://www.instagram.com/lacasaquecanta_hotelboutique/p/DWFkkxCjTCJ/',
    src: 'https://scontent.cdninstagram.com/v/t39.30808-6/651309464_1373485164823905_8473114519655691127_n.jpg?stp=c273.0.820.820a_dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=7koPHXlvSj0Q7kNvwEnBYOz&_nc_oc=AdpCO-dNbW31ailXGVwY5Mw8L5EYFwPLq-yJxNXGaENW64lB_CmU302LaFm7YCzQYmM&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=_oDHHXg2rcU4z14y3Hy_pg&_nc_ss=7a30f&oh=00_AfwrG9y3xnV71unUje3JN-P4SSX8S6enLjtE-TpkS_PQbw&oe=69CA3660',
    alt: '15 likes, 0 comments - lacasaquecanta_hotelboutique on March 19, 2026: "El final de un hermoso dia. The end of a beautiful day."',
  },
  {
    href: 'https://www.instagram.com/lacasaquecanta_hotelboutique/p/DWAa3h0j2wg/',
    src: 'https://scontent.cdninstagram.com/v/t39.30808-6/651328534_1373479578157797_4729523962827502844_n.jpg?stp=c273.0.820.820a_dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=QTSMUBniGT4Q7kNvwE8lZgT&_nc_oc=AdrkhhILzwmRGshHDr7ZONnuUF6xe_Yiow-U4M2EwS8kr4YM13izARBXHufyTx_IDb4&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=j1W6G3lyfWqF8mb4hTs_pA&_nc_ss=7a30f&oh=00_Afztdvc1dJ7m2shY1DO-rkoaCP3ufRUCfeTnVTKgEmovjg&oe=69CA413F',
    alt: '19 likes, 1 comments - lacasaquecanta_hotelboutique on March 17, 2026: "La mezcla perfecta de sofisticacion y estilo. A perfect blend of sophistication and style."',
  },
  {
    href: 'https://www.instagram.com/lacasaquecanta_hotelboutique/p/DV6bnFJgh59/',
    src: 'https://scontent.cdninstagram.com/v/t39.30808-6/651148351_1370168835155538_1287464991048521750_n.jpg?stp=c273.0.820.820a_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=unGqgw6W1SsQ7kNvwE1SD_O&_nc_oc=AdqSrofC7MKZx_nPAdV90Wyem4P1kOkNQLzeElt_4yaOR4GdSJ1rp-DD1eLcWj32P8c&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=gQhnXX-xiVNK4Kxvg_rWaA&_nc_ss=7a30f&oh=00_AfxTVMk8NKMBM3cX9Rb8Y2aHLxiVBOAPwL8WcttAOUtk_A&oe=69CA2AC7',
    alt: '30 likes, 0 comments - lacasaquecanta_hotelboutique on March 15, 2026: "Una encantadora experiencia frente al mar. A delightful seaside experience."',
  },
];

function fetchText(url, headers) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers }, (response) => {
      let raw = '';

      response.on('data', (chunk) => {
        raw += chunk;
      });

      response.on('end', () => {
        if (response.statusCode !== 200) {
          reject(new Error(`Instagram returned ${response.statusCode}`));
          return;
        }

        resolve(raw);
      });
    });

    request.on('error', reject);
    request.setTimeout(8000, () => {
      request.destroy(new Error('Instagram request timed out'));
    });
  });
}

function decodeHtmlEntities(text = '') {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number.parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)));
}

function extractMeta(html, property) {
  const match = html.match(new RegExp(`property="${property}" content="([^"]+)"`));
  return decodeHtmlEntities(match?.[1] || '');
}

async function fetchInstagramPayload() {
  const raw = await fetchText(instagramApiUrl, {
    accept: 'application/json',
    'x-ig-app-id': '936619743392459',
    'user-agent': 'Instagram 219.0.0.12.117 Android',
  });

  return JSON.parse(raw);
}

export async function fetchInstagramPosts(limit = 6) {
  const data = await fetchInstagramPayload();
  const edges = data?.data?.user?.edge_owner_to_timeline_media?.edges || [];

  return edges.slice(0, limit).map(({ node }) => {
    const caption = node?.edge_media_to_caption?.edges?.[0]?.node?.text?.trim() || '';
    const accessibilityCaption = node?.accessibility_caption?.trim() || '';

    return {
      href: node?.shortcode ? `https://www.instagram.com/p/${node.shortcode}/` : instagramProfile,
      src: node?.thumbnail_src || node?.display_url || '',
      alt: accessibilityCaption || caption || `Instagram post from ${instagramHandle}`,
    };
  }).filter((post) => post.src);
}

export async function fetchSeedPosts(limit = 6) {
  const seedPosts = instagramSeedPosts.slice(0, limit);

  const refreshedPosts = await Promise.all(seedPosts.map(async (post) => {
    try {
      const html = await fetchText(post.href, {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      });

      return {
        href: extractMeta(html, 'og:url') || post.href,
        src: extractMeta(html, 'og:image') || post.src,
        alt: extractMeta(html, 'og:description') || post.alt,
      };
    } catch {
      return post;
    }
  }));

  return refreshedPosts.filter((post) => post.src);
}

export async function getInstagramFeedPosts(limit = 6) {
  try {
    const posts = await fetchInstagramPosts(limit);
    if (posts.length > 0) return posts;
  } catch {}

  try {
    const posts = await fetchSeedPosts(limit);
    if (posts.length > 0) return posts;
  } catch {}

  return instagramSeedPosts.slice(0, limit);
}
