"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Yükleniyor...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <span>Merhaba, {session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition"
        >
          Çıkış Yap
        </button>
      </div>
    );
  }
  
  return (
    <button
      onClick={() => signIn("github")}
      className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 transition"
    >
      GitHub ile Giriş Yap
    </button>
  );
}
