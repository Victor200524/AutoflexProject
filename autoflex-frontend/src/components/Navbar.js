import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider">Autoflex inventory system</h1>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li>
            <Link href="/raw-material" className="hover:text-gray-300">Raw-Material</Link>
          </li>
          <li>
            <Link href="/product" className="hover:text-gray-300">Products</Link>
          </li>
          <li>
            <Link href="/recipes" className="hover:text-gray-300">Recipes</Link>
          </li>
          <li>
            <Link href="/history" className="hover:text-gray-300">History</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}