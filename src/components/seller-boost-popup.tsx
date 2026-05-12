"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";
import { CloseIcon } from "./icons";

export function SellerBoostPopup() {
  const { user } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (localStorage.getItem("seller-boost-popup-shown")) return;

    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [user]);

  function dismiss() {
    localStorage.setItem("seller-boost-popup-shown", "true");
    setVisible(false);
  }

  function handleSeeOptions() {
    dismiss();
    router.push("/seller-boost");
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Zamknij"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.6px] text-red-600">
          Uwaga
        </div>

        <h2 className="mb-2 text-xl font-semibold text-[#212121]">
          Twoje produkty są niewidoczne
        </h2>
        <p className="mb-6 text-sm text-[#6b6b6b] leading-relaxed">
          Nowi sellerzy trafiają na koniec wyników wyszukiwania. Podbij swój sklep na górę i zacznij sprzedawać.
        </p>

        <div className="flex gap-3">
          <button onClick={handleSeeOptions} className="btn-cta flex-1 py-3 text-sm">
            Zobacz opcje
          </button>
          <button
            onClick={dismiss}
            className="btn-cta-outline flex-1 py-3 text-sm"
          >
            Może później
          </button>
        </div>
      </div>
    </div>
  );
}
