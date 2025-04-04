"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
      <ul className="flex space-x-6">
        <li><a href="#home" className="text-white hover:text-gray-400">Home</a></li>
        <li><a href="#about" className="text-white hover:text-gray-400">About</a></li>
        <li><a href="#services" className="text-white hover:text-gray-400">Services</a></li>
        <li><a href="#contact" className="text-white hover:text-gray-400">Contact</a></li>
      </ul>
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
