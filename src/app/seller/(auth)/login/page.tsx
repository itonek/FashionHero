"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export default function SellerLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Uzupełnij wszystkie pola.");
      return;
    }
    await login(email, password, "seller");
    router.push("/seller");
  }

  return (
    <div className="min-h-screen bg-[#f5f4f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-[13px] text-[#6b6b6b] hover:text-[#212121] transition-colors">
            ← Wróć do sklepu
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-[#212121]">Panel sprzedawcy</h1>
          <p className="mt-1 text-[13px] text-[#6b6b6b]">Zaloguj się do swojego konta FashionHero</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-600 text-[13px] text-center bg-red-50 rounded-lg py-2 px-3">{error}</p>
            )}
            <div>
              <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-[0.8px] text-[#212121] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black/15 rounded-lg px-3 py-2.5 text-[14px] text-[#212121] outline-none focus:border-[#212121] transition-colors"
                placeholder="twoj@sklep.pl"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[11px] font-medium uppercase tracking-[0.8px] text-[#212121] mb-1.5">
                Hasło
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black/15 rounded-lg px-3 py-2.5 text-[14px] text-[#212121] outline-none focus:border-[#212121] transition-colors"
                placeholder="Wpisz hasło"
              />
            </div>
            <button type="submit" className="w-full bg-[#212121] text-white rounded-lg py-3 text-[12px] font-medium uppercase tracking-[0.8px] hover:bg-[#333] transition-colors">
              Zaloguj się
            </button>
          </form>

          <p className="text-center text-[13px] text-[#6b6b6b] mt-6">
            Nie masz konta?{" "}
            <Link href="/seller/register" className="text-[#212121] underline hover:opacity-60 transition-opacity">
              Zarejestruj sklep
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
