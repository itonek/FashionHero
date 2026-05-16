"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "seller_boost_modal_seen";

export function SellerBoostModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  function goToBoost() {
    dismiss();
    router.push("/seller-boost");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
        {/* Gradient background */}
        <div className="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 p-8 text-white">

          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white text-lg leading-none"
          >
            ×
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider mb-5">
            ⚡ Seller Boost
          </div>

          <h2 className="text-2xl font-bold leading-tight mb-2">
            Twój sklep jest<br />niewidoczny dla kupujących
          </h2>
          <p className="text-white/80 text-[14px] leading-relaxed mb-6">
            Nowi sprzedawcy trafiają na koniec wyników. Podbij produkty na górę i zacznij sprzedawać — już od 319 zł.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { value: "3×", label: "więcej kliknięć" },
              { value: "+41%", label: "wyższe GMV" },
              { value: "30", label: "wolnych miejsc" },
            ].map((s) => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-3 text-center">
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-[11px] text-white/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={goToBoost}
            className="w-full bg-white text-fuchsia-600 font-bold text-[13px] uppercase tracking-wider py-3.5 rounded-xl hover:bg-white/90 transition-colors"
          >
            Podbij swój sklep →
          </button>

          <button
            onClick={dismiss}
            className="w-full text-center text-white/50 hover:text-white/80 text-[12px] mt-3 transition-colors"
          >
            Może później
          </button>
        </div>
      </div>
    </div>
  );
}
