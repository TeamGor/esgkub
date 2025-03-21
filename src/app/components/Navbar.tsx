"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <span>Welcome, {session.user?.username}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
