// app/[category]/page.tsx
import { getCategoryPosts, type WpPost } from '@/lib/wp-api';
import Link from 'next/link';

interface Params {
  category: string;
}

export default async function CategoryPage({ params }: { params: Params }) {
  const posts: WpPost[] = await getCategoryPosts(params.category, 20);

  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: 16 }}>
        {params.category.toUpperCase()}
      </h1>

      {posts.map((post) => {
        const title = post.title.rendered.replace(/<\/?[^>]+(>|$)/g, '');
        const slugWithId = `${post.slug}-${post.id}`;

        return (
          <article
            key={post.id}
            style={{
              borderBottom: '1px solid #eee',
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>
              <Link href={`/${params.category}/${slugWithId}`}>{title}</Link>
            </h2>
          </article>
        );
      })}
    </div>
  );
}
   