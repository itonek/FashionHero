"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { SellerBoostModal } from "@/components/seller-boost-modal";

const NAV_ITEMS = [
  { href: "/seller", label: "Przegląd", icon: "⊞" },
  { href: "/seller/products", label: "Produkty", icon: "◫" },
  { href: "/seller/orders", label: "Zamówienia", icon: "≡" },
  { href: "/seller/analytics", label: "Analityka", icon: "↗" },
  { href: "/seller-boost", label: "Seller Boost", icon: "⚡" },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/seller/login");
    } else if (user.role !== "seller") {
      router.push("/account");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen bg-[#f5f4f1]" />;
  }

  if (!user || user.role !== "seller") return null;

  return (
    <div className="min-h-screen bg-[#f5f4f1] flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[#212121] text-white flex flex-col z-30 transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Link href="/seller" className="text-[15px] font-semibold tracking-tight">
            FashionHero
          </Link>
          <p className="text-[11px] text-white/50 mt-0.5 uppercase tracking-wider">Panel sprzedawcy</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/seller"
              ? pathname === "/seller"
              : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors
                  ${isActive
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
              >
                <span className="text-[16px] leading-none">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[12px] font-medium">
              {user.firstName[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] text-white truncate">{user.firstName} {user.lastName}</p>
              <p className="text-[11px] text-white/50 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="w-full text-left text-[11px] text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
          >
            Wyloguj się
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar mobile */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-black/8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#212121] p-1"
            aria-label="Otwórz menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          </button>
          <span className="text-[14px] font-semibold text-[#212121]">FashionHero</span>
          <div className="w-7" />
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>

      <SellerBoostModal />
    </div>
  );
}
