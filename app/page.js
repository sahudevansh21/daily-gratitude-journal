import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to Your Gratitude Journal</h1>
      <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
        Cultivate a daily gratitude practice. Simple, private, and free.
      </p>
      <Link href="/today" passHref>
        <button>Start Journaling Today</button>
      </Link>
    </div>
  );
}
