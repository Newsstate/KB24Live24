// lib/getFeaturedImage.ts
import type { WpPost, WpFeaturedMedia } from './wp-api';

export function getFeaturedImage(post: WpPost) {
  const media = post._embedded?.['wp:featuredmedia']?.[0] as
    | WpFeaturedMedia
    | undefined;

  if (!media) {
    return { src: null as string | null, width: 0, height: 0, alt: '' };
  }

  const sizes = media.media_details?.sizes ?? {};

  const candidate =
    sizes.medium ??
    sizes.full ??
    sizes.thumbnail ??
    null;

  const src = candidate?.source_url || media.source_url || null;
  const width = candidate?.width || media.media_details?.width || 0;
  const height = candidate?.height || media.media_details?.height || 0;
  const alt = media.alt_text || '';

  return { src, width, height, alt };
}
