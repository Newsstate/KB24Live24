// app/[category]/[slugWithId]/page.tsx
import { notFound } from 'next/navigation';
import { getPostById, getPostBySlug, type WpPost } from '@/lib/wp-api';
import { getFeaturedImage } from '@/lib/getFeaturedImage'; // your helper
import Image from 'next/image';

interface Params {
  category: string;
  slugWithId: string; // e.g. "slug-here-60010"
}

function extractIdAndSlug(slugWithId: string): { id: number | null; slug: string } {
  const parts = slugWithId.split('-');
  const last = parts[parts.length - 1];
  const maybeId = Number(last);
  if (!Number.isNaN(maybeId)) {
    const slug = parts.slice(0, -1).join('-'); // "slug-here"
    return { id: maybeId, slug };
  }
  // fallback: no numeric id
  return { id: null, slug: slugWithId };
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id, slug } = extractIdAndSlug(params.slugWithId);
  let post: WpPost | null = null;

  if (id) {
    post = await getPostById(id);
  }
  if (!post) {
    post = await getPostBySlug(slug);
  }
  if (!post) return {};

  const plainTitle = post.title.rendered.replace(/<\/?[^>]+(>|$)/g, '');
  const description =
    post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 150);

  return {
    title: `${plainTitle} | Khabar24 Live`,
    description,
    alternates: {
      canonical: `https://khabar24live.com/${params.category}/${params.slugWithId}`,
      languages: {
        'hi-IN': `https://khabar24live.com/${params.category}/${params.slugWithId}`,
      },
    },
    // link to AMP version
    other: {
      'link:amphtml': `https://khabar24live.com/${params.category}/${extractIdAndSlug(params.slugWithId).slug}/amp`,
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { id, slug } = extractIdAndSlug(params.slugWithId);

  let post: WpPost | null = null;
  if (id) {
    post = await getPostById(id);
  }
  if (!post) {
    post = await getPostBySlug(slug);
  }
  if (!post) return notFound();

  const { src, width, height, alt } = getFeaturedImage(post);

  return (
    <article>
      {src && width && height && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 800,
            margin: '0 auto 16px',
            aspectRatio: '16/9',
          }}
        >
          <Image
            src={src}
            alt={alt || post.title.rendered.replace(/<\/?[^>]+(>|$)/g, '')}
            fill
            sizes="(max-width: 900px) 100vw, 800px"
            style={{ objectFit: 'cover', borderRadius: 8 }}
          />
        </div>
      )}

      <h1
        style={{ fontSize: 26, margin: '0 0 8px' }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <p style={{ fontSize: 13, color: '#777', marginBottom: 16 }}>
        {new Date(post.date).toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
