// lib/wp-api.ts
const WP_BASE = 'https://khabar24live.com/wp-json/wp/v2';

interface MediaSize {
  file: string;
  width: number;
  height: number;
  filesize?: number;
  mime_type: string;
  source_url: string;
}

export interface WpFeaturedMedia {
  id: number;
  alt_text: string;
  media_type: string;
  mime_type: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize?: number;
    sizes: {
      medium?: MediaSize;
      thumbnail?: MediaSize;
      full?: MediaSize;
      [key: string]: MediaSize | undefined;
    };
  };
}

export interface WpPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    ['wp:featuredmedia']?: WpFeaturedMedia[];
    ['wp:term']?: any[]; // categories/tags (we'll use this for category slug)
    [key: string]: any;
  };
}

async function wpFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${WP_BASE}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
    ...options,
  });

  if (!res.ok) {
    console.error('WP API error', res.status, path);
    throw new Error(`WP API error: ${res.status}`);
  }

  return res.json();
}

// Latest posts for homepage
export async function getLatestPosts(limit = 10): Promise<WpPost[]> {
  return wpFetch<WpPost[]>(
    `/posts?per_page=${limit}&_embed=1&status=publish`
  );
}

// Single post by slug
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  const posts = await wpFetch<WpPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=1&status=publish`
  );
  return posts[0] ?? null;
}

// Single post by ID (for /slug-here-id URLs)
export async function getPostById(id: number): Promise<WpPost | null> {
  try {
    const post = await wpFetch<WpPost>(
      `/posts/${id}?_embed=1&status=publish`
    );
    return post;
  } catch {
    return null;
  }
}

// Category posts (optional)
export async function getCategoryPosts(
  categorySlug: string,
  limit = 10
): Promise<WpPost[]> {
  const cats = await wpFetch<{ id: number }[]>(
    `/categories?slug=${encodeURIComponent(categorySlug)}`
  );
  if (!cats.length) return [];
  const catId = cats[0].id;
  return wpFetch<WpPost[]>(
    `/posts?per_page=${limit}&categories=${catId}&_embed=1&status=publish`
  );
}
