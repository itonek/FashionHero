"use client";

import { useState } from "react";

const ALL_ORDERS = [
  { id: "FH-20481", date: "16 maj 2026", product: "Sukienka midi kremowa", buyer: "A.K.", amount: 249, status: "Nowe" },
  { id: "FH-20479", date: "16 maj 2026", product: "Bluza oversize czarna", buyer: "M.W.", amount: 189, status: "Wysłane" },
  { id: "FH-20471", date: "15 maj 2026", product: "Spodnie wide leg", buyer: "K.N.", amount: 319, status: "Wysłane" },
  { id: "FH-20464", date: "15 maj 2026", product: "Top bawełniany biały", buyer: "J.P.", amount: 89, status: "Dostarczone" },
  { id: "FH-20451", date: "14 maj 2026", product: "Sukienka midi kremowa", buyer: "B.R.", amount: 249, status: "Zwrócone" },
  { id: "FH-20440", date: "14 maj 2026", product: "Kurtka oliwkowa", buyer: "A.S.", amount: 449, status: "Dostarczone" },
  { id: "FH-20428", date: "13 maj 2026", product: "Bluzka z wiązaniem", buyer: "E.T.", amount: 139, status: "Dostarczone" },
  { id: "FH-20415", date: "13 maj 2026", product: "Bluza oversize czarna", buyer: "P.M.", amount: 189, status: "Zwrócone" },
  { id: "FH-20403", date: "12 maj 2026", product: "Sukienka letnia", buyer: "M.K.", amount: 199, status: "Dostarczone" },
  { id: "FH-20391", date: "12 maj 2026", product: "Top bawełniany biały", buyer: "A.L.", amount: 89, status: "Dostarczone" },
  { id: "FH-20378", date: "11 maj 2026", product: "Spodnie wide leg", buyer: "N.W.", amount: 319, status: "Wysłane" },
  { id: "FH-20362", date: "11 maj 2026", product: "Sukienka midi kremowa", buyer: "O.G.", amount: 249, status: "Zwrócone" },
];

const STATUSES = ["Wszystkie", "Nowe", "Wysłane", "Dostarczone", "Zwrócone"];

const STATUS_STYLES: Record<string, string> = {
  Nowe: "bg-blue-50 text-blue-700",
  Wysłane: "bg-amber-50 text-amber-700",
  Dostarczone: "bg-emerald-50 text-emerald-700",
  Zwrócone: "bg-red-50 text-red-600",
};

export default function SellerOrdersPage() {
  const [activeStatus, setActiveStatus] = useState("Wszystkie");

  const filtered = activeStatus === "Wszystkie"
    ? ALL_ORDERS
    : ALL_ORDERS.filter((o) => o.status === activeStatus);

  const total = filtered.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#212121]">Zamówienia</h1>
        <p className="text-[13px] text-[#6b6b6b] mt-0.5">
          {filtered.length} zamówień &middot; {total.toLocaleString("pl-PL")} zł łącznie
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 mb-5 bg-white rounded-xl p-1 shadow-sm w-fit">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-colors ${
              activeStatus === s
                ? "bg-[#212121] text-white"
                : "text-[#6b6b6b] hover:text-[#212121]"
            }`}
          >
            {s}
            {s !== "Wszystkie" && (
              <span className="ml-1.5 text-[10px] opacity-60">
                {ALL_ORDERS.filter((o) => o.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/8">
                <th className="text-left px-6 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">ID</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Produkt</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Kupujący</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Data</th>
                <th className="text-right px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Kwota</th>
                <th className="text-center px-6 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-[#fafaf9] transition-colors">
                  <td className="px-6 py-3.5 text-[12px] font-medium text-[#212121]">{order.id}</td>
                  <td className="px-4 py-3.5 text-[13px] text-[#212121]">{order.product}</td>
                  <td className="px-4 py-3.5 text-[13px] text-[#6b6b6b]">{order.buyer}</td>
                  <td className="px-4 py-3.5 text-[12px] text-[#6b6b6b]">{order.date}</td>
                  <td className="px-4 py-3.5 text-[13px] font-medium text-[#212121] text-right">{order.amount} zł</td>
                  <td className="px-6 py-3.5 text-center">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-[13px] text-[#6b6b6b]">
              Brak zamówień o statusie &quot;{activeStatus}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
