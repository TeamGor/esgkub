"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <span>Welcome, {session.user?.username || session.user?.name}</span>
            <button
              onClick={() => signOut()}
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
}