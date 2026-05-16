"use client";

import { useState } from "react";

const PRODUCTS = [
  { id: "P001", name: "Sukienka midi kremowa", category: "Sukienki", price: "249 zł", sold: 47, views: 831, status: "Aktywny" },
  { id: "P002", name: "Bluza oversize czarna", category: "Bluzy", price: "189 zł", sold: 32, views: 610, status: "Aktywny" },
  { id: "P003", name: "Spodnie wide leg beżowe", category: "Spodnie", price: "319 zł", sold: 28, views: 495, status: "Aktywny" },
  { id: "P004", name: "Top bawełniany biały", category: "Topy", price: "89 zł", sold: 61, views: 1204, status: "Aktywny" },
  { id: "P005", name: "Kurtka przejściowa oliwkowa", category: "Kurtki", price: "449 zł", sold: 12, views: 389, status: "Aktywny" },
  { id: "P006", name: "Sukienka letnia w kwiaty", category: "Sukienki", price: "199 zł", sold: 19, views: 742, status: "Aktywny" },
  { id: "P007", name: "Jeansy high waist", category: "Spodnie", price: "279 zł", sold: 8, views: 203, status: "Nieaktywny" },
  { id: "P008", name: "Bluzka z wiązaniem ecru", category: "Bluzy", price: "139 zł", sold: 23, views: 456, status: "Aktywny" },
];

export default function SellerProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#212121]">Produkty</h1>
          <p className="text-[13px] text-[#6b6b6b] mt-0.5">{PRODUCTS.length} produktów w sklepie</p>
        </div>
        <button className="bg-[#212121] text-white text-[12px] font-medium uppercase tracking-[0.8px] px-4 py-2.5 rounded-lg hover:bg-[#333] transition-colors">
          + Dodaj produkt
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-black/8">
          <input
            type="text"
            placeholder="Szukaj produktów..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-[13px] text-[#212121] outline-none placeholder:text-[#6b6b6b]"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/8">
                <th className="text-left px-6 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Produkt</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Kategoria</th>
                <th className="text-right px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Cena</th>
                <th className="text-right px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Sprzedano</th>
                <th className="text-right px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Wyświetlenia</th>
                <th className="text-center px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#fafaf9] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#f0ece4] flex items-center justify-center text-[10px] text-[#6b6b6b] font-medium shrink-0">
                        {p.id}
                      </div>
                      <span className="text-[13px] text-[#212121] font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#6b6b6b]">{p.category}</td>
                  <td className="px-4 py-4 text-[13px] text-[#212121] text-right">{p.price}</td>
                  <td className="px-4 py-4 text-[13px] text-[#212121] text-right">{p.sold}</td>
                  <td className="px-4 py-4 text-[13px] text-[#6b6b6b] text-right">{p.views.toLocaleString("pl-PL")}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      p.status === "Aktywny"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-[#f0ece4] text-[#6b6b6b]"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[12px] text-[#6b6b6b] hover:text-[#212121] transition-colors underline">
                      Edytuj
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-[13px] text-[#6b6b6b]">
              Brak produktów dla &quot;{search}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
