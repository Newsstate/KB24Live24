// app/[category]/[slug]/amp/page.tsx
import { notFound } from 'next/navigation';
import { getPostBySlug, type WpPost } from '@/lib/wp-api';

interface Params {
  category: string;
  slug: string; // "slug-here"
}

export const dynamic = 'force-static';

export default async function AmpArticlePage({ params }: { params: Params }) {
  const post: WpPost | null = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const plainTitle = post.title.rendered.replace(/<\/?[^>]+(>|$)/g, '');

  // Minimal AMP-like HTML (no JS, light CSS)
  return (
    <html lang="hi">
      <head>
        <title>{plainTitle} | Khabar24 Live</title>
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <style
          // keep it very small
          dangerouslySetInnerHTML={{
            __html: `
          body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 12px; line-height: 1.6; }
          h1 { font-size: 22px; margin: 0 0 10px; }
          p.meta { font-size: 12px; color: #777; margin: 0 0 12px; }
          .article-body img { max-width: 100%; height: auto; }
        `,
          }}
        />
        <link
          rel="canonical"
          href={`https://khabar24live.com/${params.category}/${params.slug}-ID`}
        />
      </head>
      <body>
        <article>
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <p className="meta">
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
      </body>
    </html>
  );
}
