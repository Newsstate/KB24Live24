// components/Sidebar.tsx
'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>Trending</h3>
      {/* later: map real data here */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: 8 }}>
          <Link href="/some-article-slug">Sample trending story 1</Link>
        </li>
        <li style={{ marginBottom: 8 }}>
          <Link href="/some-other-slug">Sample trending story 2</Link>
        </li>
      </ul>

      <hr style={{ margin: '16px 0' }} />

      <h4 style={{ marginBottom: 8 }}>Categories</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
        <li>
          <Link href="/category/india">India</Link>
        </li>
        <li>
          <Link href="/category/world">World</Link>
        </li>
        <li>
          <Link href="/category/business">Business</Link>
        </li>
      </ul>
    </div>
  );
}
