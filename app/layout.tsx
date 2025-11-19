// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Khabar24 Live – News',
  description: 'Latest news and headlines from Khabar24 Live.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body>
        <div className="site">
          <Header />

          <main className="site-main">
            <div className="site-content">{children}</div>
            <aside className="site-sidebar">
              <Sidebar />
            </aside>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
