// components/Footer.tsx
export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        background: '#111',
        color: '#aaa',
        padding: '12px 16px',
        fontSize: 13,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        © {new Date().getFullYear()} Khabar24 Live. All rights reserved.
      </div>
    </footer>
  );
}
