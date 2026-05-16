"use client";

const RETURN_RATES = [
  { product: "Sukienka midi kremowa", sold: 47, returned: 11, rate: 23.4 },
  { product: "Bluza oversize czarna", sold: 32, returned: 4, rate: 12.5 },
  { product: "Spodnie wide leg beżowe", sold: 28, returned: 7, rate: 25.0 },
  { product: "Top bawełniany biały", sold: 61, returned: 5, rate: 8.2 },
  { product: "Kurtka przejściowa oliwkowa", sold: 12, returned: 1, rate: 8.3 },
  { product: "Sukienka letnia w kwiaty", sold: 19, returned: 6, rate: 31.6 },
  { product: "Bluzka z wiązaniem ecru", sold: 23, returned: 3, rate: 13.0 },
];

const TRAFFIC_SOURCES = [
  { source: "Wyszukiwarka FashionHero", pct: 54, sessions: 2108 },
  { source: "Kategoria / browsing", pct: 23, sessions: 897 },
  { source: "Polecane produkty", pct: 12, sessions: 468 },
  { source: "Zewnętrzne (social, Google)", pct: 11, sessions: 429 },
];

const CONVERSION = [
  { product: "Top bawełniany biały", views: 1204, conversions: 61, rate: 5.1 },
  { product: "Sukienka midi kremowa", views: 831, conversions: 47, rate: 5.7 },
  { product: "Bluza oversize czarna", views: 610, conversions: 32, rate: 5.2 },
  { product: "Sukienka letnia w kwiaty", views: 742, conversions: 19, rate: 2.6 },
  { product: "Bluzka z wiązaniem ecru", views: 456, conversions: 23, rate: 5.0 },
];

export default function SellerAnalyticsPage() {
  const maxRate = Math.max(...RETURN_RATES.map((r) => r.rate));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#212121]">Analityka</h1>
        <p className="text-[13px] text-[#6b6b6b] mt-0.5">Dane z ostatnich 30 dni</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Return rate per produkt */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-[13px] font-medium text-[#212121] mb-1">Zwroty per produkt</h2>
          <p className="text-[11px] text-[#6b6b6b] mb-5">Produkty powyżej 20% wymagają uwagi</p>
          <div className="space-y-3">
            {[...RETURN_RATES].sort((a, b) => b.rate - a.rate).map((row) => (
              <div key={row.product}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-[#212121] truncate pr-2">{row.product}</span>
                  <span className={`font-medium shrink-0 ${row.rate > 20 ? "text-red-600" : "text-emerald-600"}`}>
                    {row.rate.toFixed(1)}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#f0ece4] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${row.rate > 20 ? "bg-red-400" : "bg-emerald-500"}`}
                    style={{ width: `${(row.rate / maxRate) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-[13px] font-medium text-[#212121] mb-1">Skąd przychodzą kupujący</h2>
          <p className="text-[11px] text-[#6b6b6b] mb-5">Sesje z ostatnich 30 dni: 3 902</p>
          <div className="space-y-4">
            {TRAFFIC_SOURCES.map((src) => (
              <div key={src.source}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="text-[#212121]">{src.source}</span>
                  <span className="text-[#6b6b6b]">{src.sessions.toLocaleString("pl-PL")} sesji</span>
                </div>
                <div className="h-2 bg-[#f0ece4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#212121] rounded-full"
                    style={{ width: `${src.pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#6b6b6b] mt-0.5">{src.pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 konwersja */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-black/8">
          <h2 className="text-[13px] font-medium text-[#212121]">Konwersja per produkt</h2>
          <p className="text-[11px] text-[#6b6b6b] mt-0.5">Ile % odwiedzających kupuje</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/8">
              <th className="text-left px-6 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Produkt</th>
              <th className="text-right px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Wyświetlenia</th>
              <th className="text-right px-4 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Zakupy</th>
              <th className="text-right px-6 py-3 text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b]">Konwersja</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {[...CONVERSION].sort((a, b) => b.rate - a.rate).map((row) => (
              <tr key={row.product} className="hover:bg-[#fafaf9] transition-colors">
                <td className="px-6 py-3.5 text-[13px] text-[#212121]">{row.product}</td>
                <td className="px-4 py-3.5 text-[13px] text-[#6b6b6b] text-right">{row.views.toLocaleString("pl-PL")}</td>
                <td className="px-4 py-3.5 text-[13px] text-[#212121] text-right">{row.conversions}</td>
                <td className="px-6 py-3.5 text-right">
                  <span className={`text-[12px] font-semibold ${row.rate >= 5 ? "text-emerald-600" : "text-[#6b6b6b]"}`}>
                    {row.rate.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Seller Boost upsell */}
        <div className="px-6 py-5 bg-[#f5f4f1] border-t border-black/8 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium text-[#212121]">Sukienka letnia w kwiaty ma konwersję 2.6% - poniżej Twojej średniej</p>
            <p className="text-[12px] text-[#6b6b6b] mt-0.5">Seller Boost może podnieść widoczność tego produktu i poprawić konwersję</p>
          </div>
          <a
            href="/seller-boost"
            className="shrink-0 ml-4 bg-[#212121] text-white text-[12px] font-medium uppercase tracking-[0.6px] px-4 py-2.5 rounded-lg hover:bg-[#333] transition-colors"
          >
            Zobacz Boost
          </a>
        </div>
      </div>
    </div>
  );
}
