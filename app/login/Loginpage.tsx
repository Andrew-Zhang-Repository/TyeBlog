'use client';

import { signInWithGoogle } from '../auth/Googleauth';

export default function Loginpage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-2xl border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome To Blog</h2>
          <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-sm font-medium shadow-sm"
        >
          Log in with Google
        </button>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <a>View as guest.</a>
          </p>
        </div>
      </div>
    </div>
  );
}