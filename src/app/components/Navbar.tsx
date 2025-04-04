"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : session ? (
          <>
            <span>Welcome, {session.user.name || session.user.username}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/auth/login")}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/auth/signup")}
              className="bg-green-500 px-4 py-2 rounded text-white"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
