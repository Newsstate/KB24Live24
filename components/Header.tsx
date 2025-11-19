// components/Header.tsx
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header
      style={{
        background: '#c8102e',
        color: '#fff',
        padding: '10px 16px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ fontSize: 24, margin: 0 }}>Khabar24 Live</h1>
        </Link>

        <nav
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 14,
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/category/politics">Politics</Link>
          <Link href="/category/sports">Sports</Link>
          <Link href="/category/entertainment">Entertainment</Link>
        </nav>
      </div>
    </header>
  );
}
