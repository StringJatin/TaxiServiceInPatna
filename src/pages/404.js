// pages/_404.js or pages/_404.tsx

import Link from 'next/link';

export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <a>Return to Home</a>
      </Link>
    </div>
  );
}
