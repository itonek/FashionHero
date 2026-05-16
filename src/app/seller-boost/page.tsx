"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

type TierId = "tier1" | "tier2" | "tier3";

interface Tier {
  id: TierId;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  price: string;
  priceNote: string;
  benefits: string[];
  scarcity?: string;
  highlight?: boolean;
}

const TIERS: Tier[] = [
  {
    id: "tier3",
    name: "Boost Startowy",
    tagline: "Idealne na pierwsze 90 dni",
    badge: "NOWY SELLER",
    badgeColor: "bg-emerald-100 text-emerald-700",
    price: "319 PLN",
    priceNote: "jednorazowo",
    benefits: [
      "30 dni wyróżnienia produktów",
      'Badge "Nowy na FashionHero"',
      "Wyższe pozycje w wynikach wyszukiwania",
    ],
  },
  {
    id: "tier2",
    name: "Boost Produktów",
    tagline: "Wybrane produkty wyżej w wynikach",
    badge: "NAJPOPULARNIEJSZY",
    badgeColor: "bg-indigo-100 text-indigo-700",
    price: "od 320 PLN",
    priceNote: "miesięcznie",
    benefits: [
      '5 produktów: 320 PLN / Badge "Promowany"',
      "15 produktów: 720 PLN",
      "30 produktów: 1 220 PLN",
    ],
    highlight: true,
  },
  {
    id: "tier1",
    name: "Polecany Sprzedawca",
    tagline: "Maksymalna widoczność całego sklepu",
    badge: "PREMIUM",
    badgeColor: "bg-amber-100 text-amber-700",
    price: "820 PLN / tyg.",
    priceNote: "lub 2 520 PLN / mies.",
    benefits: [
      'Badge "Polecany" na sklepie',
      "Wyświetlanie na górze kategorii",
      "Limit: tylko 30 sellerów",
    ],
    scarcity: "Zostało 7 miejsc",
  },
];

function saveToWaitlist(email: string, tier: TierId) {
  const key = "seller-boost-waitlist";
  const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
  existing.push({ email, tier, timestamp: Date.now() });
  localStorage.setItem(key, JSON.stringify(existing));
}

export default function SellerBoostPage() {
  const { user } = useAuth();
  const [joinedTier, setJoinedTier] = useState<TierId | null>(null);

  const isSeller = user?.role === "seller";
  const backHref = isSeller ? "/seller" : "/";
  const backLabel = isSeller ? "Wróć do panelu" : "Wróć do sklepu";

  function handleJoin(tierId: TierId) {
    if (!user) return;
    saveToWaitlist(user.email, tierId);
    setJoinedTier(tierId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#ece9e2] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-3 text-2xl font-semibold text-[#212121]">Seller Boost</h1>
          <p className="mb-6 text-[#6b6b6b]">Zaloguj się, aby zobaczyć opcje promocji swojego sklepu.</p>
          <Link href="/seller/login" className="btn-cta px-8 py-3 text-sm">
            Zaloguj się
          </Link>
        </div>
      </div>
    );
  }

  if (joinedTier) {
    const tier = TIERS.find((t) => t.id === joinedTier)!;
    return (
      <div className="min-h-screen bg-[#ece9e2] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
          <div className="mb-4 text-4xl">🎉</div>
          <h1 className="mb-2 text-2xl font-semibold text-[#212121]">Dziękujemy!</h1>
          <p className="mb-1 text-[#6b6b6b]">
            Dodaliśmy Cię do listy oczekujących dla pakietu{" "}
            <span className="font-medium text-[#212121]">{tier.name}</span>.
          </p>
          <p className="mb-8 text-sm text-[#6b6b6b]">
            Potwierdzenie wyślemy na:{" "}
            <span className="font-medium text-[#212121]">{user.email}</span>
          </p>
          <Link href={backHref} className="btn-cta-outline px-8 py-3 text-sm">
            {backLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ece9e2]">
      {/* Hero */}
      <div className="px-4 py-16 text-center">
        <div className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.6px] text-red-600">
          Seller Boost
        </div>
        <h1 className="mb-3 text-3xl font-semibold text-[#212121] sm:text-4xl">
          Twój sklep jest teraz niewidoczny.
        </h1>
        <p className="mx-auto max-w-xl text-[#6b6b6b]">
          Nowi sellerzy trafiają na koniec wyników — kupujący ich nie znajdą. Podbij swoje produkty na górę i zacznij sprzedawać.
        </p>
      </div>

      {/* Tiers */}
      <div className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl bg-white p-7 shadow-sm transition-shadow hover:shadow-md ${
                tier.highlight ? "ring-2 ring-[#212121]" : ""
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#212121] px-4 py-1 text-[11px] font-medium uppercase tracking-[0.6px] text-white">
                  Polecany
                </div>
              )}

              <div className={`mb-4 self-start rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.6px] ${tier.badgeColor}`}>
                {tier.badge}
              </div>

              <h2 className="mb-1 text-lg font-semibold text-[#212121]">{tier.name}</h2>
              <p className="mb-5 text-sm text-[#6b6b6b]">{tier.tagline}</p>

              <ul className="mb-6 flex-1 space-y-2">
                {tier.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-[#212121]">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              {tier.scarcity && (
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.6px] text-red-500">
                  {tier.scarcity}
                </p>
              )}

              <div className="mb-5">
                <span className="text-2xl font-semibold text-[#212121]">{tier.price}</span>
                <span className="ml-1 text-sm text-[#6b6b6b]">{tier.priceNote}</span>
              </div>

              <button
                onClick={() => handleJoin(tier.id)}
                className={tier.highlight ? "btn-cta py-3 text-sm" : "btn-cta-outline py-3 text-sm"}
              >
                Dołącz
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#6b6b6b]">
          To jest wczesny dostęp — dołączenie do listy nie wiąże się z płatnością.
        </p>
        <div className="mt-6 text-center">
          <Link href={backHref} className="text-sm text-[#6b6b6b] hover:text-[#212121] transition-colors underline">
            ← {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
