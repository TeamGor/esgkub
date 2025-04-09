"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-[#0D3D03] text-white px-4 py-3 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div
        className="cursor-pointer w-32 md:w-48"
        onClick={() => router.push("/")}
      >
        <Image
          src="/image/LogoNav.png"
          alt="Logo"
          width={200}
          height={100}
          className="rounded-lg object-contain w-full h-auto"
        />
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-4">
        {session ? (
          <>
            <span className="whitespace-nowrap">
              Welcome back {session.user?.username || session.user?.name}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-[#5C6D49] hover:bg-[#A3AB82] hover:text-black px-4 py-2 rounded text-white"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-[#5C6D49] hover:bg-[#A3AB82] hover:text-black px-4 py-2 rounded text-white"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 bg-[#1e1e1e] text-white rounded shadow-md p-4 mt-2 w-48 flex flex-col space-y-3 md:hidden">
          {session ? (
            <>
              <span className="text-sm">
                Welcome, {session.user?.username || session.user?.name}
              </span>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="bg-red-500 px-4 py-2 rounded text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                router.push("/auth/login");
                setIsMenuOpen(false);
              }}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}