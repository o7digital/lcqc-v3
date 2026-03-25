import { getInstagramFeedPosts } from '../src/lib/instagram-feed.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'method_not_allowed', posts: [] });
    return;
  }

  try {
    const posts = await getInstagramFeedPosts(6);
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Instagram API route failed.', error);
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).json({ error: 'instagram_feed_unavailable', posts: [] });
  }
}
