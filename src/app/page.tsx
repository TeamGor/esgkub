'use client'
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-8">Welcome to ESG KUB</h1>
      
      {session ? (
        <div className="text-center">
          <p className="text-xl mb-4">
            You are signed in as <span className="font-semibold">{session.user.name || session.user.email}</span>
          </p>
          <p>Start exploring the application using the navigation above.</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">Please sign in to access all features</p>
          <p>Use the login or signup buttons in the navigation bar to get started.</p>
        </div>
      )}
    </div>
  );
}
