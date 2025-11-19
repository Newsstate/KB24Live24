// app/page.tsx
import { getLatestPosts } from '@/lib/wp-api';
import NewsCard from '@/components/NewsCard';
import NewsCarousel from '@/components/NewsCarousel';

export const revalidate = 60; // ISR every 60s

export default async function HomePage() {
  const posts = await getLatestPosts(12);
  const topStories = posts.slice(0, 5);
  const rest = posts.slice(5);

  return (
    <>
      <NewsCarousel posts={topStories} />

      <h3 style={{ marginTop: 0, marginBottom: 12 }}>Latest News</h3>
      {rest.map((post) => (
        <NewsCard key={post.id} post={post} />
      ))}
    </>
  );
}
