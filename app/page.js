import Link from 'next/link';

function HomePage() {
  return (
    <div className="flex flex-col bg-grey-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">YokYok Fried Chicken</h1>
          <nav>
            <ul className="flex space-x-6">
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                <Link href="/profile">Profile</Link>
              </li>
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                <Link href="/cart">Cart</Link>
              </li>
              {/* Replace with conditional logic for session */}
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                <Link href="/api/auth/signout">Sign Out</Link>
              </li>
              <li className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
                <Link href="/api/auth/signin">Sign In</Link>
              </li>
              {/* End of conditional logic */}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
