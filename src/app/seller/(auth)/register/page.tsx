"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export default function SellerRegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!firstName || !lastName || !email || !shopName || !password || !confirmPassword) {
      setError("Uzupełnij wszystkie pola.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Hasła się nie zgadzają.");
      return;
    }
    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }
    await register({ email, password, firstName, lastName, role: "seller" });
    router.push("/seller");
  }

  return (
    <div className="min-h-screen bg-[#f5f4f1] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-[13px] text-[#6b6b6b] hover:text-[#212121] transition-colors">
            ← Wróć do sklepu
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-[#212121]">Zarejestruj sklep</h1>
          <p className="mt-1 text-[13px] text-[#6b6b6b]">Dołącz do 4 200 sprzedawców na FashionHero</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-600 text-[13px] text-center bg-red-50 rounded-lg py-2 px-3">{error}</p>
            )}

            <div>
              <label htmlFor="shopName" className="block text-[11px] font-medium uppercase tracking-[0.8px] text-[#212121] mb-1.5">
                Nazwa sklepu
              </label>
              <input
                id="shopName"
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full border border-black/15 rounded-lg px-3 py-2.5 text-[14px] text-[#212121] outline-none focus:border-[#212121] transition-colors"
                placeholder="Mój Sklep Modowy"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-[11px] font-medium uppercase tracking-[0.8px] text-[#212121] mb-1.5">
                  Imię
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-black/15 rounded-lg px-3 py-2.5 text-[14px] text-[#212121] outline-none focus:border-[#212121] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-[11px] font-medium uppercase tracking-[0.8px] text-[#212121] mb-1.5">
                  Nazwisko
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-black/15 rounded-lg px-3 py-2.5 text-[14px] text-[#212121] outline-none focus:border-[#212121] transition-colors"
                />
              </div>
            </div>

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
                placeholder="Min. 6 znaków"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-[11px] font-medium uppercase tracking-[0.8px] text-[#212121] mb-1.5">
                Potwierdź hasło
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-black/15 rounded-lg px-3 py-2.5 text-[14px] text-[#212121] outline-none focus:border-[#212121] transition-colors"
              />
            </div>

            <button type="submit" className="w-full bg-[#212121] text-white rounded-lg py-3 text-[12px] font-medium uppercase tracking-[0.8px] hover:bg-[#333] transition-colors">
              Utwórz konto sprzedawcy
            </button>
          </form>

          <p className="text-center text-[13px] text-[#6b6b6b] mt-6">
            Masz już konto?{" "}
            <Link href="/seller/login" className="text-[#212121] underline hover:opacity-60 transition-opacity">
              Zaloguj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
