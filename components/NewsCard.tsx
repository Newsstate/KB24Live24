// components/NewsCard.tsx
import Link from 'next/link';
import type { WpPost } from '@/lib/wp-api';
import { getFeaturedImage } from '@/lib/getFeaturedImage';

interface Props {
  post: WpPost;
}

export default function NewsCard({ post }: Props) {
  const title = post.title.rendered.replace(/<\/?[^>]+(>|$)/g, '');
  const excerpt = post.excerpt?.rendered
    ?.replace(/<\/?[^>]+(>|$)/g, '')
    ?.slice(0, 140);

    const { src, alt } = getFeaturedImage(post);

  return (
    <article
      style={{
        borderBottom: '1px solid #eee',
        paddingBottom: 12,
        marginBottom: 12,
      }}
    >
      <h2 style={{ margin: '0 0 6px', fontSize: 18 }}>
        <Link href={`/${post.slug}`}>{title}</Link>
      </h2>
      <p style={{ margin: 0, fontSize: 14, color: '#555' }}>{excerpt}...</p>
    </article>
  );
}
