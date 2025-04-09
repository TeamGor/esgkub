'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Registration successful but failed to sign in');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message || 'Registration failed');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F1EF] px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-[#0D3D03]">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#5C6D49]">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C6D49]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C6D49]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C6D49]">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#5C6D49] focus:outline-none focus:ring-[#5C6D49]"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#5C6D49] px-4 py-2 text-white hover:bg-[#0D3D03] focus:outline-none focus:ring-2 focus:ring-[#5C6D49] focus:ring-offset-2 disabled:bg-[#A3AB82]"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-[#A3AB82]">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-[#5C6D49] hover:text-[#0D3D03]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
