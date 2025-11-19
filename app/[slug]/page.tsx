// app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getLatestPosts, getPostBySlug, type WpPost } from '@/lib/wp-api';
import { getFeaturedImage } from '@/lib/getFeaturedImage';


interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  // Pre-generate some recent posts; you can expand this or remove
  const posts = await getLatestPosts(20);
  return posts.map((post: WpPost) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const title = post.title.rendered.replace(/<\/?[^>]+(>|$)/g, '');
  const description = post.excerpt?.rendered
    ?.replace(/<\/?[^>]+(>|$)/g, '')
    ?.slice(0, 150);

  return {
    title: `${title} | Khabar24 Live`,
    description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const title = post.title.rendered;
  const { src, alt } = getFeaturedImage(post);


  return (
    <article>
      <h1
        style={{
          marginTop: 0,
          fontSize: 26,
          marginBottom: 8,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        style={{
          fontSize: 13,
          color: '#777',
          marginBottom: 20,
        }}
      >
        {new Date(post.date).toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>

      {/* Use WP-rendered HTML for content */}
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
