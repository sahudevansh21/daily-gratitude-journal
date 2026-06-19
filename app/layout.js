import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// A client component for navigation to handle active links
const Nav = () => {
  "use client";
  const pathname = usePathname();

  const navLinks = [
    { name: "Today's Entry", href: "/today" },
    { name: "Calendar View", href: "/calendar" },
    { name: "Past Entries", href: "/past-entries" }
  ];

  return (
    <nav className="nav-bar">
      <div className="nav-links">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link href={link.href} key={link.name} className={isActive ? 'nav-link active' : 'nav-link'}>
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export const metadata = {
  title: 'Simple Daily Gratitude Journal',
  description: 'A minimalist, private, and free tool to record daily gratitude entries.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main-container">
          <Nav />
          <main className="content-area">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
