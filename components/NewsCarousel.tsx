// components/NewsCarousel.tsx
'use client';

import Link from 'next/link';
import type { WpPost } from '@/lib/wp-api';
import { getFeaturedImage } from '@/lib/getFeaturedImage';


interface Props {
  posts: WpPost[];
}

export default function NewsCarousel({ posts }: Props) {
  if (!posts?.length) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ margin: '0 0 10px' }}>Top Stories</h3>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 12,
          paddingBottom: 8,
        }}
      >
        {posts.map((post) => {
          const title = post.title.rendered.replace(/<\/?[^>]+(>|$)/g, '');
          const { src, alt } = getFeaturedImage(post);

          return (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              style={{
                minWidth: 260,
                maxWidth: 260,
                background: '#f2f2f2',
                borderRadius: 6,
                padding: 10,
                textDecoration: 'none',
                color: '#111',
                fontSize: 14,
              }}
            >
              <strong style={{ display: 'block', marginBottom: 4 }}>
                {title}
              </strong>
              <span style={{ fontSize: 12, color: '#666' }}>
                {new Date(post.date).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
